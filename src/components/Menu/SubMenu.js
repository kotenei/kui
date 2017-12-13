import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import omit from 'object.omit';

class SubMenu extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.oneOfType[PropTypes.string, PropTypes.node],
        disabled: PropTypes.bool
    }
    static defaultProps = {
        disabled: false
    }
    handleItemClick = (e) => {
        const { onItemClick, id } = this.props;
        if (onItemClick) {
            onItemClick(e, id, 'openChange');
        }
    }
    renderIcon(isOpen) {
        const { mode, children } = this.props;
        if (!children) {
            return null;
        }
        if (mode == 'inline') {
            return <Icon className="direction" type={isOpen ? 'up' : 'down'} />;
        }
        return <Icon className="direction" type="right" />;
    }
    render() {
        const { prefixCls, mode, title, disabled, children, inlineIndent, openIds, id, level } = this.props;
        let isOpen = openIds.indexOf(id) != -1;
        let classString = classnames({
            [`${prefixCls}-submenu`]: true,
            [`${prefixCls}-submenu-${mode}`]: true,
            [`${prefixCls}-submenu-open`]: isOpen,
            [`${prefixCls}-submenu-disabled`]: disabled,
        });
        let ulClassString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-sub`]: true,
            'hidden': !isOpen
        });
        let props = omit(this.props, ['children', 'style']);

        return (
            <li className={classString} >
                <div className={classnames({
                    [`${prefixCls}-submenu-title`]: true,
                    [`${prefixCls}-item`]: true
                })}
                    style={{ paddingLeft: inlineIndent }}
                    onClick={this.handleItemClick}
                >
                    {title}
                    {this.renderIcon(isOpen)}
                </div >
                <ul className={ulClassString} >
                    {
                        React.Children.map(children, (child, index) => {
                            if (!child) {
                                return null;
                            }
                            return React.cloneElement(child, {
                                ...props,
                                ...child.props,
                                inlineIndent: inlineIndent * 2,
                                level: level+1
                            });
                        })
                    }
                </ul>
            </li>
        )
    }
}

export default SubMenu;