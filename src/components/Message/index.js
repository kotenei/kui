import React from 'react';
import ReactDOM from 'react-dom';
import { guid } from '../../utils/kUtils';
import {Notification} from '../Notification';
import Message from './Message';

let defaultDuration = 1500;
let messageInstance;
let getContainer;

const notice = (state, content, duration = defaultDuration, onClose = () => { }) => {
    let key = guid();

    if (typeof duration === 'function') {
        onClose = duration;
        duration = defaultDuration;
    }

    if (!messageInstance) {
        messageInstance = Notification.newInstance({
            getContainer,
            component:Message,
            transitionName:'message'
        });
    }

    messageInstance.notice({
        key,
        state,
        content,
        duration,
        onClose
    });

    return {
        remove() {
            messageInstance.remove(key);
        }
    }
}


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
        return notice('error', content, duration, onClose);
    },
    loading(content, duration, onClose) {
        return notice('loading', content, duration, onClose);
    },
    config(options = {}) {
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
    },
    destory() {
        if (messageInstance) {
            messageInstance.destory();
            messageInstance = null;
        }
    }
}