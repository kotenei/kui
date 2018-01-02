import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            <div>

            </div>
        )
    }
}

export default Rate;