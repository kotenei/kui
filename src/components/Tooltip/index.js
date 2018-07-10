import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { kStyles, kClass, kSize, getClassSet } from "../../utils/kUtils";
import { guid, FirstChild } from "../../utils";
import { State, PRIMARY, Sizes } from "../../utils/styleMaps";
import domUtils from "../../utils/domUtils";

let seed = 1;
let instances = {};

class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.handleTriggerMouseEnter = this.handleTriggerMouseEnter.bind(this);
        this.handleTriggerMouseLeave = this.handleTriggerMouseLeave.bind(this);
        this.handleTriggerClick = this.handleTriggerClick.bind(this);
        this.handleTooltipMouseEnter = this.handleTooltipMouseEnter.bind(this);
        this.handleTooltipMouseLeave = this.handleTooltipMouseLeave.bind(this);
        this.handleTooltipClick = this.handleTooltipClick.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.hide = this.hide.bind(this);
        this.id = `tooltip_${seed++}`;
        this.state = {
            position: { top: -999, left: -999 },
            hidden: false
        };
        instances[this.id] = this;
    }
    static propTypes = {
        title: PropTypes.node,
        placement: PropTypes.oneOf([
            "top",
            "left",
            "right",
            "bottom",
            "topLeft",
            "topRight",
            "bottomLeft",
            "bottomRight",
            "leftTop",
            "leftBottom",
            "rightTop",
            "rightBottom"
        ]),
        trigger: PropTypes.oneOf(["hover", "click"]),
        delay: PropTypes.number,
        show: PropTypes.bool,
        onClick: PropTypes.func
    };
    static defaultProps = {
        placement: "top",
        trigger: "hover",
        delay: 100
    };
    handleTriggerMouseEnter() {
        const { trigger } = this.props;
        if (trigger != "hover") {
            return;
        }
        this.show();
    }
    handleTriggerMouseLeave() {
        const { trigger } = this.props;
        if (trigger != "hover") {
            return;
        }
        this.tm = setTimeout(() => {
            this.hide();
        }, 200);
    }
    handleTooltipMouseEnter() {
        const { trigger } = this.props;
        if (this.tm && trigger != "click") {
            clearTimeout(this.tm);
        }
    }
    handleTooltipMouseLeave() {
        const { trigger } = this.props;
        if (trigger == "click") {
            return;
        }
        this.hide();
    }
    handleTriggerClick(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { trigger, onClick } = this.props;
        const { show } = this.state;
        if (onClick) {
            onClick(e);
        }
        if (trigger != "click") {
            return;
        }
        if (!show) {
            this.show();
        } else {
            this.hide();
        }
        this.hideOther();
    }
    handleTooltipClick(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }
    setPosition() {
        let parent = ReactDOM.findDOMNode(this.refs.trigger),
            ew = domUtils.outerWidth(parent),
            eh = domUtils.outerHeight(parent),
            tw = this.orgSize.w,
            th = this.orgSize.h,
            position = { left: 0, top: 0 },
            pos = { left: 0, top: 0 };

        const { placement } = this.props;

        do {
            position.left += parent.offsetLeft - parent.scrollLeft;
            position.top += parent.offsetTop - parent.scrollTop;
        } while ((parent = parent.offsetParent) && parent != document.body);

        switch (placement) {
            case "left":
                pos = {
                    top: position.top + eh / 2 - th / 2,
                    left: position.left - tw
                };
                break;
            case "leftTop":
                pos = { top: position.top, left: position.left - tw };
                break;
            case "leftBottom":
                pos = { top: position.top + eh - th, left: position.left - tw };
                break;
            case "top":
                pos = {
                    top: position.top - th,
                    left: position.left + ew / 2 - tw / 2
                };
                break;
            case "topLeft":
                pos = { top: position.top - th, left: position.left };
                break;
            case "topRight":
                pos = { top: position.top - th, left: position.left + ew - tw };
                break;
            case "right":
                pos = {
                    top: position.top + eh / 2 - th / 2,
                    left: position.left + ew
                };
                break;
            case "rightTop":
                pos = { top: position.top, left: position.left + ew };
                break;
            case "rightBottom":
                pos = { top: position.top + eh - th, left: position.left + ew };
                break;
            case "bottom":
                pos = {
                    top: position.top + eh,
                    left: position.left + ew / 2 - tw / 2
                };
                break;
            case "bottomLeft":
                pos = { top: position.top + eh, left: position.left };
                break;
            case "bottomRight":
                pos = { top: position.top + eh, left: position.left + ew - tw };
                break;
        }

        this.setState({
            position: pos
        });
    }
    setOrgSize() {
        this.orgSize = {
            w: domUtils.outerWidth(this.refs.tooltip),
            h: domUtils.outerHeight(this.refs.tooltip)
        };
    }
    show() {
        const { delay } = this.props;
        this.setState({
            hidden: false
        });
        setTimeout(() => {
            this.setState({
                show: true
            });
            this.setPosition();
        }, delay);
    }
    hide() {
        const { delay } = this.props;
        this.setState({
            show: false
        });
        setTimeout(() => {
            this.setState({
                hidden: true
            });
        }, delay);
    }
    hideOther() {
        for (var k in instances) {
            if (k == this.id) {
                continue;
            }
            instances[k].hide();
        }
    }
    componentDidMount() {
        if (
            typeof this.props.title !== "undefined" &&
            React.Children.toArray(this.props.children).length == 1
        ) {
            this.setOrgSize();
            this.setPosition();
            this.setState({
                show: false,
                hidden: true
            });
        }
        window.addEventListener("resize", this.setPosition);
        document.addEventListener("click", this.hide);
    }
    componentWillReceiveProps(nextProps) {}
    componentWillUnmount() {
        window.removeEventListener("resize", this.setPosition);
        document.removeEventListener("click", this.hide);
        delete instances[this.id];
    }
    renderTooltip() {
        const { title, placement, kClass, className } = this.props;
        const { show, position, hidden } = this.state;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, className, {
            [`${kClass}-hidden`]: hidden,
            [placement]: true,
            in: show
        });

        return ReactDOM.createPortal(
            <div
                className={classString}
                style={position}
                ref="tooltip"
                onMouseEnter={this.handleTooltipMouseEnter}
                onMouseLeave={this.handleTooltipMouseLeave}
                onClick={this.handleTooltipClick}
            >
                <div className={`${kClass}-arrow`} />
                <div className={`${kClass}-inner`}>{title}</div>
            </div>,
            document.body
        );
    }
    render() {
        if (
            !this.props.children ||
            React.Children.toArray(this.props.children).length > 1
        ) {
            return null;
        }
        if (typeof this.props.title === "undefined") {
            return this.props.children;
        }
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                ref: child.ref || "trigger",
                onMouseEnter: this.handleTriggerMouseEnter,
                onMouseLeave: this.handleTriggerMouseLeave,
                onClick: this.handleTriggerClick
            });
        });
        return (
            <span id={this.id} ref={this.id}>
                {children}
                {this.renderTooltip()}
            </span>
        );
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(styles, kClass("k-tooltip", Tooltip));
