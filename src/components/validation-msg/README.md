# API

```jsx
import { ValidationMsg } from 'kui-react';
```

## ValidationMsg

| 名称        | 类型                      | 默认值           | 描述                                     |
| ----------- | ------------------------- | ---------------- | ---------------------------------------- |
| prefixCls   | `string`                  | k-validation-msg | 组件样式名                               |
| type        | `string`                  | 'warning'        | 类型，可选 success, info, warning, error |
| icon        | `React.ReactNode`         | -                | 显示图标                                 |
| show        | `boolean`                 | true             | 是否显示                                 |
| showIcon    | `boolean`                 | true             | 是否显示图标                             |
| message     | `string\|React.ReactNode` | -                | 显示内容                                 |
| description | `string\|React.ReactNode` | -                | 显示详情                                 |
