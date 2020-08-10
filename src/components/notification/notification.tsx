import React from 'react';

import Notification from './notification-container';
import NoticeContent from './notice-conent';
import { uuid } from '../../utils';
import { NotificationConfig } from './typing';

let instance;
let defaultDuration = 1500;
let placement = 'topRight';

const prefixCls = 'k-notification';

const notice = (state, title, content, duration, onClose) => {
  const key = uuid();

  if (!title || !content) {
    return null;
  }

  if (typeof duration === 'function') {
    onClose = duration;
    duration = defaultDuration;
  }

  if (!instance) {
    instance = Notification.newInstance({
      transitionName: 'notice',
      prefixCls,
      className: `${prefixCls}--${placement}`,
    });
  }

  const container = <NoticeContent state={state} title={title} content={content} />;

  instance.notice({
    key,
    content: container,
    duration,
    onClose,
  });

  return {
    remove() {
      instance.remove(key);
    },
  };
};

export default {
  open(title, content, duration, onClose) {
    return notice(null, title, content, duration, onClose);
  },
  info(title, content, duration, onClose) {
    return notice('info', title, content, duration, onClose);
  },
  success(title, content, duration, onClose) {
    return notice('success', title, content, duration, onClose);
  },
  warning(title, content, duration, onClose) {
    return notice('warning', title, content, duration, onClose);
  },
  error(title, content, duration, onClose) {
    return notice('danger', title, content, duration, onClose);
  },
  config(options: NotificationConfig = {}) {
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.placement !== undefined) {
      placement = options.placement;
    }
  },
  destory() {
    if (instance) {
      instance.destory();
      instance = null;
    }
  },
};
