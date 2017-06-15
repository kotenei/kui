import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Card extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        bodyStyle: PropTypes.object,
        bordered: PropTypes.bool
    }
    static defaultProps = {
        bordered: false
    }
    render() {
        const { title, extra, bodyStyle, bordered } = this.props;
        let prefixCls = 'k-card';
        let cardClassString = classnames({
            [prefixCls]: true
        });

        return (
            <div className={cardClassString}>
                <div className={`${prefixCls}-head`}>
                    <h3 className={`${prefixCls}-head-title`}>{title}</h3>
                </div>
                <div className={`${prefixCls}-body`}></div>
            </div>
        )
    }
}

export default Card;