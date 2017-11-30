import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabItem from './TabItem';
import domUtils from '../../utils/domUtils';
import Icon from '../Icon';

class TabNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.activeIndex || props.defaultActiveIndex || 0,
            scrollLeft: 0,
            inkWidth: 0,
            inkLeft: 0,
            scrolling: false
        }
    }
    handleTabClick = (e, index) => {
        const { onTabClick } = this.props;
        this.setActiveIndex(index);
        if (onTabClick) {
            onTabClick(e, index);
        }
    }
    handleTabAdd = (e) => {
        const { onEdit } = this.props;
        if (onEdit) {
            onEdit(e, 'add');
        }
    }
    handleTabRemove = (e, index) => {
        const { onEdit } = this.props;
        if (onEdit) {
            onEdit(e, 'remove', index);
        }
    }
    handlePrevClick = (e) => {
        let { scrollLeft } = this.state;
        scrollLeft -= this.tabsInfo.navWidth;
        if (scrollLeft <= 0) {
            scrollLeft = 0
        }
        this.setState({
            scrollLeft
        });
    }
    handleNextClick = (e) => {
        let { scrollLeft } = this.state;
        let maxLeft = 0;
        scrollLeft += this.tabsInfo.navWidth;
        maxLeft = this.tabsInfo.totalWidth - this.tabsInfo.navWidth;
        if (scrollLeft >= maxLeft) {
            scrollLeft = maxLeft;
        }
        this.setState({
            scrollLeft
        })
    }
    setTabsInfo() {
        const { prefixCls } = this.props;
        const { activeIndex } = this.state;
        this.tabsInfo = {
            arrWidth: [],
            arrLeft: [],
            maxLeft: 0,
            count: 0
        };
        let left = 0,
            totalWidth = 0,
            navWidth = domUtils.outerWidth(this.refs.tabNav),
            tabs = this.refs.tabNav.getElementsByClassName(`tab-item`);
        for (let i = 0, w; i < tabs.length; i++) {
            w = domUtils.outerWidth(tabs[i], true);
            totalWidth += w;
            this.tabsInfo.arrWidth.push(w);
            this.tabsInfo.arrLeft.push(left);
            left += w;
        }
        this.tabsInfo.tabs = tabs;
        this.tabsInfo.maxLeft = totalWidth - navWidth;
        this.tabsInfo.count = tabs.length;
        this.tabsInfo.totalWidth = totalWidth;
        this.tabsInfo.navWidth = navWidth;
        this.tabsInfo.navOffset = domUtils.offset(this.refs.tabNav);
    }
    getTabs() {
        const { panels, onTabClick, editable } = this.props;
        const { activeIndex } = this.state;
        let items = [];
        panels.map((child, index) => {
            if (!child) {
                return;
            }
            const { tab, disabled } = child.props;
            items.push(
                <TabItem
                    key={index}
                    index={index}
                    disabled={disabled}
                    editable={editable}
                    isActive={activeIndex == index}
                    onClick={this.handleTabClick}
                    onClose={this.handleTabRemove}>
                    {tab}
                </TabItem>
            );
        })
        return items;
    }
    scrollTo(index) {
        const { panels } = this.props;
        const { scrollLeft, activeIndex } = this.state;
        let max = panels.length - 1,
            left;
        index = index != undefined ? index : activeIndex;
        if (index < 0) {
            index = 0;
        }
        if (index > max) {
            index = max;
        }
        let el = this.tabsInfo.tabs[index],
            offset = domUtils.offset(el),
            position = domUtils.position(el),
            ew = this.tabsInfo.arrWidth[index] - domUtils.css(el, 'marginRight', true),
            tw = offset.left + this.tabsInfo.arrWidth[index],
            nw = this.tabsInfo.navOffset.left + this.tabsInfo.navWidth;
        if (offset.left < this.tabsInfo.navOffset.left) {
            left = this.tabsInfo.arrLeft[index];
        }
        if (tw > nw) {
            left = tw - nw - domUtils.css(el, 'marginRight', true) + scrollLeft;
        }
        if (left != undefined) {
            this.setState({
                scrollLeft: left
            });
        }
        this.setState({
            inkLeft: position.left,
            inkWidth: ew
        });
    }
    setActiveIndex(index) {
        if (!('activeIndex' in this.props)) {
            this.setState({
                activeIndex: index
            });
            this.scrollTo(index);
        }
    }
    componentWillMount() {
        const { activeIndex } = this.state;
        const { panels } = this.props;
        let hasMap = false;
        for (let i = 0; i < panels.length; i++) {
            const child = panels[i];
            const { disabled } = child.props;
            if (disabled && i == activeIndex) {
                hasMap = true;
                break;
            }
        }
        if (hasMap) {
            this.setState({
                activeIndex: 0
            })
        }
    }
    componentDidMount() {
        this.setTabsInfo();
        if (this.tabsInfo.totalWidth > this.tabsInfo.navWidth) {
            this.setState({
                scrolling: true
            });
            setTimeout(() => {
                this.setTabsInfo();
                this.scrollTo();
            });
        } else {
            this.scrollTo();
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('activeIndex' in nextProps && nextProps.activeIndex != this.state.activeIndex) {
            this.setState({
                activeIndex: nextProps.activeIndex
            });
            this.scrollTo(nextProps.activeIndex);
            this.tmpIndex = nextProps.activeIndex;
        }
    }
    renderTabsContainer() {
        const { prefixCls, type } = this.props;
        const { inkLeft, inkWidth, scrollLeft, scrolling } = this.state;
        return (
            <div className={classnames(`${prefixCls}-nav-container`, { 'scrolling': scrolling })}>
                <span className={classnames(`${prefixCls}-tab-prev`, { 'disabled': !scrolling })}
                    onClick={this.handlePrevClick}>
                    <Icon type="left" />
                </span>
                <span className={classnames(`${prefixCls}-tab-next`, { 'disabled': !scrolling })}
                    onClick={this.handleNextClick}>
                    <Icon type="right" />
                </span>
                <div className={`${prefixCls}-nav-scroll`}>
                    <ul
                        className={`${prefixCls}-nav`}
                        ref="tabNav"
                        style={{ transform: `translate3d(-${scrollLeft}px, 0px, 0px)` }}>
                        {type == 'line' ? <li className={`${prefixCls}-ink-bar`}
                            style={{ width: inkWidth, transform: `translate3d(${inkLeft}px, 0px, 0px)` }}></li> : null}
                        {this.getTabs()}
                    </ul>
                </div>
            </div>
        )
    }
    renderExtraContent() {
        const { prefixCls, editable, extraContent, hideAdd } = this.props;
        return (
            <div className={`${prefixCls}-extra-content`}>
                {editable && !hideAdd ? <Icon type="plussquareo" onClick={this.handleTabAdd} /> : null}
                {extraContent}
            </div>
        )
    }
    render() {
        const { prefixCls } = this.props;
        let classString = classnames({
            [`${prefixCls}-bar`]: true
        })
        return (
            <div className={classString}>
                {this.renderExtraContent()}
                {this.renderTabsContainer()}
            </div>
        )
    }
}

export default TabNav;