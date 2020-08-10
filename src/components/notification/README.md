# API

```jsx
import { notification } from 'kui-react';
```

## notification

| 名称     | 类型                    | 默认值 | 描述                   |
| -------- | ----------------------- | ------ | ---------------------- |
| title    | React.ReactNode\|string | -      | 标题                   |
| content  | React.ReactNode\|string | -      | 内容                   |
| duration | number                  | 1500   | 自动关闭延时，单位毫秒 |
| onClose  | ()=>void                | -      | 关闭时触发的回调函数   |
