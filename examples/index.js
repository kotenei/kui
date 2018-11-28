import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import Home from "./components/Home";
import Alert from "./components/Alert";
import AutoComplete from "./components/AutoComplete";
import Badge from "./components/Badge";
import Breadcrumb from "./components/Breadcrumb";
import Button from "./components/Button";
import Calendar from './components/Calendar';
import Card from "./components/Card";
import Carousel from "./components/Carousel";
import Collapse from "./components/Collapse";
import Checkbox from "./components/Checkbox";
import DatePicker from "./components/Datepicker";
import Dropdown from "./components/Dropdown";
import Form from './components/Form';
import Grid from './components/Grid';
import Icon from "./components/Icon";
import InfiniteScroll from "./components/InfiniteScroll";
import Input from "./components/Input";
import Layout from "./components/Layout";
import LazyLoad from "./components/LazyLoad";
import Loading from "./components/Loading";
import Menu from "./components/Menu";
import Message from "./components/Message";
import Modal from "./components/Modal";
import Notification from "./components/Notification";
import Pagination from "./components/Pagination";
import Popconfirm from "./components/Popconfirm";
import Popover from "./components/Popover";
import Progress from "./components/Progress";
import Radio from "./components/Radio";
import Rate from "./components/Rate";
import Select from "./components/Select";
import Slider from "./components/Slider";
import Steps from "./components/Steps";
import Switch from "./components/Switch";
import Table from './components/Table';
import Tabs from "./components/Tabs";
import Tag from "./components/Tag";
import Timeline from "./components/Timeline";
import TimePicker from "./components/TimePicker";
import Tooltip from "./components/Tooltip";
import Tree from './components/Tree';
import Upload from './components/Upload';

import "./style.css";

