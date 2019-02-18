"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dateFns = require("date-fns");

var _TimePickerSelect = _interopRequireDefault(require("./TimePickerSelect"));

var _Input = _interopRequireDefault(require("../Input"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Button = _interopRequireDefault(require("../Button"));

var _utils = require("../../utils");

var _reactTransitionGroup = require("react-transition-group");

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var prefixCls = "k-timepicker";
var reg = /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})(\s(pm|am))?$/i;
var seed = 1;
var instances = {};

var TimePicker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TimePicker, _Component);

  function TimePicker(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TimePicker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TimePicker).call(this, props));
    _this.state = {
      value: "",
      open: true,
      left: -999,
      top: -999
    };

    _this.handleClick = function (e) {
      var onClick = _this.props.onClick;
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (!("open" in _this.props)) {
        _this.open();
      }

      if (onClick) {
        onClick(e);
      }
    };

    _this.handleItemClick = function (type, val, index) {
      _this.change(type, val, index);
    };

    _this.handleItemScroll = function (type, val, index) {
      _this.change(type, val, index);
    };

    _this.handleCancel = function () {
      var _this$props = _this.props,
          onCancel = _this$props.onCancel,
          onChange = _this$props.onChange;
      var value = _this.state.value;
      _this.tmpValue = value || "00:00:00";

      if (onCancel) {
        onCancel();
      }

      if (!("open" in _this.props)) {
        _this.close();
      }
    };

    _this.handleOK = function () {
      var _this$props2 = _this.props,
          onOK = _this$props2.onOK,
          onChange = _this$props2.onChange;
      var value = _this.tmpValue;

      if (!("open" in _this.props)) {
        _this.close();
      }

      if (!("value" in _this.props)) {
        _this.setState({
          value: value
        });
      }

      if (onOK) {
        onOK(value);
      }

      if (onChange && value != _this.state.value) {
        onChange(value);
      }
    };

    _this.handleClear = function () {
      var _this$props3 = _this.props,
          use12Hours = _this$props3.use12Hours,
          disabled = _this$props3.disabled,
          onChange = _this$props3.onChange;

      if (!("value" in _this.props)) {
        _this.tmpValue = "00:00:00";

        if (use12Hours) {
          _this.tmpValue += " am";
        }

        _this.setState({
          value: null
        });
      }

      if (onChange) {
        onChange();
      }
    };

    _this.setPosition = function () {
      if (!_this.mounted) {
        return;
      }

      var position = (0, _utils.getPosition)((0, _objectSpread2.default)({
        trigger: _this.refs.input,
        placement: "bottomLeft"
      }, _this.orgSize));

      _this.setState({
        left: position.left,
        top: position.top + 2
      });
    };

    _this.open = function () {
      var disabled = _this.props.disabled;

      if (disabled || _this.state.open) {
        return;
      }

      _this.setPosition();

      _this.setState({
        open: true
      });

      _this.closeOther();
    };

    _this.close = function () {
      var disabled = _this.props.disabled;

      if (!_this.state.open || !_this.mounted) {
        return;
      }

      _this.setState({
        open: false
      });
    };

    _this.id = "tooltip_".concat(seed++);
    instances[_this.id] = (0, _assertThisInitialized2.default)(_this);
    return _this;
  }

  (0, _createClass2.default)(TimePicker, [{
    key: "change",
    value: function change(type, val, index) {
      var use12Hours = this.props.use12Hours;
      var arrTime = [],
          timeSlot;

      if (this.tmpValue) {
        var match = this.tmpValue.match(reg);
        arrTime.push(match[1], match[3], match[4]);
        timeSlot = match[6];
      }

      switch (type) {
        case "hour":
          arrTime[0] = val;
          break;

        case "minute":
          arrTime[1] = val;
          break;

        case "second":
          arrTime[2] = val;
          break;

        case "timeSlot":
          timeSlot = val;
          break;

        default:
          break;
      }

      this.tmpValue = arrTime.join(":");

      if (use12Hours && timeSlot) {
        this.tmpValue += " " + timeSlot;
      }
    } //定位

  }, {
    key: "isTime",
    //是否时间格式
    value: function isTime(str) {
      var match = str.match(reg);

      if (!match) {
        return false;
      }

      if (match[1] < 0 || match[1] > 24 || match[3] < 0 || match[3] > 59 || match[4] < 0 || match[4] > 59) {
        return false;
      }

      return true;
    } //小时列表项

  }, {
    key: "getHours",
    value: function getHours() {
      var _this$props4 = this.props,
          use12Hours = _this$props4.use12Hours,
          hourStep = _this$props4.hourStep,
          minTime = _this$props4.minTime,
          maxTime = _this$props4.maxTime;
      var data = [],
          min = 0,
          max = use12Hours ? 12 : 23;

      if (minTime && this.isTime(minTime)) {
        min = parseInt(minTime.split(":")[0], 10);
      }

      if (maxTime && this.isTime(maxTime)) {
        max = parseInt(maxTime.split(":")[0], 10);
      }

      for (var i = min; i <= max; i += hourStep) {
        data.push(String(i).padStart(2, "0"));
      }

      return data;
    } //分钟列表项

  }, {
    key: "getMinutes",
    value: function getMinutes() {
      var _this$props5 = this.props,
          minuteStep = _this$props5.minuteStep,
          minTime = _this$props5.minTime,
          maxTime = _this$props5.maxTime;
      var data = [],
          min = 0,
          max = 59;

      if (minTime && this.isTime(minTime)) {
        min = parseInt(minTime.split(":")[1], 10);
      }

      if (maxTime && this.isTime(maxTime)) {
        max = parseInt(maxTime.split(":")[1], 10);
      }

      for (var i = min; i <= max; i += minuteStep) {
        data.push(String(i).padStart(2, "0"));
      }

      return data;
    } //秒列表项

  }, {
    key: "getSeconds",
    value: function getSeconds() {
      var _this$props6 = this.props,
          secondStep = _this$props6.secondStep,
          minTime = _this$props6.minTime,
          maxTime = _this$props6.maxTime;
      var data = [],
          min = 0,
          max = 59;

      if (minTime && this.isTime(minTime)) {
        min = parseInt(minTime.split(":")[2], 10);
      }

      if (maxTime && this.isTime(maxTime)) {
        max = parseInt(maxTime.split(":")[2], 10);
      }

      for (var i = min; i <= max; i += secondStep) {
        data.push(String(i).padStart(2, "0"));
      }

      return data;
    } //打开

  }, {
    key: "closeOther",
    value: function closeOther() {
      for (var k in instances) {
        if (k == this.id) {
          continue;
        }

        instances[k].close();
      }
    }
  }, {
    key: "init",
    value: function init() {
      var value = this.props.value || this.props.defaultValue;
      this.tmpValue = "00:00:00";

      if (this.props.use12Hours) {
        this.tmpValue += " am";
      }

      if (value && this.isTime(value)) {
        this.tmpValue = value;
        this.setState({
          value: value
        });
      }

      this.orgSize = {
        width: _domUtils.default.width(this.refs.picker),
        height: _domUtils.default.height(this.refs.picker)
      };
      this.close();

      if (this.props.open === true) {
        this.open();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.init();
      document.addEventListener("click", this.close);
      window.addEventListener("resize", this.setPosition);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("open" in nextProps) {
        if (nextProps.open) {
          this.open();
        } else {
          this.close();
        }
      }

      if ("value" in nextProps) {
        var value = nextProps.value && this.isTime(nextProps.value) ? nextProps.value : "";
        this.tmpValue = value || "00:00:00";
        this.setState({
          value: value
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("click", this.close);
      window.removeEventListener("resize", this.setPosition);
      delete instances[this.id];
      this.mounted = false;
    }
  }, {
    key: "renderPicker",
    value: function renderPicker() {
      var _this$props7 = this.props,
          cancelText = _this$props7.cancelText,
          okText = _this$props7.okText,
          use12Hours = _this$props7.use12Hours;
      var _this$state = this.state,
          left = _this$state.left,
          top = _this$state.top,
          value = _this$state.value,
          open = _this$state.open;
      var arrTime = [],
          hour,
          minute,
          second,
          timeSlot;

      if (value) {
        var match = value.match(reg);
        hour = match[1];
        minute = match[3];
        second = match[4];
        timeSlot = match[6];
      }

      var picker = open ? _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        timeout: 300,
        classNames: "slide-down"
      }, _react.default.createElement("div", {
        className: prefixCls,
        style: {
          left: left,
          top: top
        },
        ref: "picker",
        onClick: function onClick(e) {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-wrapper")
      }, _react.default.createElement(_TimePickerSelect.default, {
        prefixCls: prefixCls,
        data: this.getHours(),
        value: hour,
        type: "hour",
        onItemClick: this.handleItemClick,
        onScroll: this.handleItemScroll
      }), _react.default.createElement(_TimePickerSelect.default, {
        prefixCls: prefixCls,
        data: this.getMinutes(),
        value: minute,
        type: "minute",
        onItemClick: this.handleItemClick,
        onScroll: this.handleItemScroll
      }), _react.default.createElement(_TimePickerSelect.default, {
        prefixCls: prefixCls,
        data: this.getSeconds(),
        value: second,
        type: "second",
        onItemClick: this.handleItemClick,
        onScroll: this.handleItemScroll
      }), use12Hours ? _react.default.createElement(_TimePickerSelect.default, {
        prefixCls: prefixCls,
        data: ["am", "pm"],
        type: "timeSlot",
        value: timeSlot,
        onItemClick: this.handleItemClick,
        onScroll: this.handleItemScroll
      }) : null), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-bottom")
      }, _react.default.createElement(_Button.default, {
        raised: true,
        kSize: "sm",
        style: {
          marginRight: 10
        },
        onClick: this.handleCancel
      }, cancelText), _react.default.createElement(_Button.default, {
        raised: true,
        kStyle: "primary",
        kSize: "sm",
        onClick: this.handleOK
      }, okText)))) : null;
      return _reactDom.default.createPortal(_react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, picker), document.body);
    }
  }, {
    key: "renderSuffix",
    value: function renderSuffix() {
      var _this$props8 = this.props,
          suffix = _this$props8.suffix,
          showClearIcon = _this$props8.showClearIcon,
          disabled = _this$props8.disabled;
      var _this$state2 = this.state,
          value = _this$state2.value,
          open = _this$state2.open;

      if (value && showClearIcon && !disabled) {
        return _react.default.createElement(_Icon.default, {
          type: "close",
          onClick: this.handleClear,
          style: {
            cursor: "pointer"
          }
        });
      }

      return _react.default.createElement(_Icon.default, {
        type: "clock-circle"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.value;
      var _this$props9 = this.props,
          kSize = _this$props9.kSize,
          disabled = _this$props9.disabled,
          placeholder = _this$props9.placeholder,
          onClick = _this$props9.onClick,
          onFocus = _this$props9.onFocus,
          onBlur = _this$props9.onBlur;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Input.default, {
        type: "text",
        ref: "input",
        kSize: kSize,
        disabled: disabled,
        value: value,
        placeholder: placeholder,
        onClick: this.handleClick,
        suffix: this.renderSuffix(),
        onChange: function onChange() {},
        onFocus: onFocus,
        onBlur: onBlur
      }), this.renderPicker());
    }
  }]);
  return TimePicker;
}(_react.Component);

TimePicker.propTypes = {
  cancelText: _propTypes.default.string,
  okText: _propTypes.default.string,
  defaultValue: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  hourStep: _propTypes.default.number,
  minuteStep: _propTypes.default.number,
  minTime: _propTypes.default.string,
  maxTime: _propTypes.default.string,
  secondStep: _propTypes.default.number,
  open: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  showClearIcon: _propTypes.default.bool,
  use12Hours: _propTypes.default.bool,
  value: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  onOK: _propTypes.default.func
};
TimePicker.defaultProps = {
  cancelText: "取消",
  okText: "确定",
  format: "HH:mm:ss",
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  showClearIcon: true,
  use12Hours: false
};
var _default = TimePicker;
exports.default = _default;