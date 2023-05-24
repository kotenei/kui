# API

```jsx
import { TimePicker } from 'kui-react';
```

## TimePicker

| 名称         | 类型                      | 默认值         | 描述                      |
| ------------ | ------------------------- | -------------- | ------------------------- |
| prefixCls    | `string`                  | 'k-timepicker' | 组件样式名                |
| cancelText   | `string\|React.ReactNode` | '取消'         | 取消按钮文本              |
| cancelText   | `string\|React.ReactNode` | '确定'         | 确定按钮文本              |
| defaultValue | `string`                  | -              | 默认时间                  |
| disabled     | `boolean`                 | -              | 是否禁用                  |
| size         | `string`                  | -              | 大小，可选'sm' 'lg'       |
| hourStep     | `number`                  | 1              | 小时步长                  |
| minuteStep   | `number`                  | 1              | 分钟步长                  |
| minTime      | `string`                  | -              | 最小时间，格式:"00:00:00" |
| maxTime      | `string`                  | -              | 最大时间，格式:"00:00:00" |
| secondStep   | `number`                  | 1              | 秒步长                    |
| show         | `boolean`                 | -              | 是否显示时间选择          |
| placeholder  | `string`                  | -              | 没有值时显示内容          |
| value        | `string`                  | -              | 当前时间                  |
| onChange     | `(value:string)=>void`    | -              | 时间发生变化的回调        |
