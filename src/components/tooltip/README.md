# API

```jsx
import { Tooltip } from 'kui-react';
```

## Tooltip

| 名称      | 类型                    | 默认值    | 描述                                                                                                                                         |
| --------- | ----------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| prefixCls | string                  | k-tooltip | 组件样式名                                                                                                                                   |
| title     | React.ReactNode\|string | -         | 标题                                                                                                                                         |
| color     | string                  | -         | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger'                                                                               |
| placement | string                  | 'top'     | 显示位置，可选 'top' 'topLeft' 'topRight' 'left' 'leftTop' 'leftBottom' 'right' 'rightTop' 'rightBottom' 'bottom' 'bottomLeft' 'bottomRight' |
| trigger   | string                  | 'hover'   | 触发 tooltip 显示和隐藏的事件,可选 'hover' 和 'click'                                                                                        |
| show      | boolean                 | -         | 是否显示 tooltip                                                                                                                             |
