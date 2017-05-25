import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


class Icon extends Component {
    static propTypes = {
        type: PropTypes.string,
        className: PropTypes.string,
        spin: PropTypes.bool,
    }
    static defaultProps = {
        spin: false
    }
    render() {
        const { type, className = '', spin } = this.props;
        const classes = classnames({
            'k-icon':true,
            'icon': true,
            'anticon':true,
            'k-spin': !!spin || type == 'loading',
            [`icon-${type}`]: true
        });
        return (
            <i className={classes} />
        )
    }
}

export default Icon;