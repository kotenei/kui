# API

```jsx
import { Tag } from 'kui-react';
```

## Tag

| 名称      | 类型          | 默认值 | 描述                                                           |
| --------- | ------------- | ------ | -------------------------------------------------------------- |
| prefixCls | string        | k-tag  | 组件样式名                                                     |
| color     | string        | -      | 颜色风格，可选值 'primary' 'info' 'success' 'warning' 'danger' |
| closable  | boolean       | false  | 能否关闭                                                       |
| line      | boolean       | false  | 是否显示线框                                                   |
| onClose   | () => boolean | -      | 关闭时回调，如果返回 false，则不关闭                            |
