import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabContent extends Component {
    getTabPanels() {
        const { panels } = this.props;
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