# API

```jsx
import { Input } from 'kui-react';
```

## Input

| 名称         | 类型              | 默认值  | 描述                                        |
| ------------ | ----------------- | ------- | ------------------------------------------- |
| prefixCls    | `string`          | k-input | 组件样式名                                  |
| id           | `string`          | -       | 输入框 id                                   |
| name         | `string`          | -       | 输入框 name                                 |
| type         | `string`          | text    | 输入框类型，可选 text、textarea 和 password |
| value        | `string`          | -       | 输入框内容                                  |
| defaultValue | `string`          | -       | 输入框默认内容                              |
| disabled     | `boolean`         | -       | 是否禁用                                    |
| readOnly     | `boolean`         | -       | 是否只读                                    |
| addonBefore  | `React.ReactNode` | -       | 前置标签                                    |
| addonAfter   | `React.ReactNode` | -       | 后置标签                                    |
| prefix       | `React.ReactNode` | -       | 前缀图标                                    |
| suffix       | `React.ReactNode` | -       | 后缀图标                                    |
| size         | `string`          | -       | 大小，可选'sm' 'lg'                         |
| onPressEnter | `(e) => void`     | -       | 点击时回调                                  |
