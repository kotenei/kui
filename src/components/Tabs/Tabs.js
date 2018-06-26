import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import omit from "object.omit";
import TabNav from "./TabNav";
import TabContent from "./TabContent";

const prefixCls = "k-tabs";

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.activeIndex || props.defaultActiveIndex || 0
        };
    }
    static propTypes = {
        activeIndex: PropTypes.number,
        defaultActiveIndex: PropTypes.number,
        extraContent: PropTypes.node,
        tabPosition: PropTypes.oneOf(["top", "left", "right", "bottom"]),
        type: PropTypes.oneOf(["line", "card"]),
        editable: PropTypes.bool,
        hideAdd: PropTypes.bool,
        onTabClick: PropTypes.func,
        onPrevClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onEdit: PropTypes.func
    };
    static defaultProps = {
        defaultActiveIndex: 0,
        tabPosition: "top",
        type: "line",
        editable: false,
        hideAdd: false
    };
    handleEdit = (e, action, index) => {
        const { onEdit } = this.props;
        if (onEdit) {
            onEdit(e, action, index);
        }
    };
    handleTabClick = (e, index) => {
        const { onTabClick } = this.props;
        if (!("activeIndex" in this.props)) {
            this.setState({
                activeIndex: index
            });
        }
        if (onTabClick) {
            onTabClick(e, index);
        }
    };
    handlePrevClick = () => {};
    handleNextClick = () => {};
    componentWillMount() {
        const { activeIndex } = this.state;
        const { children } = this.props;
        let hasMatch = false;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const { disabled } = child.props;
            if (disabled && i == activeIndex) {
                hasMatch = true;
                break;
            }
        }
        if (hasMatch) {
            this.setState({
                activeIndex: 0
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if ("activeIndex" in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex
            });
        }
    }
    renderTabNav(key) {
        const { children } = this.props;
        const { activeIndex } = this.state;
        if (!children) {
            return null;
        }
        let props = omit(this.props, ["children"]);
        return (
            <TabNav
                key={key}
                prefixCls={prefixCls}
                panels={children}
                {...props}
                activeIndex={activeIndex}
                onEdit={this.handleEdit}
                onTabClick={this.handleTabClick}
                onPrevClick={this.handlePrevClick}
                onNextClick={this.handleNextClick}
            />
        );
    }
    renderTabContent(key) {
        const { children, tabPosition } = this.props;
        const { activeIndex } = this.state;
        if (!children) {
            return null;
        }
        let props = omit(this.props, ["children"]);
        return (
            <TabContent
                key={key}
                prefixCls={prefixCls}
                panels={children}
                {...props}
                activeIndex={activeIndex}
            />
        );
    }
    renderContent() {
        const { tabPosition } = this.props;
        let items = [];
        let key = -1;
        if (tabPosition == "bottom") {
            items.push(this.renderTabContent(key++));
            items.push(this.renderTabNav(key++));
        } else {
            items.push(this.renderTabNav(key++));
            items.push(this.renderTabContent(key++));
        }
        return items;
    }
    render() {
        const { tabPosition, className, type, style } = this.props;
        let classString = classnames(className, {
            [prefixCls]: true,
            [`${prefixCls}-line`]: type == "line",
            [`${prefixCls}-card`]: type == "card",
            [`${prefixCls}-${tabPosition}`]: true,
            [`${prefixCls}-vertical`]:
                tabPosition == "left" || tabPosition == "right"
        });
        return (
            <div className={classString} style={style}>
                {this.renderContent()}
            </div>
        );
    }
}

export default Tabs;
