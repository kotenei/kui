# API

```jsx
import { message } from 'kui-react';
```

## 静态方法

- `message.success(content, [duration], onClose)`
- `message.error(content, [duration], onClose)`
- `message.info(content, [duration], onClose)`
- `message.warning(content, [duration], onClose)`
- `message.loading(content, [duration], onClose)`

| 名称     | 类型                        | 默认值 | 描述                   |
| -------- | --------------------------- | ------ | ---------------------- |
| content  | `React.ReactNode`\|`string` | -      | 内容                   |
| duration | `number`                    | 1500   | 自动关闭延时，单位毫秒 |
| onClose  | `()=>void `                 | -      | 关闭时触发的回调函数   |

## 全局方法

- `message.config(options)`
- `message.destory()`

```js
message.config({
  duration: 1500,
});

message.destory();
```

### options

| 名称     | 类型     | 默认值 | 描述                     |
| -------- | -------- | ------ | ------------------------ |
| duration | `number` | 1500   | 默认自动关闭延时，单位秒 |
