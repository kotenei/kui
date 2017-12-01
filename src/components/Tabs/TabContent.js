import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.activeIndex || props.defaultActiveIndex || 0,
            scrollLeft: 0,
            scrollTop: 0
        }
    }
    setTabContentInfo() {

    }
    getTabPanels() {
        const { panels } = this.props;
        let items = [];
        panels.map((child) => {
            if (!child) {
                return;
            }
            const { children } = child.props;
            items.push(
                <div>
                    {children}
                </div>
            );
        })
        return items;
    }
    scrollTo(index) {

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if ('activeIndex' in nextProps && nextProps.activeIndex != this.state.activeIndex) {
            this.setState({
                activeIndex: nextProps.activeIndex
            });
            this.scrollTo(nextProps.activeIndex);
        }
    }
    render() {
        const { prefixCls } = this.props;
        return (
            <div className={`${prefixCls}-content`}>
                {this.getTabPanels()}
            </div>
        )
    }
}

export default TabContent;