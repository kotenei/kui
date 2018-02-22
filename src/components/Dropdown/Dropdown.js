import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import domUtils from "../../utils/domUtils";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid, FirstChild } from "../../utils/kUtils";

let seed = 1;
let instances = {};

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: { top: -999, left: -999 },
            show: true
        };
        this.id = `dropdown_${seed++}`;
        instances[this.id] = this;
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        component: PropTypes.oneOfType(PropTypes.string, PropTypes.element),
        menu: PropTypes.element,
        selectedIds: PropTypes.array,
        trigger: PropTypes.oneOf[("click", "hover", "manual")],
        placement:
            PropTypes.oneOf[
                ("topLeft",
                "topCenter",
                "topRight",
                "bottomLeft",
                "bottomCenter",
                "bottomRight")
            ],
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        show: PropTypes.bool,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        prefixCls: "k-dropdown",
        component: "div",
        selectedIds: [],
        placement: "bottomLeft",
        trigger: "hover",
        disabled: false,
        multiple: false
    };
    setOrgSize() {
        let dom = ReactDOM.findDOMNode(this.refs.dropdownMenu);
        this.orgSize = {
            w: domUtils.outerWidth(dom),
            h: domUtils.outerHeight(dom)
        };
    }
    setPosition() {
        const { placement } = this.props;
        let parent = ReactDOM.findDOMNode(this.refs.trigger),
            ew = domUtils.outerWidth(parent, true),
            eh = domUtils.outerHeight(parent, true),
            tw = this.orgSize.w,
            th = this.orgSize.h,
            n = 4,
            position,
            top,
            left;

        switch (placement) {
            case "topLeft":
                position = { top: -th - n, left: 0 };
                break;
            case "topCenter":
                position = { top: -th - n, marginLeft: -(tw / 2), left: "50%" };
                break;
            case "topRight":
                position = { top: -th - n, right: 0 };
                break;
            case "bottomLeft":
                position = { top: eh + n, left: 0 };
                break;
            case "bottomCenter":
                position = { top: eh + n, marginLeft: -(tw / 2), left: "50%" };
                break;
            case "bottomRight":
                position = { top: eh + n, right: 0 };
                break;
            default:
                position = { top: eh + n, left: 0 };
                break;
        }
        this.setState({
            position
        });
    }
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
        if (trigger == "click") {
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
        const { onSelect } = this.props;
        if (onSelect) {
            onSelect(e, selectedIds, info);
        }
    };
    show = () => {
        this.setPosition();
        const { disabled } = this.props;
        if (disabled) {
            return;
        }
        if (this.tm) {
            clearTimeout(this.tm);
        }
        setTimeout(() => {
            this.setState({
                show: true
            });
        }, 100);
    };
    hide = () => {
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
        this.setOrgSize();
        this.hide();
        document.addEventListener("click", this.hide);
    }
    componentWillReceiveProps(nextProps) {
        if ("show" in this.props && this.props.show != nextProps.show) {
            this.setState({
                show: nextProps.show
            });
        }
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.hide);
        delete instances[this.id];
    }
    renderMenu() {
        const { menu, prefixCls, multiple, selectedIds } = this.props;
        const { position, show } = this.state;
        if (!menu) {
            return null;
        }
        let newMenu = show ? (
            <CSSTransition timeout={300} classNames="slide-bottom">
                {React.cloneElement(menu, {
                    ...menu.props,
                    multiple,
                    selectedIds,
                    ref: "dropdownMenu",
                    mode: "vertical",
                    className: classnames({
                        [`${prefixCls}-menu`]: true,
                        "slide-bottom-enter": true
                    }),
                    style: position,
                    onMouseEnter: this.handleMenuEnter,
                    onMouseLeave: this.handleMenuLeave,
                    onSelect: this.handleMenuSelect
                })}
            </CSSTransition>
        ) : null;

        return (
            <TransitionGroup component={FirstChild}>{newMenu}</TransitionGroup>
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
            component: Container
        } = this.props;
        let classString = classnames(className, {
            [`${prefixCls}`]: true
        });
        return (
            <Container className={classString} ref="trigger" style={style}>
                {this.renderChilren()}
                {this.renderMenu()}
            </Container>
        );
    }
}

export default Dropdown;
