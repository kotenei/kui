import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import omit from 'object.omit';
import domUtils from '../../utils/domUtils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { guid, FirstChild } from '../../utils/kUtils';
import Tooltip from '../Tooltip';

class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            left: -999,
            height: 0,
            position: 'absolute',
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
        const { onItemClick, id, parentIds, mode } = this.props;
        if (onItemClick) {
            onItemClick(e, id, parentIds, 'openChange');
        }
    }
    handleItemEnter = (e) => {
        const { level, mode, inlineCollapsed } = this.props;
        if (mode == 'inline' && !inlineCollapsed) {
            return;
        }
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.setState({
            show: true
        });
    }
    handleItemLeave = () => {
        const { mode, inlineCollapsed } = this.props;
        if (mode == 'inline' && !inlineCollapsed) {
            return;
        }
        this.tm = setTimeout(() => {
            this.setState({
                show: false
            })
        }, 150);
    }
    handleMenuOver = () => {
        const { mode, inlineCollapsed } = this.props;
        if (mode == 'inline' && !inlineCollapsed) {
            return;
        }
        if (this.tm) {
            clearTimeout(this.tm)
        }
        this.setState({
            show: true
        })
    }
    componentDidMount() {
        const { mode, level, inlineCollapsed } = this.props;
        let left = domUtils.outerWidth(this.refs.subItem, true);
        let top = domUtils.outerHeight(this.refs.subItem, true);
        if (mode == 'vertical' || inlineCollapsed || mode == 'horizontal' && level > 1) {
            this.setState({
                left
            })
        }
        if (mode == 'horizontal' && level == 1) {
            this.setState({
                left: 0,
                top
            })
        }
    }
    renderTitle(isOpen) {
        const { prefixCls, mode, inlineIndent, title, inlineCollapsed } = this.props;
        // if (mode == 'inline' && inlineCollapsed) {

        //     return (
        //         <div className="">

        //         </div>
        //     )
        // }
        return (
            <div className={classnames({
                [`${prefixCls}-submenu-title`]: true,
                [`${prefixCls}-item`]: true
            })}
                style={{ paddingLeft: mode == 'inline' ? inlineIndent : null }}
                onClick={this.handleItemClick}

            >
                {title}
                {this.renderIcon(isOpen)}
            </div >
        )
    }
    renderIcon(isOpen) {
        const { mode, children, level, inlineCollapsed } = this.props;
        if (!children || mode == 'inline' && level == 1 && inlineCollapsed) {
            return null;
        }
        if (mode == 'inline' && !inlineCollapsed || mode == 'horizontal' && level == 1) {
            return <Icon className="direction" type={isOpen ? 'up' : 'down'} />;
        }
        return <Icon className="direction" type="right" />;
    }
    renderSub(props) {
        const { prefixCls, children, inlineIndent, openIds, id, mode, level, parentIds, inlineCollapsed } = this.props;
        const { left, top, show } = this.state;
        let newParentIds = [...parentIds];
        let isOpen = openIds.indexOf(id) != -1;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-sub`]: true,
            [`${prefixCls}-pop-enter`]: mode == 'vertical' && show
        });
        let isHide = mode != 'inline' || inlineCollapsed ? !show : !isOpen;
        let style = {};
        if (mode != 'inline' || inlineCollapsed) {
            style = {
                top,
                left
            }
        }
        let animateName = 'slide';
        if (mode == 'vertical' || inlineCollapsed) {
            animateName = `${prefixCls}-pop`;
        }
        if (parentIds.indexOf(id) == -1) {
            newParentIds.push(id);
        }
        let menu = !isHide ? (
            <CSSTransition
                timeout={300}
                classNames={animateName}>
                <ul
                    className={classString}
                    ref="subMenu"
                    style={style}
                    onMouseEnter={this.handleMenuOver}>
                    {
                        React.Children.map(children, (child, index) => {
                            if (!child) {
                                return null;
                            }
                            return React.cloneElement(child, {
                                ...props,
                                ...child.props,
                                inlineIndent: mode == 'inline' ? inlineIndent * 2 : inlineIndent,
                                level: level + 1,
                                parentIds: newParentIds,
                                parentId: id
                            });
                        })
                    }
                </ul>
            </CSSTransition>
        ) : null;

        return (
            <TransitionGroup component={FirstChild}  >
                {menu}
            </TransitionGroup>
        );
    }
    render() {
        const { prefixCls, mode, title, disabled, children, inlineIndent, openIds, id, level, selectedSubmenuIds } = this.props;
        const { show } = this.state;
        let isOpen = openIds.indexOf(id) != -1 || show;
        let classString = classnames({
            [`${prefixCls}-submenu`]: true,
            [`${prefixCls}-submenu-${mode}`]: true,
            [`${prefixCls}-submenu-open`]: isOpen,
            [`${prefixCls}-submenu-disabled`]: disabled,
            [`${prefixCls}-submenu-selected`]: selectedSubmenuIds.indexOf(id) != -1
        });
        let props = omit(this.props, ['children', 'style']);
        return (
            <li
                className={classString} ref="subItem"
                onMouseEnter={this.handleItemEnter}
                onMouseLeave={this.handleItemLeave}
            >
                {this.renderTitle(isOpen)}
                {this.renderSub(props)}
            </li>
        )
    }
}

export default SubMenu;