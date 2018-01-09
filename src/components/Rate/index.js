import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const prefixCls='k-rate';

class Rate extends Component {
    static propType = {
        allowHalf: PropTypes.bool,
        count: PropTypes.number
    }
    static defaultProps = {
        allowHalf: false,
        count:5
    }
    render() {

        return (
            <div className={prefixCls}>
                
            </div>
        )
    }
}

export default Rate;