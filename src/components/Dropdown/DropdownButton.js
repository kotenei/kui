import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import Button from '../Button';
import Icon from '../Icon';

const ButtonGroup = Button.Group;

class DropdownButton extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    }
    static defaultProps = {
        disabled: false
    }
    handleClick = (e) => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(e);
        }
    }
    render() {
        const { children, menu, placement, disabled } = this.props;

        return (
            <Dropdown menu={menu} component={ButtonGroup} placement={placement} disabled={disabled}>
                <Button raised disabled={disabled} onClick={this.handleClick}>{children}</Button>
                <Button raised trigger="dropdown" className="last-btn" ><Icon type="down" /></Button>
            </Dropdown>
        )
    }
}

export default DropdownButton;


