import React, { Component } from "react";
import PropTypes from "prop-types";

class YearView extends Component {
    static propsTypes = {
        date: PropTypes.object
    };
    static defaultProps = {
        date: new Date()
    };
    render() {
        return null;
    }
}

export default YearView;
