"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _kUtils = require("../../utils/kUtils");

var _utils = require("../../utils");

var _styleMaps = require("../../utils/styleMaps");

var _Icon = _interopRequireDefault(require("../Icon"));

var _reactTransitionGroup = require("react-transition-group");

var Alert =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Alert, _Component);

  function Alert(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Alert);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Alert).call(this, props));
    _this.handleClose = _this.handleClose.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      closing: false,
      closed: false
    };
    return _this;
  }

  (0, _createClass2.default)(Alert, [{
    key: "handleClose",
    value: function handleClose() {
      var onClose = this.props.onClose;

      if (onClose() == true) {
        this.setState({
          closed: true
        });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.closed == nextState.closed) {
        return false;
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          description = _this$props.description,
          showIcon = _this$props.showIcon,
          closable = _this$props.closable,
          closeText = _this$props.closeText;
      var classes = (0, _kUtils.getClassSet)(this.props);
      var iconType;

      switch (this.props.kStyle) {
        case "info":
          iconType = "info-circle";
          break;

        case "success":
          iconType = "check-circle";
          break;

        case "warning":
          iconType = "exclamation-circle";
          break;

        case "danger":
          iconType = "close-circle";
          break;
      }

      var alert = this.state.closed ? null : _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        key: (0, _utils.guid)(),
        timeout: 300,
        classNames: "fade"
      }, _react.default.createElement("div", {
        className: (0, _classnames.default)(classes)
      }, showIcon && iconType ? _react.default.createElement(_Icon.default, {
        type: iconType,
        className: (0, _classnames.default)({
          "k-alert-icon": true,
          lg: description != null
        }),
        theme: "filled"
      }) : null, _react.default.createElement("div", {
        className: "k-alert-content"
      }, _react.default.createElement("span", {
        className: "k-alert-title"
      }, title), description ? _react.default.createElement("span", {
        className: "k-alert-description"
      }, description) : null, closable && !closeText ? _react.default.createElement(_Icon.default, {
        type: "close",
        className: "k-alert-icon-close",
        onClick: this.handleClose
      }) : null, closeText ? _react.default.createElement("span", {
        className: "k-alert-closetext",
        onClick: this.handleClose
      }, closeText) : null)));
      return _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, alert);
    }
  }]);
  return Alert;
}(_react.Component);

Alert.propTypes = {
  showIcon: _propTypes.default.bool,
  closeText: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  closable: _propTypes.default.bool,
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  onClose: _propTypes.default.func
};
Alert.defaultProps = {
  showIcon: false,
  closable: false,
  onClose: function onClose() {
    return true;
  }
};

var styles = _styleMaps.State.values().concat(_styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, _styleMaps.State.INFO, (0, _kUtils.kClass)("k-alert", Alert));

exports.default = _default;