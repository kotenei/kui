import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import omit from 'object.omit';
import domUtils from '../../utils/domUtils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { guid, FirstChild } from '../../utils/kUtils';

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
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.setState({
            show: true
        });
    }
    handleItemLeave = () => {
        const { mode } = this.props;
        if (mode == 'inline') {
            return;
        }
        this.tm = setTimeout(() => {
            this.setState({
                show: false
            })
        }, 150);
    }
    handleMenuOver = () => {
        const { mode } = this.props;
        if (mode == 'inline') {
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
        const { mode, level } = this.props;
        let left = domUtils.outerWidth(this.refs.subItem, true);
        let top = domUtils.outerHeight(this.refs.subItem, true);
        if (mode == 'vertical' || mode == 'horizontal' && level > 1) {
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
    renderIcon(isOpen) {
        const { mode, children, level } = this.props;
        if (!children) {
            return null;
        }
        if (mode == 'inline' || mode == 'horizontal' && level == 1) {
            return <Icon className="direction" type={isOpen ? 'up' : 'down'} />;
        }
        return <Icon className="direction" type="right" />;
    }
    renderSub(props) {
        const { prefixCls, children, inlineIndent, openIds, id, mode, level, rootId } = this.props;
        const { left, top, show } = this.state;
        let isOpen = openIds.indexOf(id) != -1;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-sub`]: true,
            [`${prefixCls}-pop-enter`]: mode == 'vertical' && show
        });
        let isHide = mode != 'inline' ? !show : !isOpen;
        let style = {};
        if (mode != 'inline') {
            style = {
                top,
                left
            }
        }
        let animateName = 'slide';
        if (mode == 'vertical') {
            animateName = `${prefixCls}-pop`;
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
                                parentId: id,
                                rootId
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
        const { prefixCls, mode, title, disabled, children, inlineIndent, openIds, id, level } = this.props;
        const { show } = this.state;
        let isOpen = openIds.indexOf(id) != -1 || show;
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