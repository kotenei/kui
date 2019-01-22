import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class TabItem extends Component {
    static propTypes = {
        index: PropTypes.number,
        isActive: PropTypes.bool,
        disabled: PropTypes.bool,
        editable: PropTypes.bool
    }
    handleClick = (e) => {
        const { onClick, index, disabled } = this.props;
        if (disabled) { return; }
        if (onClick) {
            onClick(e, index);
        }
    }
    handleClose = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        const { index, disabled, onClose } = this.props;
        if (disabled) { return; }
        if (onClose) {
            onClose(e, index);
        }
    }
    render() {
        const { children, isActive, disabled, editable } = this.props;
        return (
            <li
                className={classnames({
                    'tab-item': true,
                    'active': isActive,
                    'disabled': disabled
                })}
                onClick={this.handleClick}>
                {children}
                {!disabled && editable ? <Icon type="close" className="icon-close" onClick={this.handleClose} /> : null}
            </li>
        )
    }
}

export default TabItem;