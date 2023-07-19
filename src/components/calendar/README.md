# API

```jsx
import { Calendar } from 'kui-react';
```

## Calendar

| 名称             | 类型                                 | 默认值     | 描述                                                                            |
| ---------------- | ------------------------------------ | ---------- | ------------------------------------------------------------------------------- |
| prefixCls        | `string`                             | k-calendar | 组件样式名                                                                      |
| date             | `date`                               | new Date() | 面板日期                                                                      |
| defaultValue     | `date`                               | -          | 默认日期                                                                        |
| minDate          | `date`                               | -          | 最小日期                                                                        |
| maxDate          | `date`                               | -          | 最大日期                                                                        |
| value            | `date`                               | -          | 日期                                                                            |
| view             | `string`                             | 'day'      | 视图，可选 year, month, day, week                                               |
| weekStartsOn     | `number`                             | '1'        | 一周第一天的索引, 可选 0-6，0 表示星期天                                        |
| showPrevYear     | `boolean`                            | true       | 是否显示上一年图标                                                              |
| showPrevMonth    | `boolean`                            | true       | 是否显示上一个月图标                                                            |
| showNextYear     | `boolean`                            | true       | 是否显示下一年图标                                                              |
| showNextMonth    | `boolean`                            | true       | 是否显示下一个月图标                                                            |
| onPrevNextChange | `(date: Date, type: string) => void` | -          | 点击箭头回调函数， type: 'prevYear' \| 'prevMonth' \| 'nextYear' \| 'nextMonth' |
| onViewChange     | `(view:string) => void`              | -          | 视图切换回调                                                                    |
| onChange         | `(value:Date,view:string) => void`   | -          | 日期更改时回调                                                                  |
