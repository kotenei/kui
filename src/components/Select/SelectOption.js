import React, { Component } from "react";
import PropTypes from "prop-types";

class SelectOption extends Component {
    static propTypes = {
        selected: PropTypes.bool,
        title: PropTypes.string,
        value: PropTypes.string,
        onClick: PropTypes.func
    };
    static defaultProps = {
        selected: false
    };
    handleClick = () => {
        const { onClick, value, title } = this.props;
        if (onClick) {
            onClick({
                title,
                value,
                content: this.props.children
            });
        }
    };
    render() {
        const { title } = this.props;
        return <li title={title}>{this.props.children}</li>;
    }
}

export default SelectOption;
