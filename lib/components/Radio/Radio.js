"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var Radio =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Radio, _Component);

  function Radio(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Radio);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Radio).call(this, props, context));

    _this.handleClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Radio, [{
    key: "handleChange",
    value: function handleChange(e) {
      var _this$props = this.props,
          onChange = _this$props.onChange,
          option = _this$props.option;

      if (onChange) {
        onChange(e, option);
      }
    }
  }, {
    key: "renderMaterinal",
    value: function renderMaterinal() {
      return _react.default.createElement("span", {
        className: "material"
      }, _react.default.createElement("span", {
        className: "check"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var radioGroup = this.context.radioGroup;
      var radioProps = (0, _objectSpread2.default)({}, this.props);

      if (radioGroup) {
        radioProps.name = radioGroup.name;
        radioProps.inline = radioGroup.inline;
        radioProps.checked = this.props.value == radioGroup.value;
        radioProps.disabled = this.props.disabled || radioGroup.disabled;

        radioProps.onChange = function (e) {
          return radioGroup.onChange(e, {
            text: radioProps.children,
            value: radioProps.value
          });
        };
      }

      var children = radioProps.children,
          inline = radioProps.inline,
          mode = radioProps.mode,
          disabled = radioProps.disabled,
          name = radioProps.name,
          checked = radioProps.checked,
          value = radioProps.value;
      var prefixCls = "k-radio";
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-material"), mode == "material"), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-inline"), inline), (0, _defineProperty2.default)(_classnames, "disabled", disabled), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, _react.default.createElement("label", null, _react.default.createElement("input", {
        type: "radio",
        className: mode == "none" ? "normal" : "",
        name: name,
        disabled: disabled,
        checked: checked,
        value: value,
        onClick: this.handleClick,
        onChange: radioProps.onChange || this.handleChange
      }), mode == "normal" ? this.renderMaterinal() : null, children ? _react.default.createElement("span", {
        className: "content"
      }, children) : null));
    }
  }]);
  return Radio;
}(_react.Component);

Radio.propTypes = {
  option: _propTypes.default.object,
  inline: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  mode: _propTypes.default.oneOf(["none", "normal"]),
  name: _propTypes.default.string,
  value: _propTypes.default.string,
  onChange: _propTypes.default.func
};
Radio.defaultProps = {
  inline: false,
  mode: "normal"
};
Radio.contextTypes = {
  radioGroup: _propTypes.default.any
};
var _default = Radio;
exports.default = _default;