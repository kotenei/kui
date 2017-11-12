import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabItem extends Component {
    static propTypes = {
        index: PropTypes.number,
        isActive: PropTypes.bool
    }
    handleClick = (e) => {
        const { onClick, index } = this.props;
        if (onClick) {
            onClick(e, index);
        }
    }
    render() {
        const { children, isActive } = this.props;
        return (
            <li
                className={classnames({
                    'tab-item': true,
                    'active': isActive
                })}
                onClick={this.handleClick}>
                {children}
            </li>
        )
    }
}

export default TabItem;