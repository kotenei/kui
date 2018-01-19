import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "../Icon";
import RateItem from "./RateItem";

const prefixCls = "k-rate";

class Rate extends Component {
    constructor(props) {
        super(props);
        let value = props.defaultValue;
        if ("value" in props) {
            value = props.value;
        }
        this.state = {
            value,
            orgValue: value
        };
    }
    static propType = {
        allowHalf: PropTypes.bool,
        count: PropTypes.number,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        character: PropTypes.node,
        disabled: PropTypes.bool,
        onHoverChange: PropTypes.func,
        onChange: PropTypes.func
    };
    static defaultProps = {
        allowHalf: false,
        count: 5,
        character:<Icon type="star" />,
        defaultValue: 0,
        disabled: false
    };
    handleStarHover = value => {
        const { onHoverChange, disabled } = this.props;
        if (disabled) {
            return;
        }
        this.setState({
            value
        });
        if (onHoverChange) {
            onHoverChange(value);
        }
    };
    handleStarClick = value => {
        const { onChange, disabled } = this.props;
        if (disabled) {
            return;
        }
        if (!("value" in this.props)) {
            this.setState({
                value,
                orgValue: value
            });
        }
        if (onChange) {
            onChange(value);
        }
    };
    handleLeave = () => {
        this.setState({
            value: this.state.orgValue
        });
    };
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.setState({
                value: nextProps.value,
                orgValue: nextProps.value
            });
        }
    }
    renderStars() {
        const { count, character, allowHalf, disabled } = this.props;
        const { value } = this.state;
        let items = [];
        for (let i = 0; i < count; i++) {
            items.push(
                <RateItem
                    current={value}
                    value={i + 1}
                    prefixCls={prefixCls}
                    character={character}
                    allowHalf={allowHalf}
                    onHover={this.handleStarHover}
                    onClick={this.handleStarClick}
                />
            );
        }
        return items;
    }
    render() {
        const { disabled } = this.props;
        let classString = classnames({
            [`${prefixCls}`]: true,
            disabled: disabled
        });
        return (
            <ul
                className={classString}
                onMouseLeave={this.handleLeave}
                style={this.props.style}
            >
                {this.renderStars()}
            </ul>
        );
    }
}

export default Rate;
