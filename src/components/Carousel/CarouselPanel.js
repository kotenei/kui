import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class CarouselPanel extends Component {
    render() {
        const { prefixCls, children, width, height, vertical } = this.props;
        let classString = classnames({
            [`${prefixCls}-item`]: true
        });
        let style = {};
        if (vertical) {
            style.height = height;
        } else {
            style.width = width;
        }
        return (
            <div className={classString} style={style}>{children}</div>
        )
    }
}

export default CarouselPanel;