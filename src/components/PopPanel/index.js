import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getPosition } from "../../utils";
import domUtils from "../../utils/domUtils";

const prefixCls = "k-popPanel";
let seed = 1;
let instances = {};

class PopPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            position: props.position || {
                left: -999,
                top: -999
            }
        };
        this.id = `poppanel_${seed++}`;
        instances[this.id] = this;
    }
    static propTypes = {
        input: PropTypes.node,
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
        open: PropTypes.bool,
        position: PropTypes.object,
        timeout: PropTypes.number,
        transitionName: PropTypes.string,
        trigger: PropTypes.oneOf(["hover", "click"]),
        onClose: PropTypes.func,
        onOpen: PropTypes.func
    };
    static defaultProps = {
        placement: "bottomLeft",
        timeout: 300,
        transitionName: "slide-down",
        trigger: "click"
    };
    handleClick = e => {
        const { trigger } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (trigger != "click") {
            return;
        }
        if (!("open" in this.props)) {
            this.open();
        }
    };
    handleMouseEnter = e => {
        const { trigger } = this.props;
        if (trigger != "hover") {
            return;
        }
        if (!("open" in this.props)) {
            this.open();
        }
    };
    handleMouseLeave = e => {
        const { trigger } = this.props;
        if (trigger != "hover") {
            return;
        }
        if (!("open" in this.props)) {
            this.hide();
        }
    };
    handlePanelClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };
    /**
     * 定位
     */
    setPosition = position => {
        const { placement } = this.props;
        let width = domUtils.outerWidth(this.refs.panel);
        let height = domUtils.outerHeight(this.refs.panel);
        position =
            position ||
            this.props.position ||
            getPosition({
                trigger: this.refs.trigger,
                placement: placement,
                width,
                height
            });
        this.setState({
            position
        });
    };
    /**
     * 打开
     */
    open = () => {
        const { onOpen } = this.props;
        if (onOpen && onOpen() === false) {
            return;
        }
        this.setPosition();
        this.setState({
            open: true
        });
        this.closeOther();
    };
    /**
     * 关闭
     */
    close = () => {
        const { onClose } = this.props;
        if (onClose && onClose() === false) {
            return;
        }
        this.setState({
            open: false
        });
    };
    /**
     * 关闭其它
     */
    closeOther() {
        for (var k in instances) {
            if (k == this.id) {
                continue;
            }
            instances[k].close();
        }
    }
    componentDidMount() {
        this.close();
        if (this.props.open === true) {
            this.open();
        }
        if (!("open" in this.props)) {
            document.addEventListener("click", this.close);
        }
        window.addEventListener("resize", this.setPosition);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.position) {
            this.setPosition(nextProps.position);
        }
        if ("open" in nextProps) {
            if (nextProps.open) {
                this.open();
            } else {
                this.close();
            }
        }
    }
    componentWillUnmount() {
        if (!("open" in this.props)) {
            document.removeEventListener("click", this.close);
        }
        window.removeEventListener("resize", this.setPosition);
        delete instances[this.id];
    }
    renderWrapper() {
        const { children, style, timeout, transitionName } = this.props;
        const { open, position } = this.state;
        return ReactDOM.createPortal(
            <TransitionGroup component={React.Fragment}>
                {open ? (
                    <CSSTransition
                        timeout={timeout}
                        classNames={transitionName}
                    >
                        <div
                            ref="panel"
                            className={prefixCls}
                            style={{ ...style, ...position }}
                            onClick={this.handlePanelClick}
                        >
                            {children}
                        </div>
                    </CSSTransition>
                ) : null}
            </TransitionGroup>,
            document.body
        );
    }
    render() {
        const { input } = this.props;
        return (
            <React.Fragment>
                <div ref="trigger" onClick={this.handleClick}>
                    {input}
                </div>
                {this.renderWrapper()}
            </React.Fragment>
        );
    }
}

export default PopPanel;
