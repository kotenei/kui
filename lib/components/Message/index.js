"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utils = require("../../utils");

var _Notification = require("../Notification");

var _Message = _interopRequireDefault(require("./Message"));

var defaultDuration = 1500;
var messageInstance;
var getContainer;

var notice = function notice(state, content) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDuration;
  var onClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

  if (!content) {
    return;
  }

  var key = (0, _utils.guid)();

  if (typeof duration === 'function') {
    onClose = duration;
    duration = defaultDuration;
  }

  if (!messageInstance) {
    messageInstance = _Notification.Notification.newInstance({
      getContainer: getContainer,
      component: _Message.default,
      transitionName: 'message'
    });
  }

  messageInstance.notice({
    key: key,
    state: state,
    content: content,
    duration: duration,
    onClose: onClose
  });
  return {
    remove: function remove() {
      messageInstance.remove(key);
    }
  };
};

var _default = {
  info: function info(content, duration, onClose) {
    return notice('info', content, duration, onClose);
  },
  success: function success(content, duration, onClose) {
    return notice('success', content, duration, onClose);
  },
  warning: function warning(content, duration, onClose) {
    return notice('warning', content, duration, onClose);
  },
  error: function error(content, duration, onClose) {
    return notice('error', content, duration, onClose);
  },
  loading: function loading(content, duration, onClose) {
    return notice('loading', content, duration, onClose);
  },
  config: function config() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }

    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
  },
  destory: function destory() {
    if (messageInstance) {
      messageInstance.destory();
      messageInstance = null;
    }
  }
};
exports.default = _default;