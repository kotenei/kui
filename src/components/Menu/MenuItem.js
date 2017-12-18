import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class MenuItem extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        id: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        onItemClick: PropTypes.func
    }
    static defaultProps = {
        disabled: false
    }
    handleClick = (e) => {
        const { onItemClick, id, parentIds } = this.props;
        if (onItemClick) {
            onItemClick(e, id, parentIds)
        }
    }
    render() {
        const { prefixCls, disabled, children, inlineIndent, selectedIds, id, rootId } = this.props;
        let isSelected = selectedIds.indexOf(id) != -1;
        let classString = classnames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-active`]: isSelected,
            [`${prefixCls}-item-disabled`]: disabled
        });
        return (
            <li
                className={classString}
                style={{ paddingLeft: inlineIndent }}
                onClick={this.handleClick}>
                {children}
            </li>
        )
    }
}

export default MenuItem;