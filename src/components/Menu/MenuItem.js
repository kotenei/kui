import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class MenuItem extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        id: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func
    }
    static defaultProps = {
        selected: false,
        disabled: false
    }
    handleClick = (e) => {
        const { onClick, id } = this.props;
        if (onClick) {
            onClick(e, id)
        }
    }
    render() {
        const { prefixCls, selected, selectable, disabled, children, inlineIndent, activeId } = this.props;
        console.log(activeId)
        let classString = classnames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-selected`]: selected && selectable,
            [`${prefixCls}-item-disabled`]: disabled
        });
        return (
            <li className={classString} style={{ paddingLeft: inlineIndent }} onClick={this.handleClick}>
                {children}
            </li>
        )
    }
}

export default MenuItem;