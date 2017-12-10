import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'object.omit';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeId: 1
        }
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        inlineIndent: PropTypes.number,
        inlineCollapsed: PropTypes.bool,
        mode: PropTypes.oneOf['vertical', 'inline', 'horizontal'],
        selectable: PropTypes.bool,
        onClick: PropTypes.func,
        onOpen: PropTypes.func,
        onSelect: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'k-menu',
        inlineIndent: 24,
        inlineCollapsed: false,
        mode: 'vertical',
        selectable: true
    }
    handleItemClick = () => {
        console.log('ssssssssssss')
    }
    render() {
        const { className, mode, children, prefixCls, style } = this.props;
        const { activeId } = this.state;
        let classString = classnames(className, {
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-root`]: true,
        });
        let props = omit(this.props, ['children', 'style']);

        return (
            <ul className={classString} style={style}>
                {
                    React.Children.map(children, (child, i, subIndex) => {
                        let childProps = { ...props, activeId };
                        if (!child) {
                            return null;
                        }
                        if (child.type == MenuItem) {
                            childProps.onClick = this.handleItemClick
                        }
                        return React.cloneElement(child, { ...props, ...child.props });
                    })
                }
            </ul>
        )
    }
}

export default Menu;