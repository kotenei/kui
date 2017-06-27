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
        bordered: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    static defaultProps = {
        bordered: true,
        width: 300
    }
    render() {
        const { title, extra, bodyStyle, bordered, width, children } = this.props;
        let prefixCls = 'k-card';
        let cardClassString = classnames({
            [prefixCls]: true,
            [`${prefixCls}-bordered`]: bordered
        });

        return (
            <div className={cardClassString} style={{ width }}>

                {
                    title ? <div className={`${prefixCls}-head`}>
                        <h3 className={`${prefixCls}-head-title`}>{title}</h3>
                    </div> : null
                }

                {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
                <div className={`${prefixCls}-body`} style={bodyStyle}>{children}</div>
            </div>
        )
    }
}

export default Card;