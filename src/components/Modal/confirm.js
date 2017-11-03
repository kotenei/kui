import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../Icon';
import Modal from './Modal';
import ActionButton from './ActionButton';

export default function confirm(config) {
    let instance;
    const props = {
        iconType: 'questioncircle',
        okCancel: true,
        cancelText: '取消',
        okText: '确定',
        width: 420,
        height: 210,
        ...config
    }
    let prefixCls = 'k-confirm';
    let div = document.createElement('div');
    document.body.appendChild(div);

    function close() {
        instance.hide();
        instance = null;
        setTimeout(function () {
            const unmountResult = ReactDOM.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }, 300);
    }

    let body = (
        <div className={`${prefixCls}-body`}>
            <Icon type={props.iconType} className={`text-${props.type}`} />
            <span className={`${prefixCls}-title`}>{props.title}</span>
            <div className={`${prefixCls}-content`}>{props.content}</div>
        </div>
    );

    let footer;
    if (props.okCancel) {
        footer = (
            <div className={`${prefixCls}-btns`}>
                <ActionButton kStyle={props.cancelStyle} onClick={props.onCancel} closeModal={close} >{props.cancelText}</ActionButton>
                <ActionButton kStyle={props.okStyle||'primary'} onClick={props.onOK} closeModal={close} >{props.okText}</ActionButton>

            </div>
        );
    } else {
        footer = (
            <div className={`${prefixCls}-btns`}>
                <ActionButton kStyle={props.okStyle||'primary'} onClick={props.onOK} closeModal={close}>{props.okText}</ActionButton>
            </div>
        );
    }

    body = (
        <div className={`${prefixCls}`}>
            {body}
            {footer}
        </div>
    );

    instance = ReactDOM.render(
        <Modal
            content={body}
            showHeader={false}
            showFooter={false}
            width={props.width}
            height={props.height}
            show
            />, div);

    return {
        destory: close
    }

}


