import React from 'react';
import ReactDOM from 'react-dom';
import {
  AiFillQuestionCircle,
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiFillCloseCircle,
  AiFillInfoCircle,
} from 'react-icons/ai';
import { domHelpers, uuid } from '../../utils';

import { Button } from '../button';
import { Icon } from '../icon';
import Modal from './modal';
import { ConfirmProps } from './typing';

const confirm = (config: ConfirmProps) => {
  const props = {
    icon: <AiFillQuestionCircle />,
    type: 'info',
    width: 400,
    height: 180,
    okText: 'OK',
    cancelText: 'Cancel',
    okCancel: true,
    ...config,
  };
  const id = 'confirm_' + uuid();
  const prefixCls = 'k-modal-confirm';
  const div = document.createElement('div');
  document.body.appendChild(div);

  const close = () => {
    const elmModal = document.getElementById(id);
    const elmMask = document.getElementById(`mask_${id}`);

    const unmount = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    };

    if (elmModal) {
      domHelpers.removeClass(elmModal, 'in');
      if (elmMask) {
        domHelpers.removeClass(elmMask, 'fade-enter-done');
        domHelpers.addClass(elmMask, 'fade-exit-active');
      }
      setTimeout(() => {
        unmount();
      }, 300);
    } else {
      unmount();
    }
  };

  const onCancel = () => {
    if (!props.onCancel || props.onCancel() !== false) {
      close();
    }
  };

  const onOK = () => {
    if (!props.onOK || props.onOK() !== false) {
      close();
    }
  };

  let body = (
    <div className={`${prefixCls}-body`}>
      <Icon className={`icon-${props.type}`} color={props.type as any} children={props.icon} />
      <span className={`${prefixCls}-title`}>{props.header}</span>
      <div className={`${prefixCls}-content`}>{props.content}</div>
    </div>
  );

  let footer;
  if (props.okCancel) {
    footer = (
      <div className={`${prefixCls}-btns`}>
        <Button onClick={onCancel}>{props.cancelText}</Button>
        <Button color="primary" onClick={onOK}>
          {props.okText}
        </Button>
      </div>
    );
  } else {
    footer = (
      <div className={`${prefixCls}-btns`}>
        <Button color="primary" onClick={onOK}>
          {props.okText}
        </Button>
      </div>
    );
  }

  body = (
    <React.Fragment>
      {body}
      {footer}
    </React.Fragment>
  );

  ReactDOM.render(
    <Modal
      id={id}
      className={`${prefixCls}`}
      content={body}
      showHeader={false}
      showFooter={false}
      width={props.width}
      height={props.height}
      mask={true}
      open
    />,
    div,
  );

  return {
    destory: close,
  };
};

export default {
  info(props) {
    const config = {
      type: 'info',
      icon: <AiFillInfoCircle />,
      okCancel: false,
      ...props,
    };
    return confirm(config);
  },
  success(props) {
    const config = {
      type: 'success',
      icon: <AiFillCheckCircle />,
      okCancel: false,
      ...props,
    };
    return confirm(config);
  },
  warning(props) {
    const config = {
      type: 'warning',
      icon: <AiFillExclamationCircle />,
      okCancel: false,
      ...props,
    };
    return confirm(config);
  },
  error(props) {
    const config = {
      type: 'danger',
      icon: <AiFillCloseCircle />,
      okCancel: false,
      ...props,
    };
    return confirm(config);
  },
  confirm(props) {
    const config = {
      type: 'warning',
      icon: <AiFillQuestionCircle />,
      ...props,
    };
    return confirm(config);
  },
};
