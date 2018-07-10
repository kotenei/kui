import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
import domUtils from "../../utils/domUtils";

class SliderHandler extends Component {
    constructor(props) {
        super(props);
        //鼠标相对拖动层偏移值
        this.offset = { x: 0, y: 0 };
        //原坐标
        this.originalCoord = { x: 0, y: 0 };
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.node,
        style: PropTypes.object,
        vertical: PropTypes.bool,
        onDragStart: PropTypes.func,
        onChange: PropTypes.func,
        onDragStop: PropTypes.func
    };
    static defaultProps = {
        prefixCls: "k-slider"
    };
    handleMouseDown = e => {
        const { target } = e;
        e.stopPropagation();
        e.preventDefault();
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
    start(e) {
        const { onDragStart } = this.props;
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
        this.setElmInfo();
        //获取鼠标位置
        let mouseCoord = this.getMouseCoord(e);
        //记录鼠标在拖动层的坐标位置
        this.offset.x = mouseCoord.x - this.elmInfo.left;
        this.offset.y = mouseCoord.y - this.elmInfo.top;
        //记录鼠标点击后的坐标
        this.originalCoord.x = mouseCoord.x;
        this.originalCoord.y = mouseCoord.y;
        this.moveCoord = { x: 0, y: 0 };
        this.offset.click = {
            left: mouseCoord.x - this.elmInfo.left,
            top: mouseCoord.y - this.elmInfo.top
        };
        //捕捉鼠标的作用范围，防止鼠标移动过快丢失
        if (this.elm.setCapture) {
            this.elm.setCapture();
        }

        if (onDragStart) {
            onDragStart(e);
        }
    }
    move(e) {
        const { onChange } = this.props;
        let mouseCoord = this.getMouseCoord(e);
        let moveCoord = {
            x: mouseCoord.x - this.offset.x,
            y: mouseCoord.y - this.offset.y
        };
        let coordinate={
            orgCoord:this.originalCoord,
            curCoord:mouseCoord,
            moveCoord
        }
        if (onChange) {
            onChange(e, coordinate, this.elmInfo);
        }
    }
    stop(e) {
        const { onDragStop } = this.props;
        if (onDragStop) {
            onDragStop(e);
        }
    }
    getMouseCoord(e) {
        return {
            x:
                e.pageX ||
                e.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:
                e.pageY ||
                e.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
    setElmInfo() {
        if (!this.elm) {
            this.elm = ReactDOM.findDOMNode(this.refs.handle);
            this.elm = this.elm.querySelector("div");
        }
        let position = domUtils.position(this.elm);
        let offset = domUtils.offset(this.elm);
        this.elmInfo = {
            left: parseInt(position.left),
            top: parseInt(position.top),
            offsetLeft: offset.left,
            offsetTop: offset.top,
            ew: domUtils.outerWidth(this.elm),
            eh: domUtils.outerHeight(this.elm)
        };
    }
    componentDidMount() {
        this.setElmInfo();
    }
    render() {
        const { prefixCls, title, style, disabled } = this.props;
        return (
            <Tooltip title={title} ref="handle">
                <div
                    className={`${prefixCls}-handle`}
                    style={style}
                    //onMouseDown={disabled ? null : this.handleMouseDown}
                />
            </Tooltip>
        );
    }
}

export default SliderHandler;
