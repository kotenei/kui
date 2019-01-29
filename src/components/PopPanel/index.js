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
            open: true,
            position: props.position || {
                left: -999,
                top: -999
            }
        };
        this.orgSize = {
            width: 0,
            height: 0
        };
        this.id = `poppanel_${seed++}`;
        instances[this.id] = this;
    }
    static propTypes = {
        fullWidth: PropTypes.bool,
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
        fullWidth: false,
        placement: "bottomLeft",
        timeout: 300,
        transitionName: "slide-down",
        trigger: "click"
    };
    handlePanelClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };
    /**
     * 定位
     */
    setPosition = position => {
        const { placement, fullWidth } = this.props;
        let width;
        if (fullWidth) {
            width = domUtils.outerWidth(
                ReactDOM.findDOMNode(this.refs.trigger)
            );
            this.orgSize.width = width;
        }
        position =
            position ||
            this.props.position ||
            getPosition({
                trigger: this.refs.trigger,
                placement: placement,
                ...this.orgSize
            });

        if (fullWidth) {
            position.width = width;
        }

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
        this.orgSize = {
            width: domUtils.width(this.refs.panel),
            height: domUtils.height(this.refs.panel)
        };
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
                {open && children ? (
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
                {React.cloneElement(input, {
                    ref: "trigger",
                    ...input.props
                })}
                {this.renderWrapper()}
            </React.Fragment>
        );
    }
}

export default PopPanel;
