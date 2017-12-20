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
            openIds: props.defaultOpenIds || [],
            selectedSubmenuIds: []
        }
        this.level = 1;
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        defaultOpenIds: PropTypes.array,
        defaultSelectedIds: PropTypes.array,
        inlineIndent: PropTypes.number,
        inlineCollapsed: PropTypes.bool,
        mode: PropTypes.oneOf['vertical', 'inline', 'horizontal', 'inlineCollapsed'],
        selectable: PropTypes.bool,
        multiple: PropTypes.bool,
        onClick: PropTypes.func,
        onOpen: PropTypes.func,
        onSelect: PropTypes.func,
        onMouseEnter: PropTypes.func
    }
    static defaultProps = {
        prefixCls: 'k-menu',
        inlineIndent: 24,
        inlineCollapsed: false,
        mode: 'inline',
        selectable: true,
        multiple: false
    }
    handleItemClick = (e, id, parentIds, action) => {
        const { onOpen, onItemClick, multiple, mode, selectable, onSelect } = this.props;
        const { selectedIds, openIds } = this.state;
        let newSelectedIds = [...selectedIds];
        let newOpenIds = [...openIds];
        let index = -1;
        if (!id || !selectable) {
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
            });
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
                selectedIds: newSelectedIds,
                selectedSubmenuIds: parentIds
            });
            if (onSelect) {
                onSelect(newSelectedIds)
            }
        }

    }
    handleItemTrigger = (e, id, parentIds, trigger) => {
        const { onOpen, multiple, mode, selectable, onSelect } = this.props;
        const { selectedIds, openIds } = this.state;
        let newSelectedIds = [...selectedIds];
        let newOpenIds = [...openIds];
        let index = -1;

        switch (trigger) {
            case 'click':
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
                if (selectable) {
                    this.setState({
                        selectedIds: newSelectedIds,
                        selectedSubmenuIds: parentIds
                    });
                }
                if (onSelect) {
                    onSelect(newSelectedIds)
                }
                break;
            case 'openChange':
                index = openIds.indexOf(id);
                if (index == -1) {
                    newOpenIds.push(id);
                } else {
                    newOpenIds.splice(index, 1);
                }
                this.setState({
                    openIds: newOpenIds
                });
                break;
            default:
                break;
        }
    }
    handleMouseEnter = (e) => {
        const { onMouseEnter } = this.props;
        if (onMouseEnter) {
            onMouseEnter(e);
        }
    }
    handleMouseLeave = (e) => {
        const { onMouseLeave } = this.props;
        if (onMouseLeave) {
            onMouseLeave(e);
        }
    }
    render() {
        const { className, mode, children, prefixCls, style } = this.props;
        const { selectedIds, openIds, selectedSubmenuIds } = this.state;
        let classString = classnames(className, {
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-root`]: true
        });
        let props = omit(this.props, ['children', 'style']);

        return (
            <ul className={classString}
                style={style}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {
                    React.Children.map(children, (child, i, subIndex) => {
                        if (!child) {
                            return null;
                        }
                        return React.cloneElement(child, {
                            ...props,
                            ...child.props,
                            level: this.level,
                            parentIds: [],
                            parentId: 0,
                            selectedSubmenuIds,
                            openIds,
                            selectedIds,
                            onItemTrigger: this.handleItemTrigger
                        });
                    })
                }
            </ul>
        )
    }
}

export default Menu;