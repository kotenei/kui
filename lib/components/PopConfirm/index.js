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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _object = _interopRequireDefault(require("object.omit"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Button = _interopRequireDefault(require("../Button"));

var prefixCls = 'k-popconfirm';

var Popconfirm =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Popconfirm, _Component);

  function Popconfirm(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Popconfirm);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Popconfirm).call(this, props));

    _this.handleCancel = function (e) {
      var onCancel = _this.props.onCancel;

      _this.hide();

      if (onCancel) {
        onCancel.call((0, _assertThisInitialized2.default)(_this), e);
      }
    };

    _this.handleConfirm = function (e) {
      var onConfirm = _this.props.onConfirm;

      if (onConfirm && onConfirm.call((0, _assertThisInitialized2.default)(_this), e) != false) {
        _this.hide();
      }

      if (!onConfirm) {
        _this.hide();
      }
    };

    return _this;
  }

  (0, _createClass2.default)(Popconfirm, [{
    key: "hide",
    value: function hide() {
      this.refs.tooltip.hide();
    }
  }, {
    key: "renderPopConfirm",
    value: function renderPopConfirm() {
      var _this$props = this.props,
          title = _this$props.title,
          confirmText = _this$props.confirmText,
          cancelText = _this$props.cancelText;
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-message")
      }, _react.default.createElement(_Icon.default, {
        type: "exclamation-circle",
        kStyle: "warning",
        theme: "filled"
      }), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-message-title")
      }, title)), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-buttons")
      }, _react.default.createElement(_Button.default, {
        raised: true,
        kSize: "sm",
        onClick: this.handleCancel
      }, cancelText), _react.default.createElement(_Button.default, {
        raised: true,
        kStyle: "primary",
        kSize: "sm",
        onClick: this.handleConfirm
      }, confirmText)));
    }
  }, {
    key: "render",
    value: function render() {
      var popConfirm = this.renderPopConfirm();
      var otherProps = (0, _object.default)(this.props, ['children', 'title', 'kStyle']);
      return _react.default.createElement(_Tooltip.default, (0, _extends2.default)({
        ref: "tooltip",
        kClass: "k-popover",
        trigger: "click",
        className: prefixCls
      }, otherProps, {
        title: popConfirm
      }), this.props.children);
    }
  }]);
  return Popconfirm;
}(_react.Component);

Popconfirm.propTypes = {
  title: _propTypes.default.node.isRequired,
  confirmText: _propTypes.default.string,
  cancelText: _propTypes.default.string,
  onConfirm: _propTypes.default.func,
  onCancel: _propTypes.default.func
};
Popconfirm.defaultProps = {
  confirmText: '确定',
  cancelText: '取消'
};
var _default = Popconfirm;
exports.default = _default;