ReactDOM.render(
    <Router>
        <div className="page-wrapper">
            <div className="main-wrapper">
                <div className="main-nav">
                    <ul>
                        <li>
                            <NavLink to="/" activeClassName="selected">
                                KUI of React
                            </NavLink>
                        </li>
                        <li>
                            Basic
                            <ul>
                                <li>
                                    <NavLink
                                        to="/Button"
                                        activeClassName="selected"
                                    >
                                        Button 按钮
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Icon"
                                        activeClassName="selected"
                                    >
                                        Icon 图标
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Grid"
                                        activeClassName="selected"
                                    >
                                        Grid 栅格
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Navigation
                            <ul>
                                <li>
                                    <NavLink
                                        to="/Breadcrumb"
                                        activeClassName="selected"
                                    >
                                        Breadcrumb 面包屑
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Dropdown"
                                        activeClassName="selected"
                                    >
                                        Dropdown 下拉菜单
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Menu"
                                        activeClassName="selected"
                                    >
                                        Menu 菜单
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Pagination"
                                        activeClassName="selected"
                                    >
                                        Pagination 分页
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Steps"
                                        activeClassName="selected"
                                    >
                                        Steps 步骤条
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Tabs"
                                        activeClassName="selected"
                                    >
                                        Tabs 标签
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Data Entry
                            <ul>
                                <li>
                                    <NavLink
                                        to="/AutoComplete"
                                        activeClassName="selected"
                                    >
                                        AutoComplete 自动完成
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Checkbox"
                                        activeClassName="selected"
                                    >
                                        Checkbox 多选框
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/DatePicker"
                                        activeClassName="selected"
                                    >
                                        DatePicker 日期选择
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="###"
                                        className="disabled"
                                        activeClassName="selected"
                                    >
                                        Form 表单
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Input"
                                        activeClassName="selected"
                                    >
                                        Input 输入框
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Radio"
                                        activeClassName="selected"
                                    >
                                        Radio 单选框
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Rate"
                                        activeClassName="selected"
                                    >
                                        Rate 评分
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Select"
                                        activeClassName="selected"
                                    >
                                        Select 选择器
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Slider"
                                        activeClassName="selected"
                                    >
                                        Slider 滑动条
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Switch"
                                        activeClassName="selected"
                                    >
                                        Switch 开关
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/TimePicker"
                                        activeClassName="selected"
                                    >
                                        TimePicker 时间选择
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Upload"
                                        activeClassName="selected"
                                    >
                                        Upload 上传
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Data Display
                            <ul>
                                <li>
                                    <NavLink
                                        to="/Badge"
                                        activeClassName="selected"
                                    >
                                        Badge 徽章
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Calendar"
                                        activeClassName="selected"
                                    >
                                        Calendar 日历
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Card"
                                        activeClassName="selected"
                                    >
                                        Card 卡片
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Carousel"
                                        activeClassName="selected"
                                    >
                                        Carousel 走马灯
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Collapse"
                                        activeClassName="selected"
                                    >
                                        Collapse 折叠面板
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/InfiniteScroll"
                                        activeClassName="selected"
                                    >
                                        InfiniteScroll 无限加载
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/LazyLoad"
                                        activeClassName="selected"
                                    >
                                        LazyLoad 延迟加载
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Popover"
                                        activeClassName="selected"
                                    >
                                        Popover 弹出框
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Tooltip"
                                        activeClassName="selected"
                                    >
                                        Tooltip 文字提示
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="###"
                                        className="disabled"
                                        activeClassName="selected"
                                    >
                                        Table 表格
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Tag"
                                        activeClassName="selected"
                                    >
                                        Tag 标签
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Timeline"
                                        activeClassName="selected"
                                    >
                                        Timeline 时间轴
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Tree"
                                        activeClassName="selected"
                                    >
                                        Tree 树型
                                    </NavLink>
                                </li>{" "}
                            </ul>
                        </li>
                        <li>
                            Feedback
                            <ul>
                                <li>
                                    <NavLink
                                        to="/Alert"
                                        activeClassName="selected"
                                    >
                                        Alert 警告提示
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Modal"
                                        activeClassName="selected"
                                    >
                                        Modal 对话框
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Message"
                                        activeClassName="selected"
                                    >
                                        Message 消息提示
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Notification"
                                        activeClassName="selected"
                                    >
                                        Notification 通知提醒框
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Progress"
                                        activeClassName="selected"
                                    >
                                        Progress 进度条
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Popconfirm"
                                        activeClassName="selected"
                                    >
                                        Popconfirm 气泡确认框
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Loading"
                                        activeClassName="selected"
                                    >
                                        Loading 加载中
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="main-container">
                    <Route path="/" exact component={Home} />
                    <Route path="/Alert" exact component={Alert} />
                    <Route
                        path="/AutoComplete"
                        exact
                        component={AutoComplete}
                    />
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
                    <Route path="/Grid" exact component={Grid} />
                    <Route path="/Icon" exact component={Icon} />
                    <Route
                        path="/InfiniteScroll"
                        exact
                        component={InfiniteScroll}
                    />
                    <Route path="/Input" exact component={Input} />
                    <Route path="/Layout" exact component={Layout} />
                    <Route path="/LazyLoad" exact component={LazyLoad} />
                    <Route path="/Loading" exact component={Loading} />
                    <Route path="/Menu" exact component={Menu} />
                    <Route path="/Message" exact component={Message} />
                    <Route path="/Modal" exact component={Modal} />
                    <Route
                        path="/Notification"
                        exact
                        component={Notification}
                    />
                    <Route path="/Pagination" exact component={Pagination} />
                    <Route path="/Popconfirm" exact component={Popconfirm} />
                    <Route path="/Popover" exact component={Popover} />
                    <Route path="/Progress" exact component={Progress} />
                    <Route path="/Radio" exact component={Radio} />
                    <Route path="/Rate" exact component={Rate} />
                    <Route path="/Select" exact component={Select} />
                    <Route path="/Slider" exact component={Slider} />
                    <Route path="/Steps" exact component={Steps} />
                    <Route path="/Switch" exact component={Switch} />
                    <Route path="/Table" exact component={Table} />
                    <Route path="/Tabs" exact component={Tabs} />
                    <Route path="/Tag" exact component={Tag} />
                    <Route path="/Timeline" exact component={Timeline} />
                    <Route path="/TimePicker" exact component={TimePicker} />
                    <Route path="/Tooltip" exact component={Tooltip} />
                    <Route path="/Tree" exact component={Tree} />
                    <Route path="/Upload" exact component={Upload} /> 
                </div>
                <div className="clearfix" />
            </div>
        </div>
    </Router>,
    document.getElementById("app")
);
