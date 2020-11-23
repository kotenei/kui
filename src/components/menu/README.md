# API

```jsx
import { Menu, MenuItem, SubMenu } from 'kui-react';
```

## Menu

| 名称                | 类型                                                       | 默认值   | 描述                                                              |
| ------------------- | ---------------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| prefixCls           | string                                                     | k-menu   | 组件样式名                                                        |
| defaultOpenKeys     | string[]                                                   | -        | 初始展开 SubMenu 菜单项 key 数组                                  |
| defaultSelectedKeys | string[]                                                   | -        | 初始选中菜单项 key 数组                                           |
| inlineIndent        | number                                                     | 24       | 菜单缩进宽度                                                      |
| mode                | string                                                     | 'inline' | 菜单模式，可选 'inline' 'vertical' 'horizontal' 'inlineCollapsed' |
| selectedKeys        | string[]                                                   | -        | 选中菜单项 key 数组                                               |
| openKeys            | string[]                                                   | -        | 展开 SubMenu 菜单项 key 数组                                      |
| multiple            | boolean                                                    | -        | 是否可多选                                                        |
| onClick             | (key:string,selectedKeys:string[],openKeys:string[])=>void | -        | 单击菜单时回调                                                    |

## MenuItem

| 名称     | 类型                      | 默认值 | 描述                     |
| -------- | ------------------------- | ------ | ------------------------ |
| key      | string                    | -      | 唯一标志                 |
| disabled | boolean                   | -      | 是否禁用                 |
| icon     | React.ReactNode           | -      | 图标                     |
| title    | React.ReactNode \| string | -      | 设置收缩时展示的悬浮标题 |

## SubMenu

| 名称     | 类型                      | 默认值 | 描述                     |
| -------- | ------------------------- | ------ | ------------------------ |
| key      | string                    | -      | 唯一标志                 |
| disabled | boolean                   | -      | 是否禁用                 |
| icon     | React.ReactNode           | -      | 图标                     |
| title    | React.ReactNode \| string | -      | 设置收缩时展示的悬浮标题 |
