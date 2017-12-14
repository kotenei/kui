import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import omit from 'object.omit';
import domUtils from '../../utils/domUtils'

class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            left: 0,
            show: false
        }
    }
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
    handleItemEnter = (e) => {
        const { level, mode } = this.props;
        if (mode == 'inline') {
            return;
        }
        let width = domUtils.outerWidth(this.refs.subItem, true);
        this.setState({
            left: width,
            show: true
        });
    }
    handleItemLeave = () => {
        const { mode } = this.props;
        if (mode == 'inline') {
            return;
        }
        setTimeout(() => {
            this.setState({
                show: false
            })
        }, 200);
    }
    handleMenuOver = () => {
        if (this.tm) {
            clearTimeout(tm)
        }
        this.setState({
            show:true
        })
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
    renderSub(props) {
        const { prefixCls, children, inlineIndent, openIds, id, mode, level } = this.props;
        const { left, top, show } = this.state;
        let isOpen = openIds.indexOf(id) != -1;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-sub`]: true,
            'hidden': mode != 'inline' ? !show : !isOpen
        });
        return (
            <ul
                className={classString}
                ref="submenu" style={{ left, top }}
                onMouseEnter={this.handleMenuOver}>
                {
                    React.Children.map(children, (child, index) => {
                        if (!child) {
                            return null;
                        }
                        return React.cloneElement(child, {
                            ...props,
                            ...child.props,
                            inlineIndent: inlineIndent * 2,
                            level: level + 1
                        });
                    })
                }
            </ul>
        );
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
        let props = omit(this.props, ['children', 'style']);
        return (
            <li
                className={classString} ref="subItem"
                onMouseEnter={this.handleItemEnter}
                onMouseLeave={this.handleItemLeave}
            >
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
                {this.renderSub(props)}
            </li>
        )
    }
}

export default SubMenu;