import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import Button from '../Button';
import domUtils from '../../utils/domUtils';
import { FirstChild, guid } from '../../utils/kUtils';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

let seed = 1;
let zIndex = 1000;
let prefixCls = 'k-modal';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalWidth: props.width || 600,
            modalHeight: props.height || 500,
            bodyHeight: 400,
            show: false
        }
        this.minHeight = 200;
        this.key = `modal_${seed++}`;
    }
    static propTypes = {
        title: PropTypes.node,
        content: PropTypes.node,
        footer: PropTypes.node,
        width: PropTypes.number,
        height: PropTypes.number,
        backdrop: PropTypes.bool,
        backdropClose: PropTypes.bool,
        showCloseIcon: PropTypes.bool,
        showHeader: PropTypes.bool,
        showFooter: PropTypes.bool,
        space: PropTypes.number,
        show: PropTypes.bool,
        okText: PropTypes.string,
        okStyle: PropTypes.string,
        cancelText: PropTypes.string,
        cancelStyle: PropTypes.string,
        onOK: PropTypes.func,
        onCancel: PropTypes.func
    }
    static defaultProps = {
        title: '对话框',
        width: 720,
        height: 480,
        showHeader: true,
        showFooter: true,
        backdrop: true,
        backdropClose: false,
        showCloseIcon: true,
        show: false,
        okText: '确认',
        okStyle: 'primary',
        cancelText: '取消',
        space: 50,
        onOK: (e) => { },
        onCancel: (e) => { }
    }
    handleCancel = (e) => {
        const { onCancel } = this.props;
        onCancel.call(this, e);
    }
    handleOK = (e) => {
        const { onOK } = this.props;
        onOK.call(this, e);
    }
    handleBackdropClick = (e) => {
        const { backdropClose, onCancel } = this.props;
        if (backdropClose) {
            onCancel.call(this, e);
        }
    }
    layout = () => {
        const { height, space } = this.props;
        //屏幕高度
        let screenHeight = document.documentElement.clientHeight;
        //最大弹窗高度
        let maxHeight = screenHeight - space;
        //头部高度
        let headHeight = domUtils.outerHeight(this.refs.head);
        //底部高度
        let footHeight = domUtils.outerHeight(this.refs.foot);
        //最大容器高度
        let maxBodyHeight = maxHeight - headHeight - footHeight;

        let newHeight, bodyHeight;

        if (height) {
            // 最大弹窗高度小于设置的高度
            if (maxHeight < height) {
                newHeight = maxHeight;
                bodyHeight = maxBodyHeight;
            } else {
                newHeight = height;
                bodyHeight = newHeight - headHeight - footHeight;
            }
        } else {
            // 最大弹窗高度小于当前窗体高度
            if (maxHeight < screenHeight) {
                newHeight = maxHeight;
                bodyHeight = maxBodyHeight;
            } else {
                newHeight = screenHeight;
                bodyHeight = screenHeight - headHeight - footHeight;
            }
        }
        if (newHeight <= this.minHeight) {
            newHeight = this.minHeight;
            bodyHeight = newHeight - headHeight - footHeight;
        }

        this.setState({
            bodyHeight,
            modalHeight: newHeight
        });
    }
    hide() {
        this.setState({
            show: false
        })
        zIndex -= 2;
    }
    componentDidMount() {
        this.layout();
        window.addEventListener('resize', this.layout);
        if (this.props.show) {
            zIndex += 2;
            setTimeout(() => {
                this.setState({
                    show: this.props.show
                })
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            zIndex += 2;
        } else {
            zIndex -= 2;
        }
        if (this.state.show != nextProps.show) {
            this.setState({
                show: nextProps.show
            })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.show == nextState.show) {
            return false;
        }
        return true;
    }
    componentWillUnmount() {
        this.setState({
            show: false
        })
        window.removeEventListener('resize', this.layout);
        seed--;
    }
    renderHeader() {
        const { title, showHeader, showCloseIcon } = this.props;
        if (!showHeader) {
            return null;
        }
        return (
            <div className={`${prefixCls}-head`} ref="head">
                {title}
                {
                    showCloseIcon ? <Icon className="close" type="close" onClick={this.handleCancel} /> : null
                }
            </div>
        )
    }
    renderFooter() {
        const { showFooter, footer, okText, okStyle, cancelText, cancelStyle } = this.props;
        if (!showFooter) {
            return null;
        }
        let items = [];
        if (footer) {
            return (
                <div className={`${prefixCls}-foot`} ref="foot">
                    {footer}
                </div>
            )
        } else {
            items.push(<Button raised kStyle={cancelStyle} onClick={this.handleCancel}>{cancelText}</Button>);
            items.push(<Button raised kStyle={okStyle} onClick={this.handleOK}>{okText}</Button>);
        }
        return (
            <div className={`${prefixCls}-foot`} ref="foot">
                {items}
            </div>
        )
    }
    render() {
        const { className, title, content, backdrop } = this.props;
        const { modalWidth, modalHeight, bodyHeight, show } = this.state;
        let classString = classnames(className, {
            [prefixCls]: true,
            'in': show
        });
        let maskClassString = classnames({
            [`${prefixCls}-mask`]: true,
            in: backdrop && show
        });
        return (
            ReactDOM.createPortal(
                <div id={this.key}>
                    <div className={classString} ref="modal"
                        style={{ width: modalWidth, height: modalHeight, zIndex: zIndex }}>
                        {this.renderHeader()}
                        <div className={`${prefixCls}-body`} ref="body"
                            style={{ height: bodyHeight }}>
                            {content}
                        </div>
                        {this.renderFooter()}
                    </div>
                    <div
                        className={maskClassString}
                        onClick={this.handleBackdropClick}
                        style={{ zIndex: zIndex - 1 }}></div>
                </div>, document.body
            )
        )
    }
}

export default Modal;