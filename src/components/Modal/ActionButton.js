import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';


class ActionButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.timeout;
    }
    static propTypes = {
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        closeModal: PropTypes.func
    }
    static defaultProps = {
        closeModal: () => { }
    }
    handleClick = (e) => {
        const { onClick, closeModal } = this.props;
        if (onClick) {
            let ret = onClick();
            if (ret != false) {
                closeModal();
            }
        } else {
            closeModal();
        }
    }
    render() {
        const { children, kStyle, kSize } = this.props;
        return (
            <Button raised kStyle={kStyle} kSize={kSize} onClick={this.handleClick}>
                {children}
            </Button>
        )
    }
}

export default ActionButton;