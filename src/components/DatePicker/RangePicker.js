import React, { Component } from "react";
import PropTypes from "prop-types";

class RangePicker extends Component {
    static propTypes = {
        defaultValue: PropTypes.array,
        separator: PropTypes.string,
        value: PropTypes.array
    };
    static defaultProps = {
        separator: "-"
    };
    render() {
        return null;
    }
}

export default RangePicker;
