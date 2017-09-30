import React from 'react';
import ReactDOM from 'react-dom';
import { guid } from '../../utils/kUtils';
import Notice from './Notice';
import Notification from './Notification';


let defaultDuration = 1500;
let placement = 'topRight';
let noticeInstance;
let getContainer;
const prefixCls = 'k-notification';

const notice = (state, title, content, duration = defaultDuration, onClose = () => { }) => {
    if (!title || !content) {
        return null;
    }
    let key = guid();
    if (typeof duration === 'function') {
        onClose = duration;
        duration = defaultDuration;
    }
    if (!noticeInstance) {
        noticeInstance = Notification.newInstance({
            getContainer,
            component: Notice,
            transitionName: 'notice',
            className: `${prefixCls}-${placement}`
        });
    }
    noticeInstance.notice({
        key,
        state,
        title,
        content,
        duration,
        onClose
    });
    return {
        remove() {
            noticeInstance.remove(key);
        }
    }
}

export default {
    open(title, content, duration, onClose) {
        console.log('default')
        return notice(null, title, content, duration, onClose);
    },
    info(title, content, duration, onClose) {
        return notice('info', title, content, duration, onClose);
    },
    success(title, content, duration, onClose) {
        console.log('success')
        return notice('success', title, content, duration, onClose);
    },
    waring(title, content, duration, onClose) {
        return notice('warning', title, content, duration, onClose);
    },
    error(title, content, duration, onClose) {
        return notice('danger', title, content, duration, onClose);
    },
    config(options = {}) {
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
        if (options.placement !== undefined) {
            placement = options.placement;
        }
    },
    destory() {
        if (noticeInstance) {
            noticeInstance.destory();
            noticeInstance = null;
        }
    }
}

export  Notification from './Notification';

