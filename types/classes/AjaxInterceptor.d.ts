export interface RequestParams {
    args: any[];
    prevent(): void;
}
export interface ResponseParams {
    response: any;
    originResponse: string;
    replace(response: any): any;
    define(property: string, value: any): any;
}
interface AjaxHooks {
    onRequest?(params: RequestParams): any;
    onResponse?(params: ResponseParams): void;
    onSend?(params: RequestParams): any;
}
/**
 * Using to intercept ajax request, new Instance to start hook
 */
export declare class AjaxInterceptor {
    urlHooks: {
        [url: string]: AjaxHooks;
    };
    responseHooks: {
        [key: string]: Array<(params: ResponseParams) => void>;
    };
    sendHooks: {
        [key: string]: Array<(params: RequestParams) => any>;
    };
    constructor();
    private getHookedRequestHandler;
    private onSend;
    private onRequest;
    private onResponse;
    private signResponseHooks;
    private signSendHooks;
    private clearResponseHooks;
    private clearSendHooks;
    /**
     * Register from url RegExp
     * @param url
     * @param hooks
     */
    register(url: string, hooks: AjaxHooks): void;
}
export {};
