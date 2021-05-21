[@hook-js/ajax](../README.md) / [Exports](../modules.md) / AjaxInterceptor

# Class: AjaxInterceptor

Using to intercept ajax request, new Instance to start hook

## Table of contents

### Constructors

- [constructor](ajaxinterceptor.md#constructor)

### Properties

- [responseHooks](ajaxinterceptor.md#responsehooks)
- [sendHooks](ajaxinterceptor.md#sendhooks)
- [urlHooks](ajaxinterceptor.md#urlhooks)

### Methods

- [clearResponseHooks](ajaxinterceptor.md#clearresponsehooks)
- [clearSendHooks](ajaxinterceptor.md#clearsendhooks)
- [getHookedRequestHandler](ajaxinterceptor.md#gethookedrequesthandler)
- [onRequest](ajaxinterceptor.md#onrequest)
- [onResponse](ajaxinterceptor.md#onresponse)
- [onSend](ajaxinterceptor.md#onsend)
- [register](ajaxinterceptor.md#register)
- [signResponseHooks](ajaxinterceptor.md#signresponsehooks)
- [signSendHooks](ajaxinterceptor.md#signsendhooks)

## Constructors

### constructor

\+ **new AjaxInterceptor**(): [*AjaxInterceptor*](ajaxinterceptor.md)

**Returns:** [*AjaxInterceptor*](ajaxinterceptor.md)

Defined in: [AjaxInterceptor.ts:53](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L53)

## Properties

### responseHooks

• **responseHooks**: *object*= {}

#### Type declaration

Defined in: [AjaxInterceptor.ts:52](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L52)

___

### sendHooks

• **sendHooks**: *object*= {}

#### Type declaration

Defined in: [AjaxInterceptor.ts:53](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L53)

___

### urlHooks

• **urlHooks**: *object*= {}

#### Type declaration

Defined in: [AjaxInterceptor.ts:51](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L51)

## Methods

### clearResponseHooks

▸ `Private` **clearResponseHooks**(`id`: *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** *void*

Defined in: [AjaxInterceptor.ts:205](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L205)

___

### clearSendHooks

▸ `Private` **clearSendHooks**(`id`: *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *number* |

**Returns:** *void*

Defined in: [AjaxInterceptor.ts:209](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L209)

___

### getHookedRequestHandler

▸ `Private` **getHookedRequestHandler**(): *function*

**Returns:** (`origin`: *FunctionInstance*) => *any*

Defined in: [AjaxInterceptor.ts:86](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L86)

___

### onRequest

▸ `Private` **onRequest**(`xhr`: *any*, `args`: *any*[], `prevent`: () => *void*): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `xhr` | *any* |
| `args` | *any*[] |
| `prevent` | () => *void* |

**Returns:** *any*

Defined in: [AjaxInterceptor.ts:112](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L112)

___

### onResponse

▸ `Private` **onResponse**(`xhr`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `xhr` | *any* |

**Returns:** *void*

Defined in: [AjaxInterceptor.ts:131](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L131)

___

### onSend

▸ `Private` **onSend**(`xhr`: *any*, `args`: *any*[], `prevent`: () => *void*): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `xhr` | *any* |
| `args` | *any*[] |
| `prevent` | () => *void* |

**Returns:** *any*

Defined in: [AjaxInterceptor.ts:97](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L97)

___

### register

▸ **register**(`url`: *string*, `hooks`: AjaxHooks): *void*

Register from url RegExp

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *string* |
| `hooks` | AjaxHooks |

**Returns:** *void*

Defined in: [AjaxInterceptor.ts:218](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L218)

___

### signResponseHooks

▸ `Private` **signResponseHooks**(`id`: *number*, `hooks`: AjaxHooks): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *number* |
| `hooks` | AjaxHooks |

**Returns:** *void*

Defined in: [AjaxInterceptor.ts:189](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L189)

___

### signSendHooks

▸ `Private` **signSendHooks**(`id`: *number*, `hooks`: AjaxHooks): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | *number* |
| `hooks` | AjaxHooks |

**Returns:** *void*

Defined in: [AjaxInterceptor.ts:197](https://github.com/canguser/hook-js-ajax/blob/20b82db/main/classes/AjaxInterceptor.ts#L197)
