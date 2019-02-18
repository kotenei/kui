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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var iconType = {
  info: "info-circle",
  success: "check-circle",
  warning: "exclamation-circle",
  danger: "close-circle",
  loading: "loading"
};

var Notice =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Notice, _Component);

  function Notice() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Notice);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Notice)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

  (0, _createClass2.default)(Notice, [{
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
          duration = _this$props.duration,
          title = _this$props.title;
      var prefixCls = "k-notice";
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(state), state ? true : false), _classnames));
      var icon = state ? _react.default.createElement(_Icon.default, {
        type: iconType[state],
        theme: iconType[state] == "loading" ? "outline" : "filled"
      }) : null;
      return _react.default.createElement("div", {
        className: classString,
        onMouseEnter: this.clearCloseTimer,
        onMouseLeave: this.startCloseTimer
      }, icon, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-title")
      }, title), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-description")
      }, content)), _react.default.createElement(_Icon.default, {
        type: "close",
        className: "icon-close",
        onClick: this.close
      }));
    }
  }]);
  return Notice;
}(_react.Component);

Notice.propTypes = {
  duration: _propTypes.default.number,
  state: _propTypes.default.oneOf(["info", "success", "warning", "danger", "loading"]),
  title: _propTypes.default.node.isRequired,
  content: _propTypes.default.node.isRequired,
  onClose: _propTypes.default.func
};
Notice.defaultProps = {
  duration: 1500,
  onClose: function onClose() {}
};
var _default = Notice;
exports.default = _default;