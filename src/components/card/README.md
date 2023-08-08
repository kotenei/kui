# API

```jsx
import { Card } from 'kui-react';
```

## Button

| 名称      | 类型                        | 默认值 | 描述                       |
| --------- | --------------------------- | ------ | -------------------------- |
| prefixCls | `string`                    | k-card | 组件样式名                 |
| title     | `React.ReactNode`\|`string` | -      | 标题                       |
| extra     | `React.ReactNode`\|`string` | -      | 卡片右上角操作区           |
| bordered  | `boolean`                   | true   | 是否显示边框               |
| cover     | `React.ReactNode`           | -      | 卡片封面                   |
| actions   | `React.ReactNode[] `        | -      | 卡片操作组，位置在卡片底部 |
