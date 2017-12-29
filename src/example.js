import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom'

import Home from './views/Home';
import Alert from './views/Alert';
import AutoComplete from './views/AutoComplete';
import Badge from './views/Badge';
import Breadcrumb from './views/Breadcrumb';
import Button from './views/Button';
import Calendar from './views/Calendar';
import Card from './views/Card';
import Carousel from './views/Carousel';
import Collapse from './views/Collapse';
import Checkbox from './views/Checkbox';
import DatePicker from './views/Datepicker';
import Dropdown from './views/Dropdown';
import Form from './views/Form';
import Icon from './views/Icon';
import Input from './views/Input';
import Layout from './views/Layout';
import Loading from './views/Loading';
import Menu from './views/Menu';
import Message from './views/Message';
import Modal from './views/Modal';
import Notification from './views/Notification';
import Pagination from './views/Pagination';
import Popconfirm from './views/Popconfirm';
import Popover from './views/Popover';
import Progress from './views/Progress';
import Radio from './views/Radio';
import Rate from './views/Rate';
import Select from './views/Select';
import Slider from './views/Slider';
import Steps from './views/Steps';
import Switch from './views/Switch';
import Table from './views/Table';
import Tabs from './views/Tabs';
import Tag from './views/Tag';
import Timeline from './views/Timeline';
import Tooltip from './views/Tooltip';
import Tree from './views/Tree';
import Upload from './views/Upload';

ReactDOM.render(
    <Router>
        <div className="page-wrapper">
            <div className="main-wrapper">
                <div className="main-nav">
                    <ul>
                        <li><NavLink to="/" activeClassName="selected">KUI of React</NavLink></li>
                        <li>
                            Basic
                            <ul>
                                <li><NavLink to="/Button" activeClassName="selected">Button 按钮</NavLink></li>
                                <li><NavLink to="/Icon" activeClassName="selected">Icon 图标</NavLink></li>

                            </ul>
                        </li>
                        <li>
                            Navigation
                            <ul>
                                <li><NavLink to="/Breadcrumb" activeClassName="selected">Breadcrumb 面包屑</NavLink></li>
                                <li><NavLink to="/Dropdown" activeClassName="selected">Dropdown 下拉菜单</NavLink></li>
                                <li><NavLink to="/Menu" activeClassName="selected">Menu 菜单</NavLink></li>
                                <li><NavLink to="/Pagination" activeClassName="selected">Pagination 分页</NavLink></li>
                                <li><NavLink to="/Steps" activeClassName="selected">Steps 步骤条</NavLink></li>
                                <li><NavLink to="/Tabs"  activeClassName="selected">Tabs 标签</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            Data Entry
                            <ul>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">AutoComplete 自动完成</NavLink></li>
                                <li><NavLink to="/Checkbox" activeClassName="selected">Checkbox 多选框</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">DatePicker 日期选择</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">Form 表单</NavLink></li>
                                <li><NavLink to="/Input" activeClassName="selected">Input 输入框</NavLink></li>
                                <li><NavLink to="/Radio" activeClassName="selected">Radio 单选框</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">Rate 评分</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">Select 选择器</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">Slider 滑动条</NavLink></li>
                                <li><NavLink to="/Switch"  activeClassName="selected">Switch 开关</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">Upload 上传</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            Data Display
                            <ul>
                                <li><NavLink to="/Badge" activeClassName="selected">Badge 徽章</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">Calendar 日历</NavLink></li>
                                <li><NavLink to="/Card" activeClassName="selected">Card 卡片</NavLink></li>
                                <li><NavLink to="/Carousel"  activeClassName="selected">Carousel 走马灯</NavLink></li>
                                <li><NavLink to="/Collapse" activeClassName="selected">Collapse 折叠面板</NavLink></li>
                                <li><NavLink to="/Popover" activeClassName="selected">Popover 弹出框</NavLink></li>
                                <li><NavLink to="/Tooltip" activeClassName="selected">Tooltip 文字提示</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">Table 表格</NavLink></li>
                                <li><NavLink to="/Tag" activeClassName="selected">Tag 标签</NavLink></li>
                                <li><NavLink to="/Timeline" activeClassName="selected">Timeline 时间轴</NavLink></li>
                                <li><NavLink to="###" className="disabled" activeClassName="selected">Tree 树型</NavLink></li>                            </ul>
                        </li>
                        <li>
                            Feedback
                            <ul>
                                <li><NavLink to="/Alert" activeClassName="selected">Alert 警告提示</NavLink></li>
                                <li><NavLink to="/Modal" activeClassName="selected">Modal 对话框</NavLink></li>
                                <li><NavLink to="/Message" activeClassName="selected">Message 消息提示</NavLink></li>
                                <li><NavLink to="/Notification" activeClassName="selected">Notification 通知提醒框</NavLink></li>
                                <li><NavLink to="/Progress" activeClassName="selected">Progress 进度条</NavLink></li>
                                <li><NavLink to="/Popconfirm" activeClassName="selected">Popconfirm 气泡确认框</NavLink></li>
                                <li><NavLink to="/Loading" activeClassName="selected">Loading 加载中</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="main-container">
                    <Route path="/" exact component={Home} />
                    <Route path="/Alert" exact component={Alert} />
                    <Route path="/AutoComplete" exact component={AutoComplete} />
                    <Route path="/Badge" exact component={Badge} />
                    <Route path="/Breadcrumb" exact component={Breadcrumb} />
                    <Route path="/Button" exact component={Button} />
                    <Route path="/Calendar" exact component={Calendar} />
                    <Route path="/Card" exact component={Card} />
                    <Route path="/Carousel" exact component={Carousel} />
                    <Route path="/Checkbox" exact component={Checkbox} />
                    <Route path="/Collapse" exact component={Collapse} />
                    <Route path="/DatePicker" exact component={DatePicker} />
                    <Route path="/Dropdown" exact component={Dropdown} />
                    <Route path="/Form" exact component={Form} />
                    <Route path="/Icon" exact component={Icon} />
                    <Route path="/Input" exact component={Input} />
                    <Route path="/Layout" exact component={Layout} />
                    <Route path="/Loading" exact component={Loading} />
                    <Route path="/Menu" exact component={Menu} />
                    <Route path="/Message" exact component={Message} />
                    <Route path="/Modal" exact component={Modal} />
                    <Route path="/Notification" exact component={Notification} />
                    <Route path="/Pagination" exact component={Pagination} />
                    <Route path="/Popconfirm" exact component={Popconfirm} />
                    <Route path="/Popover" exact component={Popover} />
                    <Route path="/Progress" exact component={Progress} />
                    <Route path="/Radio" exact component={Radio} />
                    <Route path="/Rate" exact component={Rate} />
                    <Route path="/Slider" exact component={Slider} />
                    <Route path="/Steps" exact component={Steps} />
                    <Route path="/Switch" exact component={Switch} />
                    <Route path="/Table" exact component={Table} />
                    <Route path="/Tabs" exact component={Tabs} />
                    <Route path="/Tag" exact component={Tag} />
                    <Route path="/Timeline" exact component={Timeline} />
                    <Route path="/Tooltip" exact component={Tooltip} />
                    <Route path="/Tree" exact component={Tree} />
                    <Route path="/Upload" exact component={Upload} />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    </Router>, document.getElementById('app'));

