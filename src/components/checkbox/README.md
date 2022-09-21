# API

```jsx
import { Checkbox, CheckboxGroup } from 'kui-react';
```

## Checkbox

| 名称           | 类型                              | 默认值     | 描述                                                           |
| -------------- | --------------------------------- | ---------- | -------------------------------------------------------------- |
| prefixCls      | `string`                          | k-checkbox | 组件样式名                                                     |
| color          | `string`                          | -          | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger' |
| checked        | `boolean`                         | -          | 是否选中                                                       |
| defaultChecked | `boolean`                         | -          | 默认是否选中                                                   |
| indeterminate  | `boolean`                         | -          | 是否半选                                                       |
| disabled       | `boolean`                         | -          | 是否禁用                                                       |
| readOnly       | `boolean`                         | -          | 是否只读                                                       |
| name           | `string`                          | -          | input 名称                                                     |
| id             | `string`                          | -          | input id                                                       |
| value          | `string`                          | -          | 值                                                             |
| label          | `React.ReactNode`\|`string`       | -          | 显示文本                                                       |
| onChange       | `(e:Event,checked:boolean)=>void` | -          | 变化时的回调函数                                               |

## CheckboxGroup

| 名称         | 类型                            | 默认值           | 描述                                                           |
| ------------ | ------------------------------- | ---------------- | -------------------------------------------------------------- |
| prefixCls    | `string`                        | k-checkbox-group | 组件样式名                                                     |
| color        | `string`                        | -                | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger' |
| disabled     | `boolean`                       | -                | 是否禁用                                                       |
| defaultValue | `string[]`                      | -                | 默认选中值                                                     |
| value        | `string[]`                      | -                | 选中值                                                         |
| options      | `CheckboxProps[] `\| `string[]` | -                | 选项                                                           |
| onChange     | `(values:string[])=>void`       | -                | 变化时的回调函数                                               |
