# API

```jsx
import { Row, Col } from 'kui-react';
```

## Row

| 名称      | 类型   | 默认值  | 描述                                                                   |
| --------- | ------ | ------- | ---------------------------------------------------------------------- |
| prefixCls | string | k-row   | 组件样式名                                                             |
| align     | string | 'top'   | flex 布局下的垂直对齐方式：top middle bottom                           |
| gutter    | number | 0       | 间隔                                                                   |
| justify   | string | 'start' | flex 布局下的水平排列方式：start end center space-around space-between |

## Col

| 名称      | 类型   | 默认值 | 描述                                      |
| --------- | ------ | ------ | ----------------------------------------- |
| prefixCls | string | k-col  | 组件样式名                                |
| offset    | number | 0      | 左侧的间隔格数                            |
| span      | number | -      | 栅格占位格数，为 0 时相当于 display: none |
| xs        | number | -      | <576px 响应式栅格，设置为栅格数           |
| sm        | number | -      | >576px 响应式栅格，设置为栅格数           |
| md        | number | -      | >768px 响应式栅格，设置为栅格数           |
| lg        | number | -      | >992px 响应式栅格，设置为栅格数           |
| xl        | number | -      | >1200px 响应式栅格，设置为栅格数          |
| xxl       | number | -      | >1600px 响应式栅格，设置为栅格数          |
