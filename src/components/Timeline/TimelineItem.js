import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TimelineItem extends Component {
    static propTypes = {
        dot: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
    }
    static defaultProps = {
        color: 'primary'
    }
    render() {
        const { children, color, dot } = this.props;
        let prefix = 'k-timeline';
        let dotClassName = classnames({
            [`${prefix}-item-head`]: true,
            [`${prefix}-item-head-${color}`]: true,
            [`${prefix}-item-head-custom`]: dot
        });
        return (
            <li className={`${prefix}-item`}>
                <div className={`${prefix}-item-tail`}></div>
                <div className={dotClassName}>
                    {dot}
                </div>
                <div className={`${prefix}-item-content`}>
                    {children}
                </div>
            </li>
        )
    }
}

export default TimelineItem;