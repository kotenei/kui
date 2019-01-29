import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import domUtils from "../../utils/domUtils";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid } from "../../utils";
import PopPanel from "../PopPanel";

let seed = 1;
let instances = {};

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.id = `dropdown_${seed++}`;
        instances[this.id] = this;
    }
    static propTypes = {
        fullWidth: PropTypes.bool,
        prefixCls: PropTypes.string,
        component: PropTypes.any,
        menu: PropTypes.element,
        selectedIds: PropTypes.array,
        trigger: PropTypes.oneOf(["click", "hover", "manual"]),
        placement: PropTypes.oneOf([
            "topLeft",
            "top",
            "topRight",
            "bottomLeft",
            "bottom",
            "bottomRight"
        ]),
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        show: PropTypes.bool,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        fullWidth: false,
        prefixCls: "k-dropdown",
        component: "div",
        selectedIds: [],
        placement: "bottomLeft",
        trigger: "hover",
        disabled: false,
        multiple: false
    };
    handleMouseEnter = e => {
        const { trigger } = this.props;
        if (trigger == "click" || trigger == "manual") {
            return;
        }
        this.show();
    };
    handleMouseLeave = e => {
        const { trigger } = this.props;
        if (trigger == "click" || trigger == "manual") {
            return;
        }
        this.hide();
    };
    handleClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { show } = this.state;
        const { trigger } = this.props;
        if (trigger == "hover" || trigger == "manual") {
            return;
        }
        if (show) {
            this.hide();
        } else {
            this.show();
        }
        this.hideOther();
    };
    handleMenuEnter = e => {
        const { trigger } = this.props;
        if (trigger == "click" || trigger == "manual") {
            return;
        }
        this.show();
    };
    handleMenuLeave = e => {
        const { trigger } = this.props;
        if (trigger == "click" || trigger == "manual") {
            return;
        }
        this.hide();
    };
    handleMenuSelect = (e, selectedIds, info) => {
        const { onSelect, multiple } = this.props;
        if (onSelect) {
            onSelect(e, selectedIds, info);
        }
        if (!multiple) {
            this.hide();
        }
    };
    show = () => {
        const { disabled } = this.props;
        if (disabled) {
            return;
        }
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.tm = setTimeout(() => {
            this.setState({
                show: true
            });
        }, 100);
    };
    hide = () => {
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.tm = setTimeout(() => {
            this.setState({
                show: false
            });
        }, 300);
    };
    hideOther() {
        for (var k in instances) {
            if (k == this.id) {
                continue;
            }
            instances[k].hide();
        }
    }
    componentDidMount() {
        document.addEventListener("click", this.hide);
    }
    componentWillReceiveProps(nextProps) {
        if ("show" in nextProps) {
            if (nextProps.show) {
                this.show();
            } else {
                this.hide();
            }
        }
    }
    componentWillUnmount() {
        if (this.tm) {
            clearTimeout(this.tm);
        }
        document.removeEventListener("click", this.hide);
        delete instances[this.id];
    }
    renderMenu() {
        const { menu, prefixCls, multiple, selectedIds } = this.props;

        return (
            menu &&
            React.cloneElement(menu, {
                ...menu.props,
                multiple,
                selectedIds,
                mode: "vertical",
                className: classnames(menu.props.className, {
                    [`${prefixCls}-menu`]: true
                }),
                onMouseEnter: this.handleMenuEnter,
                onMouseLeave: this.handleMenuLeave,
                onSelect: this.handleMenuSelect
            })
        );
    }
    renderChilren() {
        const { children } = this.props;
        return React.Children.map(children, child => {
            if (!child) {
                return null;
            }
            let handle = {};
            if (
                (child.props.trigger && child.props.trigger == "dropdown") ||
                !Array.isArray(children)
            ) {
                handle = {
                    onMouseEnter: this.handleMouseEnter,
                    onMouseLeave: this.handleMouseLeave,
                    onClick: this.handleClick
                };
            }
            return React.cloneElement(child, {
                ...child.props,
                ...handle
            });
        });
    }
    render() {
        const {
            prefixCls,
            className,
            style,
            component: Container,
            placement,
            fullWidth
        } = this.props;
        const { show } = this.state;
        let classString = classnames(className, {
            [`${prefixCls}`]: true
        });
        let input = (
            <Container className={classString} ref="trigger" style={style}>
                {this.renderChilren()}
            </Container>
        );

        return (
            <PopPanel
                fullWidth={fullWidth}
                open={show}
                input={input}
                placement={placement}
            >
                {this.renderMenu()}
            </PopPanel>
        );
    }
}

export default Dropdown;
