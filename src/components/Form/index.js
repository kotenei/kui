import React, { Component } from "react";
import PropTypes from "prop-types";

const prefixCls = "k-form";

class Form extends Component {
    static propTypes = {
        start:PropTypes.string
    };
    static defaultProps = {};
    render() {
        return <div className={prefixCls} />;
    }
}

export default Form;
