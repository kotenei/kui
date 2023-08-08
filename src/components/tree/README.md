# API

```jsx
import { Tree, TreeNode } from 'kui-react';
```

## Tree

| 名称                | 类型                                           | 默认值 | 描述                |
| ------------------- | ---------------------------------------------- | ------ | ------------------- |
| prefixCls           | `string`                                       | k-tree | 组件样式名          |
| checkable           | `boolean`                                      | -      | 是否可复选          |
| checkedKeys         | `string[]`                                     | -      | 复选值              |
| defaultCheckedKeys  | `string[]`                                     | -      | 默认复选值          |
| defaultExpandedKeys | `string[]`                                     | -      | 默认展开值          |
| defaultSelectedKeys | `string[]`                                     | -      | 默认选中值          |
| dragable            | `boolean`                                      | -      | 是否拖拽            |
| expandedKeys        | `string[]`                                     | -      | 展开值              |
| multiple            | `boolean`                                      | -      | 是否多选            |
| selectable          | `boolean`                                      | -      | 是否可以选择项      |
| selectedKeys        | `string[]`                                     | -      | 选中值              |
| showLine            | `boolean`                                      | -      | 是否展示连接线      |
| loadData            | `(key: string, children: any) => Promise<any>` | -      | 异步加载数据时调用  |
| onCheck             | `(checkedKeys: string[]) => void`              | -      | 复选节点时调用      |
| onExpand            | `(expandedKeys: string[]) => void`             | -      | 展开时调用          |
| onSelect            | `(selectedKeys: string[]) => void`             | -      | 选中节点时调用      |
| onDragOver          | `(info) => void`                               | -      | dragover 触发时调用 |
| onDragEnd           | `(info) => void`                               | -      | 结束拖拽时调用      |

## TreeNode

| 名称      | 类型              | 默认值           | 描述                                       |
| --------- | ----------------- | ---------------- | ------------------------------------------ | ---- |
| prefixCls | `string`          | k-tree           | 组件样式名                                 |
| key       | `string`          | -                | 节点唯一编号，必填                         |
| disabled  | `boolean`         | -                | 是否禁用                                   |
| icon      | `React.ReactNode` | -                | 自定义图标,showIcon 必须设置为 true 才可用 |
| title     | `string           | React.ReactNode` | -                                          | 标题 |
| isLeaf    | `boolean`         | -                | 是否叶子节点                               |
