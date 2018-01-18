import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class RateItem extends Component {
    static propTypes = {
        value: PropTypes.number
    }
    static defaultProps = {

    }
    render() {
        const { prefixCls } = this.props;
        let classString = classnames({
            [`${prefixCls}-star`]: true
        })
        return (
            <li className={classString}>
                <div className={`${prefixCls}-first`}></div>
                <div className={`${prefixCls}-second`}></div>
            </li>
        )
    }
}

export default RateItem;