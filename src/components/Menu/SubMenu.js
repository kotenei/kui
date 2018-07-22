import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import omit from "object.omit";
import domUtils from "../../utils/domUtils";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid, FirstChild } from "../../utils";
import Tooltip from "../Tooltip";

class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            left: -999,
            height: 0,
            position: "absolute",
            show: false
        };
    }
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        disabled: PropTypes.bool
    };
    static defaultProps = {
        disabled: false
    };
    handleItemClick = e => {
        const { onItemTrigger, id, parentIds, mode, disabled } = this.props;
        if (disabled) {
            return;
        }
        if (onItemTrigger) {
            onItemTrigger(e, { id, parentIds }, "openChange");
        }
    };
    handleSubItemClick = e => {
        this.hide();
    };
    handleItemEnter = e => {
        this.show();
    };
    handleItemLeave = () => {
        this.hide();
    };
    handleMenuOver = () => {
        this.show();
    };
    show = () => {
        const { mode, disabled } = this.props;
        if (mode == "inline" || disabled) {
            return;
        }
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.setState({
            show: true
        });
    };
    hide = () => {
        const { mode } = this.props;
        const { show } = this.state;
        if (mode == "inline" || !show) {
            return;
        }
        this.tm = setTimeout(() => {
            this.setState({
                show: false
            });
        }, 150);
    };
    componentDidMount() {
        const { mode, level } = this.props;
        let left = domUtils.outerWidth(this.refs.subItem, true);
        let top = domUtils.outerHeight(this.refs.subItem, true);
        if (
            mode == "vertical" ||
            mode == "inlineCollapsed" ||
            (mode == "horizontal" && level > 1)
        ) {
            this.setState({
                left
            });
        }
        if (mode == "horizontal" && level == 1) {
            this.setState({
                left: 0,
                top
            });
        }
        document.addEventListener("click", this.hide);
    }
    componentWillUnmount() {
        if (this.tm) {
            clearTimeout(this.tm);
        }
        document.removeEventListener("click", this.hide);
    }
    renderTitle(isOpen) {
        const { prefixCls, mode, inlineIndent, title, level } = this.props;
        let tooltipTitle = [],
            icon;

        if (mode == "inlineCollapsed" && level == 1) {
            React.Children.forEach(title, child => {
                if (!child || !child.props.children) {
                    return;
                }
                React.Children.forEach(child.props.children, (item, index) => {
                    if (
                        item &&
                        item.type &&
                        item.type.displayName == "Icon" &&
                        index == 0
                    ) {
                        icon = item;
                    } else {
                        tooltipTitle.push(item);
                    }
                });
            });
            return (
                <div
                    className={classnames({
                        [`${prefixCls}-submenu-title`]: true,
                        [`${prefixCls}-item`]: true,
                        [`${prefixCls}-collapsed-item`]: true
                    })}
                >
                    {icon}
                </div>
            );
        }
        return (
            <div
                className={classnames({
                    [`${prefixCls}-submenu-title`]: true,
                    [`${prefixCls}-item`]: true
                })}
                style={{ paddingLeft: mode == "inline" ? inlineIndent : null }}
                onClick={this.handleItemClick}
            >
                {title}
                {this.renderIcon(isOpen)}
            </div>
        );
    }
    renderIcon(isOpen) {
        const { mode, children, level } = this.props;
        if (!children || (mode == "inlineCollapsed" && level == 1)) {
            return null;
        }
        if (mode == "inline" || (mode == "horizontal" && level == 1)) {
            return <Icon className="direction" type={isOpen ? "up" : "down"} />;
        }
        return <Icon className="direction" type="right" />;
    }
    renderSub(props) {
        const {
            prefixCls,
            children,
            inlineIndent,
            openIds,
            id,
            mode,
            level,
            parentIds
        } = this.props;
        const { left, top, show } = this.state;
        let newParentIds = [...parentIds];
        let isOpen = openIds.indexOf(id) != -1;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-sub`]: true,
            [`${prefixCls}-pop-enter`]: mode == "vertical" && show,
            "slide-down-enter": mode == "horizontal" && show && level == 1
        });
        let isHide = mode != "inline" ? !show : !isOpen;
        let style = {};
        if (mode != "inline") {
            style = {
                top,
                left
            };
        }
        let animateName = "slide";
        if (
            mode == "vertical" ||
            mode == "inlineCollapsed" ||
            mode == "horizontal"
        ) {
            animateName = `${prefixCls}-pop`;
        }
        if (level == 1 && mode == "horizontal") {
            animateName = "slide-down";
        }
        if (parentIds.indexOf(id) == -1) {
            newParentIds.push(id);
        }
        let menu = !isHide ? (
            <CSSTransition timeout={300} classNames={animateName}>
                <ul
                    className={classString}
                    ref="subMenu"
                    style={style}
                    onMouseEnter={this.handleMenuOver}
                >
                    {React.Children.map(children, (child, index) => {
                        if (!child) {
                            return null;
                        }
                        return React.cloneElement(child, {
                            ...props,
                            ...child.props,
                            inlineIndent:
                                mode == "inline"
                                    ? inlineIndent * 2
                                    : inlineIndent,
                            level: level + 1,
                            parentIds: newParentIds,
                            parentId: id
                        });
                    })}
                </ul>
            </CSSTransition>
        ) : null;

        return <TransitionGroup component={FirstChild}>{menu}</TransitionGroup>;
    }
    render() {
        const {
            prefixCls,
            mode,
            title,
            disabled,
            children,
            inlineIndent,
            openIds,
            id,
            level,
            selectedSubmenuIds
        } = this.props;
        const { show } = this.state;
        let isOpen = openIds.indexOf(id) != -1 || show;
        let classString = classnames({
            [`${prefixCls}-submenu`]: true,
            [`${prefixCls}-submenu-${mode}`]: true,
            [`${prefixCls}-submenu-open`]: isOpen,
            [`${prefixCls}-submenu-disabled`]: disabled,
            [`${prefixCls}-submenu-selected`]:
                selectedSubmenuIds.indexOf(id) != -1
        });
        let props = omit(this.props, ["children", "style"]);
        return (
            <li
                ref="subItem"
                className={classString}
                onMouseEnter={this.handleItemEnter}
                onMouseLeave={this.handleItemLeave}
            >
                {this.renderTitle(isOpen)}
                {this.renderSub(props)}
            </li>
        );
    }
}

export default SubMenu;
