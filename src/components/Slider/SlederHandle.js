import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
import domUtils from "../../utils/domUtils";
import { getMouseCoord } from "../../utils";

class SliderHandler extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.node,
        style: PropTypes.object,
        vertical: PropTypes.bool,
        value: PropTypes.number.isRequired,
        showTooltip: PropTypes.bool,
        onDragStart: PropTypes.func,
        onChange: PropTypes.func,
        onDragStop: PropTypes.func
    };
    static defaultProps = {
        prefixCls: "k-slider",
        value: 0
    };
    handleMouseDown = e => {
        e.stopPropagation();
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.start(e);
        //禁止文档选择事件
        document.onselectstart = function() {
            return false;
        };
        return false;
    };
    handleMouseMove = e => {
        this.move(e);
        return false;
    };
    handleMouseUp = e => {
        this.stop(e);
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
        return false;
    };
    handleMouseEnter = () => {
        const { onMouseEnter, value } = this.props;
        if (onMouseEnter) {
            onMouseEnter(value);
        }
    };
    handleMouseLeave = () => {
        const { onMouseLeave, value } = this.props;
        if (onMouseLeave) {
            onMouseLeave(value);
        }
    };
    start(e) {
        const { target } = e;
        const { onDragStart } = this.props;
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);

        if (target.setCapture) {
            target.setCapture();
        }
        if (onDragStart) {
            onDragStart(e);
        }
    }
    move(e) {
        const { onChange } = this.props;
        if (onChange) {
            onChange(e);
        }
    }
    stop(e) {
        const { onDragStop } = this.props;
        if (onDragStop) {
            onDragStop(e);
        }
    }
    render() {
        const { prefixCls, title, style, disabled, showTooltip } = this.props;
        return (
            <Tooltip
                title={title}
                ref="tooltip"
                show={showTooltip}
                style={{ zIndex: showTooltip ? 2 : 1 }}
            >
                <div
                    className={`${prefixCls}-handle`}
                    style={{ ...style, zIndex: showTooltip ? 2 : 1 }}
                    onMouseDown={disabled ? null : this.handleMouseDown}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
            </Tooltip>
        );
    }
}

export default SliderHandler;
