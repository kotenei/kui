import React from 'react';

import { Notification } from '../notification';
import MessageContent from './message-content';
import { MessageConfig } from './typing';
import { uuid } from '../../utils';

let instance;
let defaultDuration = 1500;

const notice = (
  state: KUI.StateTypes | 'loading',
  content: React.ReactNode,
  duration = defaultDuration,
  onClose,
) => {
  if (!content) {
    return;
  }

  if (typeof duration === 'function') {
    onClose = duration;
    duration = defaultDuration;
  }

  if (!instance) {
    instance = Notification.newInstance({
      transitionName: 'message',
    });
  }

  const key = uuid();
  const container = <MessageContent state={state} content={content} />;

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
  info(content, duration, onClose) {
    return notice('info', content, duration, onClose);
  },
  success(content, duration, onClose) {
    return notice('success', content, duration, onClose);
  },
  warning(content, duration, onClose) {
    return notice('warning', content, duration, onClose);
  },
  error(content, duration, onClose) {
    return notice('danger', content, duration, onClose);
  },
  loading(content, duration, onClose) {
    return notice('loading', content, duration, onClose);
  },
  config(options: MessageConfig = {}) {
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
  },
  destory() {
    if (instance) {
      instance.destory();
      instance = null;
    }
  },
};
