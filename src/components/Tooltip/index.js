import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { kStyles, kClass, kSize, getClassSet, guid, FirstChild } from '../../utils/kUtils';
import { State, PRIMARY, Sizes } from '../../utils/styleMaps';

class Tooltip extends Component {
    static propTypes = {
        title: PropTypes.node,
        placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'])

    }
    static defaultProps = {
        placement: 'top'
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Tooltip;