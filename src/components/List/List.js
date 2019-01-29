import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ListItem from "./List.Item";
import { kSize, getClassSet, kClass } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";

const prefixCls = "k-list";

class List extends Component {
    static propTypes = {
        bordered: PropTypes.bool,
        data: PropTypes.array,
        footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        renderItem: PropTypes.func,
        split: PropTypes.bool
    };
    static defaultProps = {
        renderItem: (item, index) => item,
        split: true
    };
    renderHeader() {
        const { header } = this.props;
        if (header) {
            return <li className={`${prefixCls}-header`}>{header}</li>;
        }
        return null;
    }
    renderFooter() {
        const { footer } = this.props;
        if (footer) {
            return <li className={`${prefixCls}-footer`}>{footer}</li>;
        }
        return null;
    }
    renderItems() {
        const { data, children, renderItem } = this.props;
        if (data && data.length > 0) {
            let items = [];
            data.forEach((item, index) => {
                items.push(
                    <ListItem key={index}>{renderItem(item, index)}</ListItem>
                );
            });
            return items;
        } else {
            return React.Children.map(children, (child, index) => {
                if (
                    (child &&
                        child.type &&
                        child.type.displayName == "ListItem") ||
                    child.type.displayName == "ListItemMeta"
                ) {
                    return child;
                }
                return null;
            });
        }
    }
    render() {
        const { className, bordered, split, style } = this.props;
        let classString = getClassSet(this.props);
        classString = classnames(
            classString,
            {
                [`${prefixCls}-bordered`]: bordered,
                [`${prefixCls}-split`]: split
            },
            className
        );
        return (
            <ul className={classString} style={style}>
                {this.renderHeader()}
                {this.renderItems()}
                {this.renderFooter()}
            </ul>
        );
    }
}

export default kSize([Sizes.LARGE, Sizes.SMALL], kClass(prefixCls, List));
