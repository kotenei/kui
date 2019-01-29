import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-list-item-meta";

class ListItemMeta extends Component {
    static displayName = "ListItemMeta";
    static propTypes = {
        avatar: PropTypes.node,
        description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    };
    render() {
        const { avatar, description, title, className,...others } = this.props;
        const classString = classnames(
            {
                [prefixCls]: true
            },
            className
        );
        return (
            <div className={classString} {...others}>
                <div className={`${prefixCls}__avatar`}>{avatar}</div>
                <div className={`${prefixCls}__content`}>
                    <div className={`${prefixCls}__title`}>{title}</div>
                    <div className={`${prefixCls}__description`}>
                        {description}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListItemMeta;
