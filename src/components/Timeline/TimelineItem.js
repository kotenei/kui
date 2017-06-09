import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TimelineItem extends Component {
    static propTypes = {
        dot: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        color: PropTypes.oneOf(['blue', 'green', 'red'])
    }
    static defaultProps = {
        color: 'blue'
    }
    render() {
        const { children,color } = this.props;
        let prefix = 'k-timeline';
        let dotClassName = classnames({
            [`${prefix}-item-head`]: true,
            [`${prefix}-item-head-${color}`]: true
        });
        return (
            <li className={`${prefix}-item`}>
                <div className={`${prefix}-item-tail`}></div>
                <div className={dotClassName}></div>
                <div className={`${prefix}-item-content`}>
                    {children}
                </div>
            </li>
        )
    }
}

export default TimelineItem;