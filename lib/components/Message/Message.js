"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var iconType = {
  info: "info-circle",
  success: "check-circle",
  warning: "exclamation-circle",
  error: "close-circle",
  loading: "loading"
};

var Message =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Message, _Component);

  function Message(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Message);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Message).call(this, props));

    _this.clearCloseTimer = function () {
      if (_this.timer) {
        clearTimeout(_this.timer);
        _this.timer = null;
      }
    };

    _this.startCloseTimer = function () {
      if (_this.props.duration) {
        _this.timer = setTimeout(function () {
          _this.close();
        }, _this.props.duration);
      }
    };

    _this.close = function () {
      _this.clearCloseTimer();

      _this.props.onClose();
    };

    return _this;
  }

  (0, _createClass2.default)(Message, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startCloseTimer();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearCloseTimer();
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          state = _this$props.state,
          content = _this$props.content,
          duration = _this$props.duration;
      var prefixCls = "k-message";
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(state), true), _classnames));
      return _react.default.createElement("div", {
        ref: "message",
        className: classString,
        onMouseEnter: this.clearCloseTimer,
        onMouseLeave: this.startCloseTimer
      }, _react.default.createElement(_Icon.default, {
        type: iconType[state],
        theme: iconType[state] == "loading" ? "outline" : "filled"
      }), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, content));
    }
  }]);
  return Message;
}(_react.Component);

Message.propTypes = {
  state: _propTypes.default.oneOf(["info", "success", "warning", "error", "loading"]),
  content: _propTypes.default.node.isRequired,
  duration: _propTypes.default.number,
  closable: _propTypes.default.bool,
  onClose: _propTypes.default.func
};
Message.defaultProps = {
  state: "info",
  duration: 1500,
  onClose: function onClose() {}
};
var _default = Message;
exports.default = _default;