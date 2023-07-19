# API

```jsx
import { DatePicker, RangePicker } from 'kui-react';
```

## DatePicker

| 名称         | 类型                               | 默认值       | 描述                                     |
| ------------ | ---------------------------------- | ------------ | ---------------------------------------- |
| prefixCls    | `string`                           | k-datepicker | 组件样式名                               |
| date         | `date`                             | new Date()   | 面板日期                                 |
| defaultValue | `date`                             | -            | 默认日期                                 |
| disabled     | `boolean`                          | -            | 是否禁用                                 |
| format       | `string`                           | 'yyyy-MM-dd' | 格式化，参考 date-fns                    |
| placeholder  | `string`                           | -            | 输入框提示文字                           |
| placement    | `string`                           | 'bottomLeft' | 显示位置                                 |
| minDate      | `date`                             | -            | 最小日期                                 |
| maxDate      | `date`                             | -            | 最大日期                                 |
| value        | `date`                             | -            | 日期                                     |
| view         | `string`                           | 'day'        | 视图，可选 year, month, day, week        |
| weekStartsOn | `number`                           | '1'          | 一周第一天的索引, 可选 0-6，0 表示星期天 |
| size         | `string`                           | -            | 尺寸，可选 'sm' ,'lg'                    |
| showToday    | `boolean`                          | -            | 是否显示今天按钮                         |
| showTime     | `boolean`                          | -            | 是否显示时间选择                         |
| okText       | `string \| React.ReactNode`        | '确定'       | 确定按钮文本                             |
| onChange     | `(value:Date,view:string) => void` | -            | 日期更改时回调                           |


## RangePicker
#### 部分属性继承 DatePicker

| 名称             | 类型                        | 默认值         | 描述                               |
| ---------------- | --------------------------- | -------------- | ---------------------------------- |
| prefixCls        | `string`                    | k-range-picker | 组件样式名                         |
| startPlaceholder | `string`                    | 开始日期       | 开始输入框提示文字                 |
| endPlaceholder   | `string`                    | 结束日期       | 结束输入框提示文字                 |
| separator        | `string \| React.ReactNode` | '-'            | 分隔符                             |
| trigger          | `React.ReactElement`        | -              | 弹出 picker 的触发器，默认是输入框 |
| defaultValue     | `date[]`                    | -              | 默认日期                           |
| value            | `date[]`                    | -              | 日期                               |
| onChange         | `(value?:Date[]) => void`   | -              | 日期更改时回调                     |
