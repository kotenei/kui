# API

```jsx
import { Progress } from 'kui-react';
```

## Progress

| 名称          | 类型    | 默认值     | 描述                                                           |
| ------------- | ------- | ---------- | -------------------------------------------------------------- |
| prefixCls     | string  | k-progress | 组件样式名                                                     |
| color         | string  | -          | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger' |
| type          | string  | 'line'     | 类型，可选值 'line' 'circle'                                   |
| percent       | number  | 0          | 进度                                                           |
| status        | string  | -          | 状态，可选 'success' 'error'                                   |
| strokeWidth   | number  | 6          | 进度条宽度                                                     |
| textInside    | boolean | false      | 文字是否在进度条内，只在 type 为 line 下有效                   |
| showText      | boolean | true       | 是否显示文字                                                   |
| width         | number  | 100        | 圆形进度条画布宽度                                             |
| indeterminate | boolean | false      | 是否不确定进度                                                 |
| text          | string  | -          | 显示的文字                                                     |
| nativeColor   | string  | -          | 自定义颜色                                                     |
