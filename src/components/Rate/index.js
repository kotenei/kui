import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RateItem from './RateItem';

const prefixCls = 'k-rate';

class Rate extends Component {
    constructor(props) {
        super(props);
        let value = props.defaultValue;
        if ('value' in props) {
            value = props.value;
        }
        this.state = {
            value
        }
    }
    static propType = {
        allowHalf: PropTypes.bool,
        count: PropTypes.number,
        defaultValue: PropTypes.number,
        value: PropTypes.number
    }
    static defaultProps = {
        allowHalf: false,
        count: 5,
        defaultValue: 0
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            })
        }
    }
    renderStars() {
        const { count } = this.props;
        const { value } = this.state;
        let items = [];
        for (let i = 0; i < count; i++) {
            items.push(
                <RateItem current={value} prefixCls={prefixCls} />
            );
        }
        return items;
    }
    render() {
        return (
            <ul className={prefixCls}>
                {this.renderStars()}
            </ul>
        )
    }
}

export default Rate;