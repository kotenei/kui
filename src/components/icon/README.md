# API

```jsx
import { Icon, SvgIcon } from 'kui-react';
```

## Icon

| 名称      | 类型       | 默认值          | 描述                                                           |
| --------- | ---------- | --------------- | -------------------------------------------------------------- |
| prefixCls | `string`   | k-icon          | 组件样式名                                                     |
| fontSize  | `number`   | -               | 图标大小                                                       |
| color     | `string`   | -               | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger' |
| spin      | `boolean`  | -               | 是否旋转                                                       |
| viewBox   | `string`   | '0 0 1024 1024' | 视图框                                                         |
| onClick   | `()=>void` | -               | 点击回调                                                       |

## SvgIcon

| 名称        | 类型     | 默认值          | 描述                                                           |
| ----------- | -------- | --------------- | -------------------------------------------------------------- |
| prefixCls   | `string` | k-icon-svg      | 组件样式名                                                     |
| color       | `string` | -               | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger' |
| nativeColor | `string` | -               | 自定义颜色                                                     |
| fontSize    | `number` | -               | 图标大小                                                       |
| title       | `string` | -               | 标题                                                           |
| viewBox     | `string` | '0 0 1024 1024' | 视图框                                                         |
