# API

```jsx
import { Alert } from 'kui-react';
```

## Alert

| 名称        | 类型                          | 默认值  | 描述                                           |
| ----------- | ----------------------------- | ------- | ---------------------------------------------- |
| prefixCls   | `string`                      | k-alert | 组件样式名                                     |
| closeText   | `React.ReactNode` \| `string` | -       | 关闭文本                                       |
| closable    | `boolean`                     | true    | 是否可关闭                                     |
| showIcon    | `boolean`                     | false   | 是否显示图标                                   |
| state       | `string`                      | -       | 状态，可选 'info' 'success' 'warning' 'danger' |
| title       | `React.ReactNode` \| `string` | -       | 标题                                           |
| description | `React.ReactNode` \| `string` | -       | 描述                                           |
| onClose     | `() => boolean`               | -       | 关闭时回调，返回 false 不关闭                  |
