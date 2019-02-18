"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Group = _interopRequireDefault(require("./Group"));

var _TextArea = _interopRequireDefault(require("./TextArea"));

var _object = _interopRequireDefault(require("object.omit"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var Input =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Input, _Component);

  function Input(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Input).call(this, props));
    _this.handleKeyUp = _this.handleKeyUp.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      var _this$props = this.props,
          onPressEnter = _this$props.onPressEnter,
          onKeyUp = _this$props.onKeyUp;

      if (e.keyCode == 13 && onPressEnter) {
        onPressEnter(e);
      }

      if (onKeyUp) {
        onKeyUp(e);
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: "renderLabeledInput",
    value: function renderLabeledInput(children) {
      var props = this.props;

      if (!props.addonBefore && !props.addonAfter) {
        return children;
      }

      return _react.default.createElement(_Group.default, {
        kSize: props.kSize,
        addonBefore: props.addonBefore,
        addonAfter: props.addonAfter
      }, children);
    }
  }, {
    key: "renderLabeledIcon",
    value: function renderLabeledIcon(children) {
      var _classnames;

      var props = this.props;

      if (!("prefix" in props || "suffix" in props)) {
        return children;
      }

      var prefixCls = "k-input";
      var prefix = props.prefix ? _react.default.createElement("span", {
        className: "".concat(prefixCls, "-prefix")
      }, props.prefix) : null;
      var suffix = props.suffix ? _react.default.createElement("span", {
        className: "".concat(prefixCls, "-suffix")
      }, props.suffix) : null;
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-affix-wrapper"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-affix-wrapper-lg"), props.kSize == "lg"), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-affix-wrapper-sm"), props.kSize == "sm"), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, prefix, children, suffix);
    }
  }, {
    key: "renderInput",
    value: function renderInput() {
      var props = this.props;
      var otherProps = (0, _object.default)(props, ["addonBefore", "addonAfter", "prefix", "suffix", "onPressEnter", "className", "kClass", "kSize"]);
      var classes = (0, _kUtils.getClassSet)(props);

      if (otherProps.hasOwnProperty("value") && otherProps.value == undefined) {
        otherProps.value = "";
      }

      return this.renderLabeledIcon(_react.default.createElement("input", (0, _extends2.default)({
        ref: "input"
      }, otherProps, {
        className: (0, _classnames2.default)(classes, props.className),
        onKeyUp: this.handleKeyUp
      })));
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderLabeledInput(this.renderInput());
    }
  }]);
  return Input;
}(_react.Component);

Input.propTypes = {
  id: _propTypes.default.string,
  name: _propTypes.default.string,
  type: _propTypes.default.string,
  value: _propTypes.default.string,
  defaultValue: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  addonBefore: _propTypes.default.node,
  addonAfter: _propTypes.default.node,
  prefix: _propTypes.default.node,
  suffix: _propTypes.default.node,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onPressEnter: _propTypes.default.func
};
Input.defaultProps = {
  type: "text",
  disabled: false
};

var _default = (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], (0, _kUtils.kClass)("k-form-control", Input));

exports.default = _default;