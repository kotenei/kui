# API

```jsx
import { notification } from 'kui-react';
```

## 静态方法

- `notification.open(title,content, [duration], onClose)`
- `notification.success(title,content, [duration], onClose)`
- `notification.error(title,content, [duration], onClose)`
- `notification.info(title,content, [duration], onClose)`
- `notification.warning(title,content, [duration], onClose)`

| 名称     | 类型                    | 默认值 | 描述                   |
| -------- | ----------------------- | ------ | ---------------------- |
| title    | React.ReactNode\|string | -      | 标题                   |
| content  | React.ReactNode\|string | -      | 内容                   |
| duration | number                  | 1500   | 自动关闭延时，单位毫秒 |
| onClose  | ()=>void                | -      | 关闭时触发的回调函数   |

## 全局方法

- `notification.config(options)`
- `notification.destory()`

```js
notification.config({
  duration: 1500,
  placement: 'topRight',
});

notification.destory();
```

### options

| 名称      | 类型   | 默认值     | 描述                                                           |
| --------- | ------ | ---------- | -------------------------------------------------------------- |
| duration  | number | 1500       | 默认自动关闭延时，单位秒                                       |
| placement | string | 'topRight' | 弹出位置，可选 `topLeft` `topRight` `bottomLeft` `bottomRight` |
