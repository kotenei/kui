# API

```jsx
import { Switch } from 'kui-react';
```

## Switch

| 名称             | 类型                        | 默认值   | 描述           |
| ---------------- | --------------------------- | -------- | -------------- |
| prefixCls        | `string`                    | k-switch | 组件样式名     |
| defaultChecked   | `boolean`                   | -        | 是否默认选中   |
| checked          | `boolean`                   | -        | 是否选中       |
| disabled         | `boolean`                   | -        | 是否禁用       |
| checkedContent   | `React.ReactNode`           | -        | 选中时的内容   |
| unCheckedContent | `React.ReactNode`           | -        | 非选中时的内容 |
| onChange         | `(checked:boolean) => void` | -        | 切换时回调函数 |
