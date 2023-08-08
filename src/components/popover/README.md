# API

```jsx
import { Popover } from 'kui-react';
```

## Popover

| 名称      | 类型                        | 默认值    | 描述                                                                                                                                         |
| --------- | --------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| prefixCls | `string`                    | k-popover | 组件样式名                                                                                                                                   |
| title     | `React.ReactNode`\|`string` | -         | 标题                                                                                                                                         |
| content   | `React.ReactNode`\|`string` | -         | 内容                                                                                                                                         |
| placement | `string`                    | 'top'     | 显示位置，可选 'top' 'topLeft' 'topRight' 'left' 'leftTop' 'leftBottom' 'right' 'rightTop' 'rightBottom' 'bottom' 'bottomLeft' 'bottomRight' |
| trigger   | `string`                    | 'hover'   | 触发 popover 显示和隐藏的事件,可选 'hover' 和 'click'                                                                                        |
| show      | `boolean`                     | -         | 是否显示 popover                                                                                                                             |
