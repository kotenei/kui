# API

```jsx
import { LazyLoad } from 'kui-react';
```

## LazyLoad

| 名称      | 类型                    | 默认值     | 描述                               |
| --------- | ----------------------- | ---------- | ---------------------------------- |
| prefixCls | string                  | k-lazyload | 组件样式名                         |
| container | Window \| string        | window     | 容器，字符串为 dom selector 选择器 |
| loading   | string                  | -          | 预加载图片                         |
| error     | string                  | -          | 加载失败图片                       |
| onError   | (value: object) => void | -          | 加载失败回调函数                   |
| onSuccess | (value: object) => void | -          | 加载成功回调函数                   |
