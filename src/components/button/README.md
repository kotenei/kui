# API

```jsx
import { Button } from 'kui-react';
```

## Button

| 名称      | 类型              | 默认值   | 描述                                                           |
| --------- | ----------------- | -------- | -------------------------------------------------------------- |
| prefixCls | `string`          | k-button | 组件样式名                                                     |
| color     | `string`          | -        | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger' |
| icon      | `React.ReactNode` | -        | 图标                                                           |
| disabled  | `boolean`         | false    | 是否禁用                                                       |
| full      | `boolean`         | -        | 宽度是否 100%                                                  |
| type      | `string`          | button   | 按钮类型，可选 'button' 'submit' 'reset'                       |
| active    | `boolean`         | -        | 是否已激活                                                     |
| size      | `string`          | -        | 按钮大小，可选 'xs' 'sm' 'md' 'lg'                             |
| loading   | `boolean`         | -        | 是否加载中                                                     |
| onClick   | `(e) => void`     | -        | 点击时回调                                                     |
