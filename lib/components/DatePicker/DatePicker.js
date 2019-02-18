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

var _object = _interopRequireDefault(require("object.omit"));

var _Picker = _interopRequireDefault(require("./Picker"));

var _Input = _interopRequireDefault(require("../Input"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _dateFns = require("date-fns");

var _PopPanel = _interopRequireDefault(require("../PopPanel"));

var _dateUtils = require("../../utils/dateUtils");

var DatePicker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DatePicker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DatePicker).call(this, props));

    _this.handleClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      _this.open();
    };

    _this.handleClear = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var onChange = _this.props.onChange;

      if (!("value" in _this.props)) {
        _this.close();

        _this.setState({
          value: null
        });
      } else {
        _this.close();
      }

      if (onChange) {
        onChange();
      }

      _this.close();
    };

    _this.handleChange = function (dateInfo) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          format = _this$props.format;
      var date = dateInfo.date,
          canClose = dateInfo.canClose;
      var value = Array.isArray(date) ? date[0] : date;

      if (!("value" in _this.props)) {
        _this.setState({
          value: value
        });
      }

      if (onChange) {
        onChange(value);
      }

      if (canClose) {
        _this.close();
      }
    };

    _this.open = function () {
      if (_this.state.open) {
        return;
      }

      _this.setState({
        open: true
      });
    };

    _this.close = function () {
      if (!_this.state.open || !_this.mounted) {
        return;
      }

      _this.setState({
        open: false
      });
    };

    _this.state = {
      open: false,
      value: props.defaultValue || props.value
    };
    return _this;
  }

  (0, _createClass2.default)(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      document.addEventListener("click", this.close);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      document.removeEventListener("click", this.close);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("value" in nextProps) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          kSize = _this$props2.kSize,
          disabled = _this$props2.disabled,
          placeholder = _this$props2.placeholder,
          format = _this$props2.format,
          onFocus = _this$props2.onFocus,
          onBlur = _this$props2.onBlur;
      var _this$state = this.state,
          value = _this$state.value,
          open = _this$state.open;
      var pickerProps = (0, _object.default)(this.props, ["kSize", "placeholder", "range", "rangeDates", "useRangeDatesIndex"]);
      var newFormat = (0, _dateUtils.getWeekFormat)(value, format);

      var input = _react.default.createElement(_Input.default, {
        ref: "input",
        type: "text",
        kSize: kSize,
        disabled: disabled,
        placeholder: placeholder,
        value: value ? (0, _dateFns.format)(value, newFormat) : "",
        suffix: value && !disabled ? _react.default.createElement(_Icon.default, {
          type: "close",
          style: {
            cursor: "pointer"
          },
          onClick: this.handleClear
        }) : _react.default.createElement(_Icon.default, {
          type: "calendar",
          onClick: this.handleClick
        }),
        onChange: function onChange() {},
        onClick: this.handleClick,
        onFocus: onFocus,
        onBlur: onBlur
      });

      return _react.default.createElement(_PopPanel.default, {
        input: input,
        open: open
      }, _react.default.createElement(_Picker.default, (0, _extends2.default)({}, pickerProps, {
        value: value,
        onChange: this.handleChange
      })));
    }
  }]);
  return DatePicker;
}(_react.Component);

DatePicker.propTypes = {
  defaultValue: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  format: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.object,
  onChange: _propTypes.default.func
};
DatePicker.defaultProps = {
  disabled: false,
  format: "YYYY-MM-DD"
};
var _default = DatePicker;
exports.default = _default;