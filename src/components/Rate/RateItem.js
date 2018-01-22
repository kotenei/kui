import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class RateItem extends Component {
    static propTypes = {
        value: PropTypes.number,
        current: PropTypes.number,
        character: PropTypes.string,
        onClick: PropTypes.func,
        onHover: PropTypes.func
    };
    static defaultProps = {
        value: -1,
        current: -1
    };
    handleTrigger = (value, trigger) => {
        const { allowHalf, onHover, onClick } = this.props;
        if (trigger == "hover") {
            if (onHover) {
                onHover(value);
            }
        } else {
            if (onClick) {
                onClick(value);
            }
        }
    };
    render() {
        const { prefixCls, value, current, character, allowHalf } = this.props;
        let classString = classnames({
            [`${prefixCls}-star`]: true,
            [`${prefixCls}-star-half`]: current == value - 0.5 && allowHalf,
            [`${prefixCls}-star-full`]:
                current >= value && value.toString().indexOf(".") == -1
        });
        return (
            <li className={classString}>
                <div
                    className={`${prefixCls}-star-first`}
                    onMouseOver={this.handleTrigger.bind(this, allowHalf ? value - 0.5 : value, "hover")}
                    onClick={this.handleTrigger.bind(this, allowHalf ? value - 0.5 : value)}
                >
                    {character}
                </div>
                <div
                    className={`${prefixCls}-star-second`}
                    onMouseOver={this.handleTrigger.bind(this, value, "hover")}
                    onClick={this.handleTrigger.bind(this, value)}
                >
                    {character}
                </div>
            </li>
        );
    }
}

export default RateItem;
