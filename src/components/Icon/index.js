import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


class Icon extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    static propTypes = {
        type: PropTypes.string,
        className: PropTypes.string,
        spin: PropTypes.bool,
        onClick: PropTypes.func,
        fontSize: PropTypes.number
    }
    static defaultProps = {
        spin: false,
        onClick: () => { }
    }
    handleClick() {
        const { onClick } = this.props;
        onClick();
    }
    render() {
        const { type, className = '', spin,fontSize } = this.props;
        const classes = classnames(className, {
            'k-icon': true,
            'icon': true,
            'anticon': true,
            'k-spin': !!spin || type == 'loading',
            [`icon-${type}`]: true
        });
        return (
            <i className={classes} onClick={this.handleClick} style={{fontSize}}/>
        )
    }
}

export default Icon;