import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    static propTypes = {
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        onPressEnter: PropTypes.func
    }
    static defaultProps = {

    }
    handleKeyDown(e) {
        const { onPressEnter, onKeyDown } = this.props;
        if (e.keyCode == 13 && onPressEnter) {
            onPressEnter(e);
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    }
    render() {
        const { props } = this;
        let classString = classnames('k-form-control', props.className);
        let style = {
            height: 100,
            ...props.style
        }
        return (
            <textarea
                {...props}
                style={style}
                className={classString}
                onKeyDown={this.handleKeyDown} />
        )
    }
}

export default TextArea;