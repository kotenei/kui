import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Step extends Component {
    static propTypes = {
        index: PropTypes.number,
        current: PropTypes.number,
        icon: PropTypes.node,
        title: PropTypes.node,
        description: PropTypes.node,
        status: PropTypes.oneOf(['wait', 'process', 'finish', 'error'])
    }
    renderIcon() {
        const { icon, status, index } = this.props;
        if (icon) {
            if (typeof icon == 'string') {
                return <Icon type={icon} />
            }
            return icon;
        }
        if (status == 'finish') {
            return <Icon type="check" />;
        }
        if (status == 'error') {
            return <Icon type="close" />;
        }
        return index + 1;
    }
    render() {
        const { title, icon, description, status, prefixCls, index, current, isNextError } = this.props;
        let prefix = `${prefixCls}-item`;
        let classString = classnames({
            [`${prefix}`]: true,
            [`${prefix}-${status}`]: true,
            [`${prefix}-next-error`]: isNextError
        });
        return (
            <div className={classString}>
                <div className={`${prefix}-tail`}></div>
                <div className={classnames({
                    [`${prefix}-icon`]: true,
                    'custom-icon': icon != null
                })
                }>
                    <span className={`${prefixCls}-icon`}>
                        {this.renderIcon()}
                    </span>
                </div>
                <div className={`${prefix}-content`}>
                    <div className={`${prefix}-title`}>
                        {title}
                    </div>
                    <div className={`${prefix}-description`}>
                        {description}
                    </div>
                </div>
            </div>
        )
    }
}

export default Step;