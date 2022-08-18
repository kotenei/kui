# API

```jsx
import { Pagination } from 'kui-react';
```

## Pagination

| 名称      | 类型                                         | 默认值       | 描述                                                           |
| --------- | -------------------------------------------- | ------------ | -------------------------------------------------------------- |
| prefixCls | `string`                                     | k-pagination | 组件样式名                                                     |
| color     | `string`                                     | -            | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger' |
| size      | `string`                                     | -            | 尺寸，可选 'sm' 'lg'                                           |
| pageIndex | `number`                                     | 0            | 页码                                                           |
| pageSize  | `number`                                     | 20           | 分页大小                                                       |
| total     | `number`                                     | 0            | 总记录数                                                       |
| jump      | `number`                                     | 5            | 双箭头跳页数                                                   |
| onChange  | `(pageIndex:number,pageSize:number) => void` | -            | 改变页码时的回调函数                                           |
