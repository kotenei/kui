# API

```jsx
import { Table, TableColumn } from 'kui-react';
```

## Table

| 名称         | 类型           | 默认值  | 描述           |
| ------------ | -------------- | ------- | -------------- |
| prefixCls    | `string`       | k-table | 组件样式名     |
| bordered     | `boolean`      | -       | 是否显示边框   |
| loading      | `boolean`      | -       | 是否加载中     |
| scrollHeight | `number`       | -       | 滚动条出现高度 |
| stripe       | `boolean`      | -       | 是否显示斑马纹 |
| dataSource   | `any`          | -       | 数据源         |
| rowSelection | `RowSelection` | -       | 行选择项       |
| rowExpansion | `RowExpansion` | -       | 行展开项       |

### RowSelection

| 名称            | 类型                                                                   | 默认值 | 描述         |
| --------------- | ---------------------------------------------------------------------- | ------ | ------------ |
| selectedRowKeys | `string[]`                                                             | -      | 选中行的 key |
| onChange        | `(selectedRowKeys:string[],e:event)=>void`                             | -      | 选中行触发   |
| onSelect        | `(record:any,selected:boolean,selectedRowKeys:string[],e:event)=>void` | -      | 选中行触发   |

### RowExpansion

| 名称              | 类型                                              | 默认值 | 描述             |
| ----------------- | ------------------------------------------------- | ------ | ---------------- |
| expandedRowKeys   | `string[]`                                        | -      | 展开行的 key     |
| onChange          | `(expandedRowKeys:string[],e:event)=>void`        | -      | 展开行触发       |
| expandedRowRender | `(record:any,index:number,expanded:boolean)=>any` | -      | 展开行显示的内容 |

## TableColumn

| 名称        | 类型                         | 默认值 | 描述         |
| ----------- | ---------------------------- | ------ | ------------ |
| title       | `React.ReactNode` \|`string` | -      | 列头标题     |
| field       | `string`                     | -      | 数据项的 key |
| width       | `number`                     | -      | 宽度         |
