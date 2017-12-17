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
            selectedIds: props.defaultSelectedIds || [],
            openIds: props.defaultOpenIds || []
        }
        this.level = 1;
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        defaultOpenIds: PropTypes.array,
        defaultSelectedIds: PropTypes.array,
        inlineIndent: PropTypes.number,
        inlineCollapsed: PropTypes.bool,
        mode: PropTypes.oneOf['vertical', 'inline', 'horizontal'],
        selectable: PropTypes.bool,
        multiple: PropTypes.bool,
        onClick: PropTypes.func,
        onOpen: PropTypes.func,
        onSelect: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'k-menu',
        inlineIndent: 24,
        inlineCollapsed: false,
        mode: 'inline',
        selectable: true,
        multiple: false
    }
    handleItemClick = (e, id, action) => {
        const { onOpen, onItemClick, multiple } = this.props;
        const { selectedIds, openIds } = this.state;
        let newSelectedIds = [...selectedIds];
        let newOpenIds = [...openIds];
        let index = -1;
        if (!id) {
            return;
        }
        if (action == 'openChange') {
            index = openIds.indexOf(id);
            if (index == -1) {
                newOpenIds.push(id);
            } else {
                newOpenIds.splice(index, 1);
            }
            this.setState({
                openIds: newOpenIds
            })
        } else {
            if (multiple) {
                index = selectedIds.indexOf(id);
                if (index == -1) {
                    newSelectedIds.push(id);
                } else {
                    newSelectedIds.splice(index, 1);
                }
            } else {
                newSelectedIds = [id];
            }
            this.setState({
                selectedIds: newSelectedIds
            })
        }
    }
    componentWillMount() {

    }
    render() {
        const { className, mode, children, prefixCls, style } = this.props;
        const { selectedIds, openIds } = this.state;
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
                        if (!child) {
                            return null;
                        }
                        if (child.type == MenuItem) {
                            props.onItemClick = this.handleItemClick
                        }
                        props.selectedIds = selectedIds;
                        props.openIds = openIds;
                        return React.cloneElement(child, {
                            ...props,
                            ...child.props,
                            level: this.level,
                            rootId: child.props.id,
                            parentId: 0
                        });
                    })
                }
            </ul>
        )
    }
}

export default Menu;