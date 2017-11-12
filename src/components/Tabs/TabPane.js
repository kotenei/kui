import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const prefixCls = 'k-tabs';

class TabPane extends Component {
    static propTypes = {
        tab: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        isActive: PropTypes.bool
    }
    render() {
        const { isActive, children } = this.props;
        let classString = classnames({
            [`${prefixCls}-panel`]: true,
            'active': isActive
        })
        return (
            <div className={classString}>
                {this.props.children}
            </div>
        )
    }
}

export default TabPane;