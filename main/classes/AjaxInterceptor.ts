import { hook, hookReplace } from '@hook-js/core'

let id = 0

function getUniqueId(): number {
    return id++
}

export interface RequestParams {

    args: any[]

    prevent(): void
}

export interface ResponseParams {

    response: any

    originResponse: string

    replace(response: any)

    define(property: string, value: any)

}

interface AjaxHooks {

    onRequest?(params: RequestParams): any

    onResponse?(params: ResponseParams): void

    onSend?(params: RequestParams): any

}

interface HasId {
    id: number
}

declare class FunctionInstance extends Function {
    before(params: object): any
}

/**
 * Using to intercept ajax request, new Instance to start hook
 */
export class AjaxInterceptor {

    urlHooks: { [url: string]: AjaxHooks } = {}
    responseHooks: { [key: string]: Array<(params: ResponseParams) => void> } = {}
    sendHooks: { [key: string]: Array<(params: RequestParams) => any> } = {}

    constructor() {
        const _this = this
        hookReplace(window, 'XMLHttpRequest', (D) => class XMLHttpRequest extends D implements HasId {
            constructor(...args) {
                super(...args)
                this.id = getUniqueId()
                this.addEventListener('readystatechange', () => {
                    if (this.readyState == 4 || [200, 304, 201, 202, 203].includes(this.state)) {
                        _this.onResponse(this)
                    }
                })
            }

            id: number
        })

        hook(
            window.XMLHttpRequest.prototype, 'open',
            this.getHookedRequestHandler()
        )

        hook(
            window.XMLHttpRequest.prototype, 'send',
            (origin: FunctionInstance) => origin.before(
                function({ args, preventDefault: prevent }) {
                    return _this.onSend(this, args, prevent)
                }
            )
        )
    }

    private getHookedRequestHandler() {
        const _this = this
        return (origin: FunctionInstance) => {
            return origin.before(
                function({ args, preventDefault: prevent }) {
                    return _this.onRequest(this, args, prevent)
                }
            )
        }
    }

    private onSend(xhr: any, args: any[], prevent: () => void): any {
        const sendHandlers = this.sendHooks[xhr.id] || []
        let result
        for (const sendHandler of sendHandlers) {
            if (typeof sendHandler === 'function') {
                const params: RequestParams = {
                    args, prevent
                }
                result = sendHandler.call(xhr, params) || result
            }
        }
        this.clearSendHooks(xhr.id)
        return result
    }

    private onRequest(xhr: any, args: any[], prevent: () => void): any {
        const [, url] = args
        let result
        for (const hookUrl in this.urlHooks) {
            if (new RegExp(hookUrl).test(url)) {
                const params: RequestParams = {
                    args, prevent
                }
                const hooks = this.urlHooks[hookUrl]
                if (typeof hooks.onRequest === 'function') {
                    result = hooks.onRequest.call(xhr, params) || result
                }
                this.signResponseHooks(xhr.id, hooks)
                this.signSendHooks(xhr.id, hooks)
            }
        }
        return result
    }

    private onResponse(xhr: any): void {
        if ((xhr.readyState === 4 || [200, 201, 202, 304].includes(xhr.status))) {
            const originResponse = ['', 'text'].includes(xhr.responseType) ? xhr.responseText : xhr.response
            let response
            try {
                response = JSON.parse(originResponse)
            } catch (e) {
                response = originResponse
            }

            function replace(response) {
                if (typeof response !== 'string') {
                    response = JSON.stringify(response)
                }
                Object.defineProperties(xhr, {
                    response: {
                        writable: false,
                        configurable: true,
                        value: response
                    },
                    responseText: {
                        writable: false,
                        configurable: true,
                        value: response
                    }
                })
            }

            const params: ResponseParams = {
                response,
                originResponse,
                replace(response: any) {
                    params.response = response
                },
                define(property: string, value: any) {
                    Object.defineProperty(xhr, property, {
                        writable: false,
                        configurable: true,
                        value
                    })
                }
            }

            const { id } = xhr

            const targetResponseHooks = this.responseHooks[id] || []

            for (const targetResponseHook of targetResponseHooks) {
                if (targetResponseHook && typeof targetResponseHook === 'function') {
                    targetResponseHook.call(xhr, params)
                    replace(params.response)
                }
            }

            this.clearResponseHooks(id)
        }
    }

    private signResponseHooks(id: number, hooks: AjaxHooks) {
        if (hooks.onResponse && typeof hooks.onResponse === 'function') {
            const exists = this.responseHooks[id] || []
            exists.push(hooks.onResponse)
            this.responseHooks[id] = exists
        }
    }

    private signSendHooks(id: number, hooks: AjaxHooks) {
        if (hooks.onSend && typeof hooks.onSend === 'function') {
            const exists = this.sendHooks[id] || []
            exists.push(hooks.onSend)
            this.sendHooks[id] = exists
        }
    }

    private clearResponseHooks(id: number) {
        this.responseHooks[id] = []
    }

    private clearSendHooks(id: number) {
        this.sendHooks[id] = []
    }

    /**
     * Register from url RegExp
     * @param url
     * @param hooks
     */
    register(url: string, hooks: AjaxHooks) {
        this.urlHooks[url] = hooks
    }

}