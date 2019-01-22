import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';
import Tooltip from '../Tooltip';
import Icon from '../Icon';
import Button from '../Button';

let prefixCls = 'k-popconfirm';

class Popconfirm extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        title: PropTypes.node.isRequired,
        confirmText: PropTypes.string,
        cancelText: PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func
    }
    static defaultProps = {
        confirmText: '确定',
        cancelText: '取消'
    }
    handleCancel = (e) => {
        const { onCancel } = this.props;
        this.hide();
        if (onCancel) {
            onCancel.call(this, e);
        }
    }
    handleConfirm = (e) => {
        const { onConfirm } = this.props;
        if (onConfirm && onConfirm.call(this, e) != false) {
            this.hide();
        }
        if (!onConfirm) {
            this.hide();
        }
    }
    hide() {
        this.refs.tooltip.hide();
    }
    renderPopConfirm() {
        const { title, confirmText, cancelText } = this.props;
        return (
            <div>
                <div className={`${prefixCls}-message`}>
                    <Icon type="exclamation-circle" kStyle="warning" theme="filled"/>
                    <div className={`${prefixCls}-message-title`}>{title}</div>
                </div>
                <div className={`${prefixCls}-buttons`}>
                    <Button raised kSize="sm" onClick={this.handleCancel}>{cancelText}</Button>
                    <Button raised kStyle="primary" kSize="sm" onClick={this.handleConfirm}>{confirmText}</Button>
                </div>
            </div>
        )
    }
    render() {
        let popConfirm = this.renderPopConfirm();
        const otherProps = omit(this.props, [
            'children',
            'title',
            'kStyle'
        ]);
        return (
            <Tooltip
                ref="tooltip"
                kClass="k-popover"
                trigger="click"
                className={prefixCls}
                {...otherProps}
                title={popConfirm}
            >
                {this.props.children}
            </Tooltip>
        )
    }
}

export default Popconfirm;