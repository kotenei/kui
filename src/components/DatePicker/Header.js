import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import { prefix } from "../../utils/kUtils";

class Header extends Component {
    render() {
        const { prefixCls } = this.props;
        return (
            <div className={`${prefixCls}-header`}>
                <Icon type="doubleleft" className={`${prefixCls}-prev-button`} />
                <Icon type="left" className={`${prefixCls}-prev-button`}/>
                <span className={`${prefixCls}-header-select`}>
                    <span className={`${prefixCls}-header-select-year`}>2018年</span>
                    <span className={`${prefixCls}-header-select-month`}>12月</span>
                </span>
                <Icon type="right" className={`${prefixCls}-next-button`}/>
                <Icon type="doubleright" className={`${prefixCls}-next-button`}/>
            </div>
        );
    }
}

export default Header;
