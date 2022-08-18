# API

```jsx
import { List, ListItem, ListItemMeta } from 'kui-react';
```

## Icon

| 名称       | 类型                                    | 默认值 | 描述                |
| ---------- | --------------------------------------- | ------ | ------------------- | -------- |
| prefixCls  | `string`                                | k-list | 组件样式名          |
| bordered   | `boolean`                               | -      | 是否显示边框        |
| data       | `Array<any>`                            | -      | 数据源              |
| footer     | `React.ReactNode\|string`               | -      | 列表底部            |
| viewBox    | `React.ReactNode\|string`               | -      | 视图框              | 列表头部 |
| split      | `boolean`                               | true   | 是否显示分隔线      |
| size       | `string`                                | -      | 尺寸,可选 'sm' 'lg' |
| renderItem | `(item,index)=>React.ReactNode\|string` | -      | 自定义输出项        |

## ListItem

| 名称      | 类型         | 默认值      | 描述       |
| --------- | ------------ | ----------- | ---------- |
| prefixCls | `string`     | k-list-item | 组件样式名 |
| actions   | `Array<any>` | -           | 列表操作项 |

## ListItemMeta

| 名称        | 类型                       | 默认值           | 描述               |
| ----------- | -------------------------- | ---------------- | ------------------ |
| prefixCls   | `string`                   | k-list-item-meta | 组件样式名         |
| avatar      | `React.ReactNode`          | -                | 列表元素的图标     |
| description | `React.ReactNode\|string`  | -                | 列表元素的描述内容 |
| title       | `React.ReactNode \|string` | -                | 列表元素的标题     |
