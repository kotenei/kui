import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabItem from './TabItem';
import Icon from '../Icon';
import domUtils from '../../utils/domUtils';

class TabNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.activeIndex || props.defaultActiveIndex || 0,
            scrollLeft: 0
        }
    }
    handleTabClick = (e, index) => {
        const { onTabClick } = this.props;
        this.setActiveIndex(index);
        if (onTabClick) {
            onTabClick(e, index);
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
        let maxLeft=0;
        scrollLeft += this.tabsInfo.navWidth;
        maxLeft=this.tabsInfo.totalWidth-this.tabsInfo.navWidth;
        if(scrollLeft>=maxLeft){
            scrollLeft=maxLeft;
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
        this.scrollTo();
    }
    getTabs() {
        const { panels, onTabClick } = this.props;
        const { activeIndex } = this.state;
        let items = [];
        panels.map((child, index) => {
            if (!child) {
                return;
            }
            const { tab } = child.props;
            items.push(
                <TabItem
                    key={index}
                    index={index}
                    isActive={activeIndex == index}
                    onClick={this.handleTabClick}>
                    {tab}
                </TabItem>
            );
        })
        return items;
    }
    scrollTo(index) {
        const { panels } = this.props;
        const { scrollLeft } = this.state;
        let max = panels.length - 1,
            left;
        index = index != undefined ? index : this.state.activeIndex;
        if (index < 0) {
            index = 0;
        }
        if (index > max) {
            index = max;
        }
        let el = this.tabsInfo.tabs[index],
            offset = domUtils.offset(el),
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
    }
    setActiveIndex(index) {
        if (!('activeIndex' in this.props)) {
            this.setState({
                activeIndex: index
            });
            this.scrollTo(index);
        }
    }
    componentDidMount() {
        this.setTabsInfo();
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
        const { inkWidth, scrollLeft } = this.state;
        return (
            <div className={`${prefixCls}-nav-container`}>
                <span className={`${prefixCls}-tab-prev`} onClick={this.handlePrevClick}>
                    <Icon type="left" />
                </span>
                <span className={`${prefixCls}-tab-next`} onClick={this.handleNextClick}>
                    <Icon type="right" />
                </span>
                <div className={`${prefixCls}-nav-scroll`}>
                    <ul
                        className={`${prefixCls}-nav`}
                        ref="tabNav"
                        style={{ transform: `translate3d(-${scrollLeft}px, 0px, 0px)` }}>
                        {/* {type == 'line' ? <li className={`${prefixCls}-ink-bar`} style={{ width: inkWidth, left: inkLeft }}></li> : null} */}
                        {this.getTabs()}
                    </ul>
                </div>
            </div>
        )
    }
    renderExtraContent() {
        const { prefixCls } = this.props;
        return (
            <div className={`${prefixCls}-extra-content`}>

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
                {this.renderTabsContainer()}
                {this.renderExtraContent()}
            </div>
        )
    }
}

export default TabNav;