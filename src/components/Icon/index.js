import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { kStyles, kClass, getClassSet } from '../../utils/kUtils';
import { State, PRIMARY, Sizes } from '../../utils/styleMaps';

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
    handleClick(e) {
        const { onClick } = this.props;
        onClick(e);
    }
    render() {
        const { type, className = '', spin, fontSize } = this.props;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, className, {
            'icon': true,
            'anticon': true,
            'k-spin': !!spin || type == 'loading',
            [`icon-${type}`]: true
        });
        return (
            <i className={classString} onClick={this.handleClick} style={{ fontSize }} />
        )
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(styles,
    kClass('k-icon',Icon)
);