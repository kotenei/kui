import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class MenuItem extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        id: PropTypes.string,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
    }
    static defaultProps = {
        selected: false,
        disabled: false
    }
    render() {
        const { prefixCls, selected, selectable, disabled, children, inlineIndent } = this.props;
        let classString = classnames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-selected`]: selected && selectable,
            [`${prefixCls}-item-disabled`]: disabled
        });
        return (
            <li className={classString} style={{ paddingLeft: inlineIndent }}>
                {children}
            </li>
        )
    }
}

export default MenuItem;