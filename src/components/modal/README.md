# API

```jsx
import { Modal } from 'kui-react';
```

## Modal

| 名称          | 类型                    | 默认值   | 描述             |
| ------------- | ----------------------- | -------- | ---------------- |
| header        | React.ReactNode\|string | -        | 标题             |
| content       | React.ReactNode\|string | -        | 内容             |
| footer        | React.ReactNode         | -        | 底部内容         |
| mask          | boolean                 | true     | 显否显示遮罩     |
| maskClose     | boolean                 | false    | 点击遮罩是否关闭 |
| open          | boolean                 | -        | 是否显示         |
| width         | number                  | 720      | 窗口宽度         |
| height        | number                  | 480      | 容器高度         |
| okText        | React.ReactNode\|string | 'OK'     | 确定按钮文本     |
| cancelText    | React.ReactNode\|string | 'Cancel' | 取消按钮文本     |
| showCancel    | boolean                 | true     | 是否显示取消按钮 |
| showCloseIcon | boolean                 | true     | 是否显示关闭图标 |
| showHeader    | boolean                 | true     | 是否显示头部内容 |
| showFooter    | boolean                 | true     | 是否显示底部内容 |
| onCancel      | () => void              | -        | 点击取消按钮回调 |
| onOK          | () => void              | -        | 点击确定按钮回调 |

## modal.method()

```jsx
import { modal } from 'kui-react';

modal.confirm(props);

modal.info(props);

modal.success(props);

modal.warning(props);

modal.error(props);
```

## Method props

| 名称       | 类型                    | 默认值   | 描述             |
| ---------- | ----------------------- | -------- | ---------------- |
| header     | React.ReactNode\|string | -        | 标题             |
| content    | React.ReactNode\|string | -        | 内容             |
| onCancel   | () => void\| boolean    | -        | 点击取消按钮回调 |
| onOK       | () => void \| boolean   | -        | 点击确定按钮回调 |
| okText     | React.ReactNode\|string | 'OK'     | 确定按钮文本     |
| cancelText | React.ReactNode\|string | 'Cancel' | 取消按钮文本     |
| width      | number                  | 400      | 窗口宽度         |
| height     | number                  | 180      | 容器高度         |
