"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _object = _interopRequireDefault(require("object.omit"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactTransitionGroup = require("react-transition-group");

var _utils = require("../../utils");

var Notification =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Notification, _Component);

  function Notification(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Notification);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Notification).call(this, props));
    _this.state = {
      duration: props.duration,
      notices: []
    };
    return _this;
  }

  (0, _createClass2.default)(Notification, [{
    key: "add",
    value: function add(noticeProps) {
      this.setState(function (prevState) {
        var notices = prevState.notices;

        if (!notices.find(function (notice) {
          return notice.key === noticeProps.key;
        })) {
          notices.push(noticeProps);
          return {
            notices: notices,
            duration: noticeProps.duration
          };
        }

        ;
      });
    }
  }, {
    key: "remove",
    value: function remove(key) {
      this.setState(function (prevState) {
        return {
          notices: prevState.notices.filter(function (notice) {
            return notice.key != key;
          })
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          transitionName = _this$props.transitionName,
          Component = _this$props.component,
          className = _this$props.className;
      var _this$state = this.state,
          notices = _this$state.notices,
          duration = _this$state.duration;

      if (!Component) {
        return null;
      }

      var nodes = notices.map(function (notice, i) {
        var onClose = function onClose(key) {
          _this2.remove(key);

          notice.onClose();
        };

        return _react.default.createElement(_reactTransitionGroup.CSSTransition, {
          timeout: duration,
          key: notice.key,
          classNames: transitionName
        }, _react.default.createElement(Component, (0, _extends2.default)({}, notice, {
          onClose: onClose.bind(_this2, notice.key)
        })));
      });
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('k-notification', className),
        style: this.props.style
      }, _react.default.createElement(_reactTransitionGroup.TransitionGroup, null, nodes));
    }
  }]);
  return Notification;
}(_react.Component);

Notification.propTypes = {
  transitionName: _propTypes.default.string,
  component: _propTypes.default.func,
  style: _propTypes.default.object
};
Notification.defaultProps = {
  transitionName: 'fade'
};

Notification.newInstance = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getContainer = options.getContainer;
  var props = (0, _object.default)(options, ['getContainer']);
  var div;

  if (getContainer) {
    div = getContainer();
  } else {
    div = document.createElement('div');
    document.body.appendChild(div);
  }

  var instance = _reactDom.default.render(_react.default.createElement(Notification, props), div);

  return {
    notice: function notice(noticeProps) {
      instance.add(noticeProps);
    },
    remove: function remove(key) {
      instance.remove(key);
    },
    destory: function destory() {
      _reactDom.default.unmountComponentAtNode(div);

      if (!getContainer) {
        document.body.removeChild(div);
      }
    }
  };
};

var _default = Notification;
exports.default = _default;