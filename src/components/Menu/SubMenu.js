import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class SubMenu extends Component {
    static propTypes = {
        key: PropTypes.string,
        title: PropTypes.oneOfType[PropTypes.string, PropTypes.node],
        open: PropTypes.bool,
        disabled: PropTypes.bool
    }
    static defaultProps = {
        open: true,
        disabled: false
    }
    render() {
        const { prefixCls, mode, title, disabled, open, children } = this.props;
        let classString = classnames({
            [`${prefixCls}-submenu-${mode}`]: true,
            [`${prefixCls}-submenu-open`]: open,
            [`${prefixCls}-submenu-disabled`]: disabled,
        });
        let ulClassString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-sub`]: true
        });
        return (
            <li className={classString}>
                <div className={`${prefixCls}-submenu-title`}>
                    {title}
                </div>
                <ul className={ulClassString}>
                    {children}
                </ul>
            </li>
        )
    }
}

export default SubMenu;