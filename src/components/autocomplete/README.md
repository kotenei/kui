# API

```jsx
import { AutoComplete } from 'kui-react';
```

## AutoComplete

| 名称       | 类型                      | 默认值         | 描述                                              |
| ---------- | ------------------------- | -------------- | ------------------------------------------------- |
| prefixCls  | `string`                  | k-autocomplete | 组件样式名                                        |
| dataSource | `{ text, value }[]`       | -              | 数据源                                            |
| max        | `number`                  | 10             | 下拉项个数                                        |
| highlight  | `boolean`                 | -              | 是否高亮                                          |
| size       | `string`                  | -              | 大小，可选'sm' 'lg'                               |
| onSearch   | `(value) => void`         | -              | 搜索补全项的时候调用                              |
| onChange   | `(value) => void`         | -              | 选中 option，或 input 的 value 变化时，调用此函数 |
| onSelect   | `(value, option) => void` | -              | 被选中时调用，参数为选中项的 value 值             |
