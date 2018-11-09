import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Loading extends Component {
    static propTypes = {
        show: PropTypes.bool,
        tip: PropTypes.string
    }
    static defaultProps = {
        show: false
    }
    render() {
        const { children, tip, show } = this.props;
        const prefixCls = 'k-loading';
        let classString = classnames({
            [prefixCls]: true,
            'in': show
        });
        return (
            <div className={classString} >
                <div key="container">
                    {children}
                </div>
                <div className={`${prefixCls}-container`}>
                    <span style={{ position: 'relative' }}>
                        <Icon type="loading" />
                    </span>
                    <div className={`${prefixCls}-text`}>
                        {tip}
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading;