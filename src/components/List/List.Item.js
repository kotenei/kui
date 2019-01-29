import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-list-item";

class ListItem extends Component {
    static displayName = "ListItem";
    static propTypes = {
        actions: PropTypes.array
    };
    renderActions() {
        const { actions } = this.props;
        let items = [];
        if (actions && actions.length > 0) {
            actions.forEach((action, index) => {
                items.push(
                    <li className={`${prefixCls}-actions__item`} key={index}>
                        {action}
                    </li>
                );

                if (index + 1 != actions.length) {
                    items.push(
                        <li
                            className={classnames({
                                [`${prefixCls}-actions__item`]: true,
                                [`${prefixCls}-actions__separator`]: true
                            })}
                            key={`${index}-separator`}
                        >
                            <span>|</span>
                        </li>
                    );
                }
            });
        }
        return items;
    }
    render() {
        const { children, className, actions, ...others } = this.props;
        const classString = classnames(
            {
                [prefixCls]: true
            },
            className
        );
        return (
            <li className={classString} {...others}>
                <div className={`${prefixCls}-content`}>{children}</div>
                <ul className={`${prefixCls}-actions`}>
                    {this.renderActions()}
                </ul>
            </li>
        );
    }
}

export default ListItem;
