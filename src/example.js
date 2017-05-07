import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Home from './views/Home';
import Button from './views/Button'

ReactDOM.render(
    <Router>
        <div className="page-wrapper">
            <div className="main-wrapper">
                <div className="main-nav">
                    <ul>
                        <li><Link to="/">KUI for React</Link></li>
                        <li>
                            基础组件
                            <ul>
                                <li><Link to="/Button">Button 按钮</Link></li>
                                <li><Link to="/Icon">Icon 图标</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="main-container">
                    <Route path="/" exact component={Home} />
                    <Route path="/Button" exact component={Button} />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    </Router>, document.getElementById('app'));

