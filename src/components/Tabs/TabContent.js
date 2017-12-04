import React, { Component } from 'react';
import PropTypes from 'prop-types';
import domUtils from '../../utils/domUtils';
import classnames from 'classnames';

class TabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollLeft: 0
        }
        this.isVertical = props.tabPosition == 'left' || props.tabPosition == 'right';
    }
    setTabContentInfo() {
        const { panels } = this.props;
        let width = domUtils.outerWidth(this.refs.tabContent),
            totalWidth = panels.length * width;

        this.info = {
            width,
            totalWidth
        }
    }
    getTabPanels() {
        const { panels, prefixCls, activeIndex } = this.props;
        let items = [];
        panels.map((child, index) => {
            if (!child) {
                return;
            }
            const { children } = child.props;
            let classString = classnames({
                [`${prefixCls}-panel`]: true,
                'active': activeIndex == index
            })
            items.push(
                <div className={classString}>
                    {children}
                </div>
            );
        })
        return items;
    }
    scrollTo(index) {
        const { panels, activeIndex, tabPosition } = this.props;
        const { props } = this.state;
        let max = panels.length - 1;
        let scrollLeft = 0;
        index = index != undefined ? index : activeIndex;
        if (index < 0) {
            index = 0;
        }
        if (index > max) {
            index = max;
        }
        scrollLeft = index * this.info.width;
        if (this.isVertical) {
            scrollLeft = 0;
        }
        this.setState({
            scrollLeft
        })
    }
    componentDidMount() {
        this.setTabContentInfo();
        this.scrollTo();
    }
    componentWillReceiveProps(nextProps) {
        this.isVertical = nextProps.tabPosition == 'left' || nextProps.tabPosition == 'right';
        if (this.props.tabPosition != nextProps.tabPosition || this.props.panels.length != nextProps.panels.length) {
            setTimeout(() => {
                this.setTabContentInfo();
                this.scrollTo(nextProps.activeIndex);
            }, 100);
        }else if (this.props.activeIndex != nextProps.activeIndex) {
            this.scrollTo(nextProps.activeIndex);
        }
    }
    render() {
        const { prefixCls } = this.props;
        const { scrollLeft } = this.state;
        return (
            <div className={`${prefixCls}-content`} ref="tabContent" style={{ marginLeft: -scrollLeft }} >
                {this.getTabPanels()}
            </ div>
        )
    }
}

export default TabContent;