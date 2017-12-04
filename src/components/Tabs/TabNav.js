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
            scrollTop: 0,
            scrollLeft: 0,
            inkWidth: 0,
            inkHeight: 0,
            inkLeft: 0,
            inkTop: 0,
            scrolling: false
        }
        this.isVertical = props.tabPosition == 'left' || props.tabPosition == 'right';

    }
    handleTabClick = (e, index) => {
        const { onTabClick } = this.props;
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
        let { scrollLeft, scrollTop } = this.state;
        if (this.isVertical) {
            scrollTop -= this.tabsInfo.scrollHeight;
            if (scrollTop <= 0) {
                scrollTop = 0;
            }
            this.setState({
                scrollTop
            })
        } else {
            scrollLeft -= this.tabsInfo.scrollWidth;
            if (scrollLeft <= 0) {
                scrollLeft = 0
            }
            this.setState({
                scrollLeft
            });
        }

    }
    handleNextClick = (e) => {
        let { scrollLeft, scrollTop } = this.state;
        let maxLeft = 0, maxTop = 0;
        if (this.isVertical) {
            scrollTop += this.tabsInfo.scrollHeight;
            maxTop = this.tabsInfo.totalHeight - this.tabsInfo.scrollHeight;
            if (scrollTop >= maxTop) {
                scrollTop = maxTop;
            }
            this.setState({
                scrollTop
            })
        } else {
            scrollLeft += this.tabsInfo.scrollWidth;
            maxLeft = this.tabsInfo.totalWidth - this.tabsInfo.scrollWidth;
            if (scrollLeft >= maxLeft) {
                scrollLeft = maxLeft;
            }
            this.setState({
                scrollLeft
            })
        }

    }
    setTabsInfo() {
        const { activeIndex } = this.props;
        this.tabsInfo = {
            arrHeight: [],
            arrWidth: [],
            arrLeft: [],
            arrTop: [],
            count: 0
        };
        let left = 0,
            top = 0,
            totalWidth = 0,
            totalHeight = 0,
            scrollWidth = domUtils.outerWidth(this.refs.scroll),
            scrollHeight = domUtils.outerHeight(this.refs.scroll),
            tabs = this.refs.scroll.getElementsByClassName(`tab-item`);
        for (let i = 0, w, h; i < tabs.length; i++) {
            w = domUtils.outerWidth(tabs[i], true);
            h = domUtils.outerHeight(tabs[i], true);
            totalWidth += w;
            totalHeight += h;
            this.tabsInfo.arrWidth.push(w);
            this.tabsInfo.arrHeight.push(h);
            this.tabsInfo.arrLeft.push(left);
            this.tabsInfo.arrTop.push(top);
            left += w;
            top += h;
        }

        this.tabsInfo.tabs = tabs;
        this.tabsInfo.maxLeft = totalWidth - scrollWidth;
        this.tabsInfo.maxHeight = totalHeight - scrollHeight;
        this.tabsInfo.count = tabs.length;
        this.tabsInfo.totalWidth = totalWidth;
        this.tabsInfo.totalHeight = totalHeight;
        this.tabsInfo.scrollWidth = scrollWidth;
        this.tabsInfo.scrollHeight = scrollHeight;
        this.tabsInfo.scrollOffset = domUtils.offset(this.refs.scroll);
    }
    getTabs() {
        const { panels, onTabClick, editable } = this.props;
        const { activeIndex } = this.props;
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
                    editable={editable && panels.length > 1}
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
        const { panels, activeIndex } = this.props;
        const { props } = this.state;
        let max = panels.length - 1;
        index = index != undefined ? index : activeIndex;
        if (index < 0) {
            index = 0;
        }
        if (index > max) {
            index = max;
        }
        console.log(index)
        if (this.isVertical) {
            this.verticalScroll(index);
        } else {
            this.horizontalScroll(index);
        }
    }
    //水平滚动
    horizontalScroll(index) {
        const { scrollLeft } = this.state;
        let el = this.tabsInfo.tabs[index],
            offset = domUtils.offset(el),
            position = domUtils.position(el),
            ew = this.tabsInfo.arrWidth[index] - domUtils.css(el, 'marginRight', true),
            tw = offset.left + this.tabsInfo.arrWidth[index],
            nw = this.tabsInfo.scrollOffset.left + this.tabsInfo.scrollWidth,
            left;
        if (offset.left < this.tabsInfo.scrollOffset.left) {
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
    //垂直滚动
    verticalScroll(index) {
        const { scrollTop } = this.state;
        let el = this.tabsInfo.tabs[index],
            offset = domUtils.offset(el),
            position = domUtils.position(el),
            eh = this.tabsInfo.arrHeight[index] - domUtils.css(el, 'marginBottom', true),
            th = offset.top + this.tabsInfo.arrHeight[index],
            nh = this.tabsInfo.scrollOffset.top + this.tabsInfo.scrollHeight,
            top;

        if (offset.top < this.tabsInfo.scrollOffset.top) {
            top = this.tabsInfo.arrTop[index];
        }
        if (th > nh) {
            top = th - nh - domUtils.css(el, 'marginBottom', true) + scrollTop;
        }

        if (top != undefined) {
            this.setState({
                scrollTop: top
            });
        }
        this.setState({
            inkTop: position.top,
            inkHeight: eh
        });
    }
    componentDidMount() {
        this.setTabsInfo();
        if ((!this.isVertical && this.tabsInfo.totalWidth > this.tabsInfo.scrollWidth) ||
            (this.isVertical && this.tabsInfo.totalHeight > this.tabsInfo.scrollHeight)) {
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
        this.isVertical = nextProps.tabPosition == 'left' || nextProps.tabPosition == 'right';

        if (this.props.tabPosition != nextProps.tabPosition || (this.props.panels.length != nextProps.panels.length)) {
            setTimeout(() => {
                this.setTabsInfo();
                if ((!this.isVertical && this.tabsInfo.totalWidth > this.tabsInfo.scrollWidth) ||
                    (this.isVertical && this.tabsInfo.totalHeight > this.tabsInfo.scrollHeight)) {
                    this.setState({
                        scrolling: true,
                    });
                } else {
                    this.setState({
                        scrolling: false,
                        scrollLeft: 0,
                        scrollTop: 0
                    });
                }
                setTimeout(() => {
                    this.setTabsInfo();
                    this.scrollTo(nextProps.activeIndex);
                }, 100)
            }, 100);
        } else if (this.props.activeIndex != nextProps.activeIndex) {
            this.scrollTo(nextProps.activeIndex);
        }

    }
    renderTabsContainer() {
        const { prefixCls, type } = this.props;
        const { inkTop, inkLeft, inkWidth, inkHeight, scrollLeft, scrolling, scrollTop } = this.state;
        let navStyle, inkStyle;
        if (!this.isVertical) {
            navStyle = { transform: `translate3d(-${scrollLeft}px, 0px, 0px)` };
            inkStyle = { width: inkWidth, transform: `translate3d(${inkLeft}px, 0px, 0px)` };
        } else {
            navStyle = { transform: `translate3d(0px, -${scrollTop}px, 0px)` };
            inkStyle = { height: inkHeight, transform: `translate3d(0px, ${inkTop}px, 0px)` };
        }
        return (
            <div className={classnames(`${prefixCls}-nav-container`, { 'scrolling': scrolling })}>
                <span className={classnames(`${prefixCls}-tab-prev`, { 'disabled': !scrolling })}
                    onClick={this.handlePrevClick}>
                    <Icon type={this.isVertical ? 'up' : 'left'} />
                </span>
                <span className={classnames(`${prefixCls}-tab-next`, { 'disabled': !scrolling })}
                    onClick={this.handleNextClick}>
                    <Icon type={this.isVertical ? 'down' : 'right'} />
                </span>
                <div className={`${prefixCls}-nav-scroll`} ref="scroll">
                    <ul
                        className={`${prefixCls}-nav`}
                        style={navStyle}>
                        {type == 'line' ? <li className={`${prefixCls}-ink-bar`}
                            style={inkStyle}></li> : null}
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
                {this.isVertical ? null : this.renderExtraContent()}
                {this.renderTabsContainer()}
                {this.isVertical ? this.renderExtraContent() : null}
            </div>
        )
    }
}

export default TabNav;