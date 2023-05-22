# API

```jsx
import { Select, SelectOption } from 'kui-react';
```

## Select

| 名称        | 类型                      | 默认值   | 描述                  |
| ----------- | ------------------------- | -------- | --------------------- |
| prefixCls   | `string`                  | k-select | 组件样式名            |
| multiple    | `boolean`                 | -        | 是否多选              |
| placeholder | `string`                  | -        | 占位符                |
| disabled    | `boolean`                 | -        | 是否禁用              |
| defautValue | `string[]`                | -        | 默认值                |
| value       | `string[]`                | -        | 值                    |
| size        | `string`                  | -        | 尺寸，可选 'sm' ,'lg' |
| onChange    | `(value: string[])=>void` | -        | 选择后回调            |

## SelectOption

| 名称     | 类型      | 默认值 | 描述     |
| -------- | --------- | ------ | -------- |
| value    | `string`  | -      | 选项值   |
| disabled | `boolean` | -      | 是否禁用 |
