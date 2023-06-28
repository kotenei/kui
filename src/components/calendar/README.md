# API

```jsx
import { Calendar } from 'kui-react';
```

## Button

| 名称         | 类型                    | 默认值     | 描述                              |
| ------------ | ----------------------- | ---------- | --------------------------------- |
| prefixCls    | `string`                | k-calendar | 组件样式名                        |
| defaultValue | `date`                  | -          | 默认日期                          |
| minDate      | `date`                  | -          | 最小日期                          |
| maxDate      | `date`                  | -          | 最大日期                          |
| value        | `date`                  | -          | 日期                          |
| view         | `string`                | 'day'      | 视图，可选 year, month, day, week |
| onViewChange | `(view:string) => void` | -          | 视图切换回调                      |
| onChange     | `(value:Date) => void`  | -          | 日期更改时回调                    |
