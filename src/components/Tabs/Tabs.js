import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'object.omit';
import TabNav from './TabNav';
import TabContent from './TabContent';

const prefixCls = 'k-tabs';

class Tabs extends Component {
    static propTypes = {
        activeIndex: PropTypes.number,
        defaultActiveIndex: PropTypes.number,
        extraContent: PropTypes.node,
        tabPosition: PropTypes.arrayOf(['tope', 'left', 'right', 'bottom']),
        type: PropTypes.arrayOf(['line', 'card']),
        editable: PropTypes.bool,
        hideAdd: PropTypes.bool,
        onTabClick: PropTypes.func,
        onPrevClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onEdit: PropTypes.func
    }
    static defaultProps = {
        defaultActiveIndex: 0,
        tabPosition: 'top',
        type: 'line',
        editable: false,
        hideAdd: false
    }
    handleTabClick = () => {

    }
    handlePrevClick = () => {

    }
    handleNextClick = () => {

    }
    renderTabNav() {
        const { children } = this.props;
        if (!children) {
            return null;
        }
        let props = omit(this.props, ['children'])
        return (
            <TabNav
                prefixCls={prefixCls}
                panels={children}
                {...props} />
        );
    }
    renderTabContent() {
        const { children, activeIndex, defaultActiveIndex } = this.props;
        if (!children) {
            return null;
        }
        return (
            <TabContent
                prefixCls={prefixCls}
                panels={children}
                activeIndex={activeIndex}
                defaultActiveIndex={defaultActiveIndex}
            />
        );
    }
    render() {
        const { tabPosition, className, type, style } = this.props;
        let classString = classnames(className, {
            [prefixCls]: true,
            [`${prefixCls}-line`]: type == 'line',
            [`${prefixCls}-card`]: type == 'card',
            [`${prefixCls}-${tabPosition}`]: true,
            [`${prefixCls}-vertical`]: tabPosition == 'left' || tabPosition == 'right'
        });
        let content = [];

        if (tabPosition == 'bottom') {
            content.push(this.renderTabContent());
            content.push(this.renderTabNav());
        } else {
            content.push(this.renderTabNav());
            content.push(this.renderTabContent());
        }
        return (
            <div className={classString} style={style}>
                {content}
            </div>
        )
    }
}

export default Tabs;