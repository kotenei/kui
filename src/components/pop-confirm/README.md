# API

```jsx
import { Popconfirm } from 'kui-react';
```

## Popconfirm

| 名称        | 类型                    | 默认值       | 描述                                                                                                                                         |
| ----------- | ----------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| prefixCls   | string                  | k-popconfirm | 组件样式名                                                                                                                                   |
| title       | React.ReactNode\|string | -            | 标题                                                                                                                                         |
| placement   | string                  | 'top'        | 显示位置，可选 'top' 'topLeft' 'topRight' 'left' 'leftTop' 'leftBottom' 'right' 'rightTop' 'rightBottom' 'bottom' 'bottomLeft' 'bottomRight' |
| cancelText  | React.ReactNode\|string | -            | 取消按钮文本                                                                                                                                 |
| confirmText | React.ReactNode\|string | -            | 确认按钮文本                                                                                                                                 |
| onCancel    | ()=>void                | -            | 点击取消时回调                                                                                                                               |
| onConfirm   | ()=>void                | -            | 点击确认时回调                                                                                                                               |
