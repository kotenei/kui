import React, { Component } from "react";
import PropTypes from "prop-types";
import ProgressLine from "./ProgressLine";
import ProgressCircle from "./ProgressCircle";
import classnames from "classnames";
import { kStyles, kClass, getClassSet } from "../../utils/kUtils";
import { State, DEFAULT, PRIMARY } from "../../utils/styleMaps";

class Progress extends Component {
    static propTypes = {
        color: PropTypes.string,
        percent: PropTypes.number,
        type: PropTypes.oneOf(["line", "circle"]),
        status: PropTypes.oneOf(["success", "error"]),
        strokeWidth: PropTypes.number,
        textInside: PropTypes.bool,
        showText: PropTypes.bool,
        width: PropTypes.number,
        indeterminate: PropTypes.bool
    };
    static defaultProps = {
        percent: 0,
        type: "line",
        strokeWidth: 6,
        textInside: false,
        showText: true,
        width: 100,
        indeterminate:false
    };
    renderContainer(prefixCls) {
        const { type } = this.props;
        switch (type) {
            case "line":
                return <ProgressLine {...this.props} prefixCls={prefixCls} />;
            case "circle":
                return <ProgressCircle {...this.props} prefixCls={prefixCls} />;
            default:
                return null;
        }
    }
    render() {
        const { type, textInside } = this.props;
        let prefixCls = "k-progress";
        let classString = getClassSet(this.props);
        classString = classnames(classString, {
            [`${prefixCls}-line`]: type == "line",
            [`${prefixCls}-text-inside`]: textInside,
            [`${prefixCls}-circle`]: type == "circle"
        });

        return (
            <div className={classString}>{this.renderContainer(prefixCls)}</div>
        );
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(styles, PRIMARY, kClass("k-progress", Progress));
