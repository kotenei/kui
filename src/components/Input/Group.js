import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { kSize, kClass, getClassSet } from '../../utils/kUtils';
import { Sizes } from '../../utils/styleMaps';

const prefixCls = "k-input-group";

class InputGroup extends Component {
    static propTypes = {
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node,
    }
    static defaultProps = {

    }
    render() {
        const { props } = this;
        const addonBefore = props.addonBefore ? (
            <span className={`${prefixCls}-addon`}>{props.addonBefore}</span>
        ) : null;
        const addonAfter = props.addonAfter ? (
            <span className={`${prefixCls}-addon`}>{props.addonAfter}</span>
        ) : null;
        let classes = getClassSet(props);
        return (
            <div className={classnames(classes)}>
                {addonBefore}
                {props.children}
                {addonAfter}
            </div>
        )
    }
}

export default kSize([Sizes.LARGE, Sizes.SMALL],
    kClass(prefixCls, InputGroup)
);