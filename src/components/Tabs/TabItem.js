import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabItem extends Component {
    static propTypes = {
        index: PropTypes.number,
        isActive: PropTypes.bool,
        disabled: PropTypes.bool
    }
    handleClick = (e) => {
        const { onClick, index, disabled } = this.props;
        if(disabled){return;}
        if (onClick) {
            onClick(e, index);
        }
    }
    render() {
        const { children, isActive, disabled } = this.props;
        return (
            <li
                className={classnames({
                    'tab-item': true,
                    'active': isActive,
                    'disabled': disabled
                })}
                onClick={this.handleClick}>
                {children}
            </li>
        )
    }
}

export default TabItem;