import React, { Component, PropTypes } from 'react';
import ProgressLine from './ProgressLine';
import ProgressCircle from './ProgressCircle';
import classnames from 'classnames';
import { kStyles, kClass, getClassSet } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY } from '../../utils/styleMaps';

class Progress extends Component {
    static propTypes = {
        percent: PropTypes.number,
        type: PropTypes.oneOf(['line', 'circle']),
        status: PropTypes.oneOf(['success', 'error']),
        strokeWidth: PropTypes.number,
        textInside: PropTypes.bool,
        showText: PropTypes.bool,
        width: PropTypes.number
    }
    static defaultProps = {
        percent: 0,
        type: 'line',
        strokeWidth: 6,
        textInside: false,
        showText: true,
        width: 100
    }
    renderContainer(prefixCls) {
        const { type } = this.props;
        if (type == 'line') {
            return <ProgressLine {...this.props } prefixCls={prefixCls} />
        } else {
            return <ProgressCircle {...this.props} prefixCls={prefixCls} />
        }
    }
    render() {
        const { type, textInside } = this.props;
        let prefixCls = 'k-progress';
        let classString = getClassSet(this.props);
        classString = classnames(classString, {
            [`${prefixCls}-line`]: type == 'line',
            [`${prefixCls}-text-inside`]: textInside,
            [`${prefixCls}-circle`]:type=='circle'
        });

        return (
            <div className={classString}>
                {this.renderContainer(prefixCls)}
            </div>
        );
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(styles, PRIMARY,
    kClass('k-progress', Progress)
);