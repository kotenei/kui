# API

```jsx
import { Slider } from 'kui-react';
```

## Slider

| 名称      | 类型                 | 默认值   | 描述                                                                     |
| --------- | -------------------- | -------- | ------------------------------------------------------------------------ |
| prefixCls | `string`             | k-slider | 组件样式名                                                               |
| disabled  | `boolean`            | -        | 是否禁用                                                                 |
| min       | `number`             | 1        | 最小值                                                                   |
| max       | `number`             | 100      | 最大值                                                                   |
| step      | `number`             | 1        | 步长                                                                     |
| range     | `boolean`            | -        | 是否多滑块模式                                                           |
| vertical  | `boolean`            | -        | 是否垂直方向                                                             |
| value     | `number \| number[]` | -        | 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] |
| defaultValue | `number \| number[]` | 1 | 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number] |
| tipFormatter | `(value)=>any` | - | Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip。 |
| onDragStart | `(value:number \| number[])` | - | 开始拖拽回调函数 |
| onChange | `(value:number \| number[])` | - | 拖拽时回调函数 |
| onDragStop | `(value:number \| number[])` | - | 结束拖拽回调函数 |
