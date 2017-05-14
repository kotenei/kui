import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom'

import Home from './views/Home';
import Button from './views/Button';
import Icon from './views/Icon';
import Breadcrumb from './views/Breadcrumb';
import Tag from './views/Tag';

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
                                <li><NavLink to="/Pagination" activeClassName="selected">Pagination 分页</NavLink></li>
                                <li><NavLink to="/Steps" activeClassName="selected">Steps 步骤</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            Data
                            <ul>
                                <li><NavLink to="/Tag" activeClassName="selected">Tag 标签</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="main-container">
                    <Route path="/" exact component={Home} />
                    <Route path="/Button" exact component={Button} />
                    <Route path="/Icon" exact component={Icon} />
                    <Route path="/Tag" exact component={Tag} />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    </Router>, document.getElementById('app'));

