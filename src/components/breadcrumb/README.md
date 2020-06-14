# API

```jsx
import { Breadcrumb, BreadcrumbItem } from 'kui-react';
```

## Breadcrumb

| 名称      | 类型                      | 默认值       | 描述       |
| --------- | ------------------------- | ------------ | ---------- |
| prefixCls | string                    | k-breadcrumb | 组件样式名 |
| separator | React.ReactNode \| string | '/'          | 分隔符     |

## BreadcrumbItem

| 名称      | 类型                      | 默认值            | 描述       |
| --------- | ------------------------- | ----------------- | ---------- |
| prefixCls | string                    | k-breadcrumb-item | 组件样式名 |
| separator | React.ReactNode \| string | '/'               | 分隔符     |
| current   | boolean                   | -                 | 是否当前项 |
| icon      | React.ReactNode           | -                 | 图标       |
| href      | string                    | -                 | 超链接     |
| onClick   | () => void                | -                 | 点击事件   |
