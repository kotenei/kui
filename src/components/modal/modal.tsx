import React, { memo, useEffect, useCallback, useRef } from 'react';
import classnames from 'classnames';
import domHelpers from 'dom-helpers';

import { Button } from '../button';
import { Icon } from '../icon';
import { Portal } from '../portal';
import { Mask } from '../mask';
import { ModalProps } from './typing';
import { AiOutlineClose } from 'react-icons/ai';
import { useWinSize, useStateCallback } from '../../hooks';

let zIndex = 1000;

const Modal = (props: ModalProps) => {
  const {
    prefixCls = 'k-modal',
    className,
    header,
    content,
    footer,
    open = false,
    mask = true,
    maskClose = true,
    showHeader,
    showFooter,
    showCancel,
    showCloseIcon,
    space = 50,
    cancelText = 'Cancel',
    okText = 'Confirm',
  } = props;

  const [state, setState] = useStateCallback({
    show: open,
    showMask: false,
    modalWidth: props.width || 720,
    modalHeight: props.height || 480,
    bodyHeight: 400,
  });
  const minHeight = 200;
  const elmHeader = useRef<any>(null);
  const elmFooter = useRef<any>(null);

  const winSize = useWinSize();

  useEffect(() => {
    if (open) {
      openModal();
    } else {
      closeModal();
    }
  }, [open]);

  useEffect(() => {
    window.addEventListener('resize', adpHeight);
    adpHeight();
    return () => {
      window.removeEventListener('resize', adpHeight);
    };
  }, []);

  const adpHeight = () => {
    const { height = 480 } = props;
    // 屏幕高度
    const screenHeight = document.documentElement.clientHeight;
    // 最大弹窗高度
    const maxHeight = screenHeight - space;
    // 头部高度
    const headHeight = elmHeader && elmHeader.current ? domHelpers.height(elmHeader.current) : 0;
    // 底部高度
    const footHeight = elmFooter && elmFooter.current ? domHelpers.height(elmFooter.current) : 0;
    // 最大容器高度
    const maxBodyHeight = maxHeight - headHeight - footHeight;

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

    if (newHeight <= minHeight) {
      newHeight = minHeight;
      bodyHeight = newHeight - headHeight - footHeight;
    }

    setState({
      bodyHeight,
      modalHeight: newHeight,
    });
  };

  const openModal = () => {
    zIndex++;
    if (state.show) {
      return;
    }
    setState({
      show: true,
      showMask: mask && true,
    });
  };

  const closeModal = () => {
    zIndex--;
    if (!state.show) {
      return;
    }
    setState({ show: false, showMask: false });
  };

  const onMaskClick = useCallback(() => {
    if (maskClose) {
      closeModal();
    }
  }, []);

  const classString = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--in`]: state.show,
    },
    className,
  );

  return (
    <Portal in={state.show} timeout={300}>
      <React.Fragment>
        <div
          className={classString}
          style={{ ...props.style, width: state.modalWidth, height: state.modalHeight, zIndex }}
        >
          {showHeader && header && (
            <div className={`${prefixCls}-header`} ref={elmHeader}>
              {header}
              {showCloseIcon ? (
                <Icon className="close">
                  <AiOutlineClose />
                </Icon>
              ) : null}
            </div>
          )}
          <div className={`${prefixCls}-body`} style={{ height: state.bodyHeight }}>
            {content}
          </div>
          {showFooter && (
            <div className={`${prefixCls}-footer`} ref={elmFooter}>
              {footer ? (
                footer
              ) : (
                <div className={`${prefixCls}-buttons`}>
                  {showCancel && (
                    <Button className={`${prefixCls}__cancel`} onClick={props.onCancel}>
                      {cancelText}
                    </Button>
                  )}
                  <Button className={`${prefixCls}__ok`} color="primary" onClick={props.onOK}>
                    {okText}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <Mask show={state.showMask} onClick={onMaskClick} zIndex={zIndex - 1} />
      </React.Fragment>
    </Portal>
  );
};

Modal.defaultProps = {
  width: 720,
  height: 480,
  mask: true,
  maskClose: false,
  okText: '确定',
  cancelText: '取消',
  showCancel: true,
  showHeader: true,
  showFooter: true,
  space: 50,
};

export default memo(Modal);
