import React, { Component } from "react";
import PropTypes from "prop-types";
import domUtils from "../../utils/domUtils";

class PopPanel extends Component {
    static propTypes = {
        show: PropTypes.bool
    };
    static defaultProps = {
        show: false
    };
    render() {
        const { className, children } = this.props;
        return <div className={className}>{children}</div>;
    }
}

export default PopPanel;
