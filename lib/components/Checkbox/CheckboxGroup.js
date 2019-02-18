"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var CheckboxGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CheckboxGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CheckboxGroup).call(this, props));
    _this.handleToggle = _this.handleToggle.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      value: props.value || props.defaultValue || []
    };
    return _this;
  }

  (0, _createClass2.default)(CheckboxGroup, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this$props = this.props,
          name = _this$props.name,
          inline = _this$props.inline,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange;
      var value = this.state.value;
      return {
        checkboxGroup: {
          name: name,
          inline: inline,
          value: value,
          disabled: disabled,
          onChange: this.handleToggle
        }
      };
    }
  }, {
    key: "handleToggle",
    value: function handleToggle(e, option) {
      var onChange = this.props.onChange;
      var optionIndex = this.state.value.indexOf(option.value);
      var value = (0, _toConsumableArray2.default)(this.state.value);

      if (optionIndex === -1) {
        value.push(option.value);
      } else {
        value.splice(optionIndex, 1);
      }

      if (!('value' in this.props)) {
        this.setState({
          value: value
        });
      }

      if (onChange) {
        onChange(value);
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var self = this;
      var ret = [];
      var _this$props2 = this.props,
          options = _this$props2.options,
          name = _this$props2.name,
          inline = _this$props2.inline;
      var value = this.state.value;
      options.forEach(function (option, index) {
        if (typeof option === 'string') {
          ret.push({
            name: name,
            text: option,
            value: option,
            inline: inline,
            checked: value.indexOf(option) != -1
          });
        } else {
          ret.push(option);
        }
      });
      return ret;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value || []
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var options = this.props.options;
      var children = this.props.children;

      if (options && options.length > 0) {
        children = this.getOptions().map(function (option) {
          return _react.default.createElement(_Checkbox.default, {
            name: option.name,
            key: option.value,
            disabled: option.disabled,
            checked: option.checked,
            value: option.value,
            inline: option.inline,
            option: option,
            onChange: _this2.handleToggle
          }, option.text);
        });
      }

      return _react.default.createElement("div", {
        className: "k-checkbox-group"
      }, children);
    }
  }]);
  return CheckboxGroup;
}(_react.Component);

CheckboxGroup.propTypes = {
  name: _propTypes.default.string,
  //选项name
  inline: _propTypes.default.bool,
  //行内模式
  options: _propTypes.default.array,
  //可选项
  value: _propTypes.default.array,
  //选中的选项
  defaultValue: _propTypes.default.array,
  //默认选中项
  onChange: _propTypes.default.func
};
CheckboxGroup.defaultProps = {
  inline: true,
  options: []
};
CheckboxGroup.childContextTypes = {
  checkboxGroup: _propTypes.default.any
};
var _default = CheckboxGroup;
exports.default = _default;