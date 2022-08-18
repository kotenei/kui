# API

```jsx
import { Rate } from 'kui-react';
```

## Rate

| 名称         | 类型                      | 默认值                              | 描述         |
| ------------ | ------------------------- | ----------------------------------- | ------------ |
| allowHalf    | `boolean`                 | false                               | 是否允许半选 |
| count        | `number`                  | 5                                   | star 总数    |
| defaultValue | `number`                  | 0                                   | 默认值       |
| value        | `number`                  | -                                   | 当前值       |
| character    | `React.ReactNode`         | <Icon type="star" theme="filled" /> | 自定义字符   |
| disabled     | `boolean`                 | false                               | 是否禁用     |
| onChange     | `(value: number) => void` | -                                   | 选择时回调   |
