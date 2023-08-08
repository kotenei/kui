# API

```jsx
import { Collapse, CollapsePanel } from 'kui-react';
```

## Collapse

| 名称             | 类型                   | 默认值     | 描述                |
| ---------------- | ---------------------- | ---------- | ------------------- |
| prefixCls        | `string`               | k-collapse | 组件样式名          |
| activeIds        | `string[] `            | -          | 当前激活面板 ID     |
| defaultActiveIds | `string[] `            | []         | 初始化时激活面板 ID |
| accordion        | `boolean`              | -          | 是否手风琴          |
| onChange         | `(id: string) => void` | -          | 切换面板的回调      |

## CollapsePanel

| 名称     | 类型                          | 默认值 | 描述          |
| -------- | ----------------------------- | ------ | ------------- |
| id       | `string`                      | -      | 对应 activeId |
| header   | `React.ReactNode` \| `string` | -      | 面板头部内容  |
| disabled | `boolean`                     | false  | 是否禁用      |
