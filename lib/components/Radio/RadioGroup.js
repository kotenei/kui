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

var _Radio = _interopRequireDefault(require("./Radio"));

var RadioGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RadioGroup, _Component);

  function RadioGroup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RadioGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RadioGroup).call(this, props));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
    var value;

    if ("value" in props) {
      value = props.value;
    } else if ("defaultValue" in props) {
      value = props.defaultValue;
    } else {
      value = _this.getCheckedValue(props.children);
    }

    _this.state = {
      value: value
    };
    return _this;
  }

  (0, _createClass2.default)(RadioGroup, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        radioGroup: {
          name: this.props.name,
          value: this.state.value,
          disabled: this.props.disabled,
          inline: this.props.inline,
          onChange: this.handleChange
        }
      };
    }
  }, {
    key: "handleChange",
    value: function handleChange(e, option) {
      var onChange = this.props.onChange;
      var value = e.target.value;

      if (!("value" in this.props)) {
        this.setState({
          value: value
        });
      }

      if (onChange) {
        onChange(value);
      }
    }
  }, {
    key: "getCheckedValue",
    value: function getCheckedValue(children) {
      var value = null;
      var matched = false;

      _react.default.Children.forEach(children, function () {
        var radio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : any;

        if (radio && radio.props && radio.props.checked) {
          value = radio.props.value;
          matched = true;
        }
      });

      return matched ? value : undefined;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var self = this;
      var ret = [];
      var _this$props = this.props,
          options = _this$props.options,
          name = _this$props.name,
          inline = _this$props.inline;
      var value = this.state.value;
      options.forEach(function (option, index) {
        if (typeof option === "string") {
          ret.push({
            name: name,
            text: option,
            value: option,
            inline: inline,
            checked: value == option
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
      if ("value" in nextProps) {
        this.setState({
          value: nextProps.value
        });
      } else {
        var checkedValue = getCheckedValue(nextProps.children);

        if (checkedValue) {
          this.setState({
            value: checkedValue
          });
        }
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
          return _react.default.createElement(_Radio.default, {
            name: option.name,
            key: option.value,
            disabled: option.disabled,
            checked: option.checked,
            value: option.value,
            inline: option.inline,
            option: option,
            onChange: _this2.handleChange
          }, option.text);
        });
      }

      return _react.default.createElement("div", {
        className: "k-checkbox-group"
      }, children);
    }
  }]);
  return RadioGroup;
}(_react.Component);

RadioGroup.propTypes = {
  name: _propTypes.default.string,
  inline: _propTypes.default.bool,
  options: _propTypes.default.array,
  value: _propTypes.default.string,
  defaultValue: _propTypes.default.string,
  onChange: _propTypes.default.func
};
RadioGroup.defaultProps = {
  inline: true,
  options: []
};
RadioGroup.childContextTypes = {
  radioGroup: _propTypes.default.any
};
var _default = RadioGroup;
exports.default = _default;