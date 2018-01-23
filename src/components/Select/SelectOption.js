import React, { Component } from "react";
import PropTypes from "prop-types";
import omit from "object.omit";
import Menu from "../Menu";

const MenuItem = Menu.Item;

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
        const { title, value, index } = this.props;
        const menuProps = omit(this.props, [
            "children",
            "index",
            "selected",
            "value"
        ]);
        return (
            <MenuItem id={value} {...menuProps}>
                {this.props.children}
            </MenuItem>
        );
    }
}

export default SelectOption;
