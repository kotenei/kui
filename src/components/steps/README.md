# API

```jsx
import { Steps, StepsItem } from 'kui-react';
```

## Steps

| 名称        | 类型      | 默认值       | 描述                                                                        |
| ----------- | --------- | ------------ | --------------------------------------------------------------------------- |
| prefixCls   | `string`  | k-steps      | 组件样式名                                                                  |
| alignCenter | `boolean` | true         | 是否居中模式，只在'horizontal'下生效                                        |
| current     | `number`  | 0            | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态 |
| direction   | `string`  | 'horizontal' | 方向，可选 'horizontal' 'vertical'                                          |
| status      | `string`  | -            | 指定当前步骤的状态，可选 'wait' 'process' 'finish' 'error'                  |
| size        | `string`  | -            | 尺寸，可选 'sm'                                                             |
| iconInner   | `boolean` | -            | 使用图标时是否显示圆框                                                      |

## Step

| 名称        | 类型                         | 默认值       | 描述       |
| ----------- | ---------------------------- | ------------ | ---------- |
| prefixCls   | `string`                     | k-steps-item | 组件样式名 |
| icon        | `React.ReactNode`            | -            | 图标       |
| title       | `React.ReactNode` \|`string` | -            | 标题       |
| description | `React.ReactNode` \|`string` | -            | 描述       |
