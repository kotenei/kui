import React, { Component } from "react";
import PropTypes from "prop-types";

const prefixCls = "k-calendar";

class Calendar extends Component {
    static propTypes = {
        start:PropTypes.string
    };
    static defaultProps = {};
    render() {
        return <div className={prefixCls} />;
    }
}

export default Calendar;
