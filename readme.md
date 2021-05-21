# @hook-js/ajax

> 用于拦截 Javascript 中所有的 Ajax 请求

## 安装

```
npm install @hook-js/ajax
```
或者

```
yarn add @hook-js/ajax
```

## 简单 DEMO
```javascript
import {AjaxInterceptor} from '@hook-js/ajax'

const intercept = new AjaxInterceptor()

intercept.register('.*',
    {
        onRequest({args}){
            // 查看当前 request 的 url
            console.log('url:', args[1])
            // 修改 url
            args[1] += 'test'
        },
        onSend({args}){
            // 查看当前请求体内容
            console.log('Post data:', args[0])
            // 可以在下面直接修改请求体
        },
        onResponse({response}){
            // 查看当前请求的响应内容，如果是 json 格式会自动转化
            console.log('response:', response)
            // 假设为 JSON 格式，修改其中属性 name
            response.name = 'test'
            // 发起该请求的地方获取到的响应值 name 属性会被篡改为 'test'
        }
    }
)

```

## API文档
[https://github.com/canguser/hook-js-ajax/tree/master/docs](https://github.com/canguser/hook-js-ajax/tree/master/docs)

