import React, { Component } from "react";
import PropTypes from "prop-types";
import omit from "object.omit";

class PaginationItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    static propTypes = {
        num: PropTypes.number.isRequired,
        onClick: PropTypes.func
    };
    static defaultProps = {
        onClick: () => {}
    };
    handleClick() {
        const { num, onClick } = this.props;
        onClick(num);
    }
    render() {
        const { className, children, onMouseOver, onMouseLeave } = this.props;

        return (
            <li className={className}>
                <a
                    href="javascript:void(0);"
                    onClick={this.handleClick}
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                >
                    {children}
                </a>
            </li>
        );
    }
}

export default PaginationItem;
