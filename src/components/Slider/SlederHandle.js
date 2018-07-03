import React, { Component } from "react";
import Tooltip from "../Tooltip";
import PropTypes from "prop-types";

class SliderHandler extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.node,
        vertical: PropTypes.bool,
        onDragStart: PropTypes.func,
        onChange: PropTypes.func,
        onDragStop: PropTypes.func
    };
    static defaultProps = {
        prefixCls: "k-slider"
    };
    render() {
        const { prefixCls, title } = this.props;
        console.log(title)
        return (
            <Tooltip title={title}>
                <div className={`${prefixCls}-handle`} />
            </Tooltip>
        );
    }
}

export default SliderHandler;
