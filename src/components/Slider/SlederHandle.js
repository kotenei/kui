import React, { Component } from "react";
import Tooltip from "../Tooltip";
import PropTypes from "prop-types";

class SliderHandler extends Component {
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
    render() {
        const { prefixCls, title, style } = this.props;
        return (
            <Tooltip title={title}>
                <div className={`${prefixCls}-handle`} style={style } />
            </Tooltip>
        );
    }
}

export default SliderHandler;
