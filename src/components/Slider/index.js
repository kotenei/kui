import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-slider";

class Slider extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
        marks: PropTypes.object,
        range: PropTypes.bool,
        step: PropTypes.number,
        vertical: PropTypes.bool,
        value: PropTypes.oneOfType[(PropTypes.number, PropTypes.array)],
        defaultValue: PropTypes.oneOfType[(PropTypes.number, PropTypes.array)],
        tipFormatter: PropTypes.func,
        onChange: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        min: 0,
        max: 100,
        range: false,
        step: 1,
        vertical: false
    };
    renderMarks() {
        const { marks, range } = this.props;
        let items = [];
        if (!range || !marks) {
            return null;
        }
        for (var k in marks) {
            items.push(<span className={`${prefixCls}-dot`} />);
        }
        return items;
    }
    render() {
        return (
            <div className={prefixCls}>
                <div className={`${prefixCls}-step`}>{this.renderMarks()}</div>
            </div>
        );
    }
}

export default Slider;
