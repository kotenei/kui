"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Notification", {
  enumerable: true,
  get: function get() {
    return _Notification2.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utils = require("../../utils");

var _Notice = _interopRequireDefault(require("./Notice"));

var _Notification2 = _interopRequireDefault(require("./Notification"));

var defaultDuration = 1500;
var placement = 'topRight';
var noticeInstance;
var getContainer;
var prefixCls = 'k-notification';

var notice = function notice(state, title, content) {
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultDuration;
  var onClose = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

  if (!title || !content) {
    return null;
  }

  var key = (0, _utils.guid)();

  if (typeof duration === 'function') {
    onClose = duration;
    duration = defaultDuration;
  }

  if (!noticeInstance) {
    noticeInstance = _Notification2.default.newInstance({
      getContainer: getContainer,
      component: _Notice.default,
      transitionName: 'notice',
      className: "".concat(prefixCls, "-").concat(placement)
    });
  }

  noticeInstance.notice({
    key: key,
    state: state,
    title: title,
    content: content,
    duration: duration,
    onClose: onClose
  });
  return {
    remove: function remove() {
      noticeInstance.remove(key);
    }
  };
};

var _default = {
  open: function open(title, content, duration, onClose) {
    return notice(null, title, content, duration, onClose);
  },
  info: function info(title, content, duration, onClose) {
    return notice('info', title, content, duration, onClose);
  },
  success: function success(title, content, duration, onClose) {
    return notice('success', title, content, duration, onClose);
  },
  waring: function waring(title, content, duration, onClose) {
    return notice('warning', title, content, duration, onClose);
  },
  error: function error(title, content, duration, onClose) {
    return notice('danger', title, content, duration, onClose);
  },
  config: function config() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
  destory: function destory() {
    if (noticeInstance) {
      noticeInstance.destory();
      noticeInstance = null;
    }
  }
};
exports.default = _default;