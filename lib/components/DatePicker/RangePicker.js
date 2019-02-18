"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _object = _interopRequireDefault(require("object.pick"));

var _object2 = _interopRequireDefault(require("object.omit"));

var _Picker = _interopRequireDefault(require("./Picker"));

var _Input = _interopRequireDefault(require("../Input"));

var _dateFns = require("date-fns");

var _PopPanel = _interopRequireDefault(require("../PopPanel"));

var _kUtils = require("../../utils/kUtils");

var _dateUtils = require("../../utils/dateUtils");

var _Icon = _interopRequireDefault(require("../Icon"));

var _Button = _interopRequireDefault(require("../Button"));

var prefixCls = "k-rangePicker";

var RangePicker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RangePicker, _Component);

  function RangePicker(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RangePicker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RangePicker).call(this, props));

    _this.handleInputClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      _this.open();
    };

    _this.handleDayHover = function (type, date) {
      var rangeDates = _this.state.rangeDates;

      if (!rangeDates || rangeDates.length == 0) {
        return;
      }

      if (type == "enter") {
        _this.setState({
          hoverDate: date
        });
      } else {
        _this.setState({
          hoverDate: null
        });
      }
    };

    _this.handleClear = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var _this$props = _this.props,
          onClear = _this$props.onClear,
          onChange = _this$props.onChange;

      if (!("value" in _this.props)) {
        _this.setState({
          value: null,
          tmpValue: [new Date(), (0, _dateFns.addMonths)(new Date(), 1)],
          rangeDates: []
        }, function () {
          _this.close();
        });
      } else {
        _this.close();
      }

      if (onClear) {
        onClear();
      }

      if (onChange) {
        onChange();
      }
    };

    _this.handleOKClick = function (e) {
      var onChange = _this.props.onChange;
      var rangeDates = _this.state.rangeDates;

      if (onChange) {
        onChange(rangeDates);
      }

      _this.close();
    };

    _this.changeDate = function (dateInfo, isStartPicker) {
      var _this$props2 = _this.props,
          showTime = _this$props2.showTime,
          onChange = _this$props2.onChange;
      var tmpValue = (0, _toConsumableArray2.default)(_this.state.tmpValue),
          rangeDates;

      switch (dateInfo.type) {
        case "month":
        case "year":
          tmpValue[isStartPicker ? 0 : 1] = dateInfo.date;

          if ((0, _dateUtils.getDiffMonth)(tmpValue[0], tmpValue[1]) <= 0) {
            if (isStartPicker) {
              tmpValue[1] = (0, _dateFns.addMonths)(tmpValue[0], 1);
            } else {
              tmpValue[0] = (0, _dateFns.addMonths)(tmpValue[1], -1);
            }
          }

          break;

        case "time":
          if (_this.state.rangeDates) {
            rangeDates = (0, _toConsumableArray2.default)(_this.state.rangeDates);
            var startDate = rangeDates[0],
                endDate = rangeDates[1];

            if (isStartPicker) {
              rangeDates[0] = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), dateInfo.date.getHours(), dateInfo.date.getMinutes(), dateInfo.date.getSeconds());
            } else {
              rangeDates[1] = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), dateInfo.date.getHours(), dateInfo.date.getMinutes(), dateInfo.date.getSeconds());
            }

            if (rangeDates.length == 2 && rangeDates[0].getTime() > rangeDates[1].getTime()) {
              if (isStartPicker) {
                rangeDates[1] = rangeDates[0];
              } else {
                rangeDates[0] = rangeDates[1];
              }
            }

            _this.setState({
              rangeDates: rangeDates
            });
          }

          break;

        default:
          rangeDates = _this.setRangeDates(dateInfo.date);
          break;
      }

      if (rangeDates && rangeDates.length == 2 && onChange) {
        onChange(rangeDates);
      }

      _this.setState({
        tmpValue: tmpValue
      }, function () {
        _this.setArrow();

        if (rangeDates && rangeDates.length == 2 && !showTime) {
          _this.close();
        }
      });
    };

    _this.setRangeDates = function (date) {
      var rangeDates = _this.state.rangeDates;
      var newRangeDates = (0, _toConsumableArray2.default)(rangeDates);

      if (rangeDates.length == 0 || rangeDates.length == 2) {
        newRangeDates = [date];
      } else {
        if (rangeDates[0].getTime() < date.getTime()) {
          newRangeDates.push(date);
        } else {
          newRangeDates.splice(0, 0, date);
        }
      }

      _this.setState({
        rangeDates: newRangeDates
      });

      return newRangeDates;
    };

    _this.open = function () {
      _this.setState({
        open: true
      });
    };

    _this.close = function () {
      if (!_this.mounted) {
        return;
      }

      var rangeDates = _this.state.rangeDates;

      if ("value" in _this.props) {
        _this.init();
      } else {
        if (!rangeDates || rangeDates.length <= 1) {
          _this.setState({
            rangeDates: _this.state.value || []
          });
        } else {
          var tmpValue = (0, _toConsumableArray2.default)(rangeDates);
          var diff = (0, _dateUtils.getDiffMonth)(rangeDates[0], rangeDates[1]);

          if (diff <= 0) {
            tmpValue[1] = (0, _dateFns.addMonths)(tmpValue[0], 1);
          }

          _this.setState({
            tmpValue: tmpValue,
            value: rangeDates
          }, function () {
            _this.setArrow();
          });
        }
      }

      _this.setState({
        open: false,
        hoverDate: null
      });
    };

    _this.state = {
      open: false,
      hoverDate: null,
      value: null,
      tmpValue: [new Date(), (0, _dateFns.addMonths)(new Date(), 1)],
      rangeDates: [],
      showPrevMonth: true,
      showPrevYear: true,
      showNextMonth: true,
      showNextYear: true
    };
    return _this;
  }

  (0, _createClass2.default)(RangePicker, [{
    key: "setPrevNextDate",
    value: function setPrevNextDate(type, date, isStartPicker, num) {
      var _this2 = this;

      var tmpValue = this.state.tmpValue;
      var newTmpValue = (0, _toConsumableArray2.default)(tmpValue);

      if (isStartPicker) {
        if (type == "year") {
          newTmpValue[0] = (0, _dateFns.addYears)(tmpValue[0], num);
        } else {
          newTmpValue[0] = (0, _dateFns.addMonths)(tmpValue[0], num);
        }
      } else {
        if (type == "year") {
          newTmpValue[1] = (0, _dateFns.addYears)(tmpValue[1], num);
        } else {
          newTmpValue[1] = (0, _dateFns.addMonths)(tmpValue[1], num);
        }
      }

      this.setState({
        tmpValue: newTmpValue
      }, function () {
        _this2.setArrow();
      });
    }
    /**
     * 设置箭头
     */

  }, {
    key: "setArrow",
    value: function setArrow() {
      var _this$state = this.state,
          value = _this$state.value,
          tmpValue = _this$state.tmpValue;
      var startDate = tmpValue[0],
          endDate = tmpValue[1],
          diff = (0, _dateUtils.getDiffMonth)(startDate, endDate);

      if (diff <= 1) {
        this.setState({
          showPrevMonth: false,
          showPrevYear: false,
          showNextMonth: false,
          showNextYear: false
        });
      } else {
        this.setState({
          showPrevMonth: true,
          showPrevYear: true,
          showNextMonth: true,
          showNextYear: true
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value || this.props.defaultValue;
      var tmpValue = [new Date(), (0, _dateFns.addMonths)(new Date(), 1)];

      if (value) {
        value = (0, _toConsumableArray2.default)(value);

        if (value.length === 2) {
          var startDate = value[0],
              endDate = value[1],
              diff = (0, _dateUtils.getDiffMonth)(startDate, endDate);
          tmpValue = [startDate, endDate];

          if (diff <= 0) {
            tmpValue[1] = (0, _dateFns.addMonths)(endDate, 1);
          }
        }
      }

      this.setState({
        value: value,
        tmpValue: tmpValue,
        rangeDates: value || []
      }, function () {
        _this3.setArrow();
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.init();
      document.addEventListener("click", this.close);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("value" in nextProps) {
        this.init(nextProps.value);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      document.removeEventListener("click", this.close);
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames,
          _this4 = this;

      var _this$props3 = this.props,
          separator = _this$props3.separator,
          kSize = _this$props3.kSize,
          format = _this$props3.format,
          showTime = _this$props3.showTime,
          okText = _this$props3.okText,
          startPlaceholder = _this$props3.startPlaceholder,
          endPlaceholder = _this$props3.endPlaceholder,
          onFocus = _this$props3.onFocus,
          onBlur = _this$props3.onBlur;
      var _this$state2 = this.state,
          open = _this$state2.open,
          value = _this$state2.value,
          hoverDate = _this$state2.hoverDate,
          tmpValue = _this$state2.tmpValue,
          rangeDates = _this$state2.rangeDates,
          showPrevMonth = _this$state2.showPrevMonth,
          showPrevYear = _this$state2.showPrevYear,
          showNextMonth = _this$state2.showNextMonth,
          showNextYear = _this$state2.showNextYear;
      var pickerProps = (0, _object.default)(this.props, ["format", "showTime", "minDate", "maxDate"]);
      var tmpStartDate = tmpValue[0],
          tmpEndDate = tmpValue[1];

      var input = _react.default.createElement("div", {
        className: (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "k-form-control", true), (0, _defineProperty2.default)(_classnames, "k-form-control-".concat(kSize), kSize), _classnames)),
        onClick: this.handleInputClick
      }, _react.default.createElement("input", {
        type: "text",
        className: "".concat(prefixCls, "-input"),
        placeholder: startPlaceholder,
        value: value && value[0] ? (0, _dateFns.format)(value[0], format) : "",
        onChange: function onChange() {},
        onFocus: onFocus,
        onBlur: onBlur
      }), _react.default.createElement("span", {
        className: "".concat(prefixCls, "-separator")
      }, separator), _react.default.createElement("input", {
        type: "text",
        className: "".concat(prefixCls, "-input"),
        placeholder: endPlaceholder,
        value: value && value[1] ? (0, _dateFns.format)(value[1], format) : "",
        onChange: function onChange() {},
        onFocus: onFocus,
        onBlur: onBlur
      }), rangeDates && rangeDates.length == 2 ? _react.default.createElement(_Icon.default, {
        className: "".concat(prefixCls, "-icon"),
        style: {
          cursor: "pointer"
        },
        type: "close",
        onClick: this.handleClear
      }) : _react.default.createElement(_Icon.default, {
        className: "".concat(prefixCls, "-icon"),
        type: "calendar"
      }));

      return _react.default.createElement(_PopPanel.default, {
        input: input,
        open: open
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-range-left")
      }, _react.default.createElement(_Picker.default, (0, _extends2.default)({}, pickerProps, {
        range: true,
        rangeDates: rangeDates,
        useRangeDatesIndex: 0,
        value: tmpStartDate,
        hoverDate: hoverDate,
        showNextMonth: showNextMonth,
        showNextYear: showNextYear,
        onDayHover: this.handleDayHover,
        onChange: function onChange(dateInfo) {
          _this4.changeDate(dateInfo, true);
        },
        onPrev: function onPrev(type, date) {
          _this4.setPrevNextDate(type, date, true, -1);
        },
        onNext: function onNext(type, date) {
          _this4.setPrevNextDate(type, date, true, 1);
        }
      }))), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-range-right")
      }, _react.default.createElement(_Picker.default, (0, _extends2.default)({}, pickerProps, {
        range: true,
        rangeDates: rangeDates,
        useRangeDatesIndex: 1,
        value: tmpEndDate,
        hoverDate: hoverDate,
        showPrevMonth: showPrevMonth,
        showPrevYear: showPrevYear,
        onDayHover: this.handleDayHover,
        onChange: function onChange(dateInfo) {
          _this4.changeDate(dateInfo, false);
        },
        onPrev: function onPrev(type, date) {
          _this4.setPrevNextDate(type, date, false, -1);
        },
        onNext: function onNext(type, date) {
          _this4.setPrevNextDate(type, date, false, 1);
        }
      }))), showTime ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-range-footer")
      }, _react.default.createElement(_Button.default, {
        raised: true,
        kSize: "sm",
        kStyle: "primary",
        onClick: this.handleOKClick
      }, okText)) : null);
    }
  }]);
  return RangePicker;
}(_react.Component);

RangePicker.propTypes = {
  defaultValue: _propTypes.default.array,
  endPlaceholder: _propTypes.default.string,
  format: _propTypes.default.string,
  okText: _propTypes.default.string,
  separator: _propTypes.default.string,
  startPlaceholder: _propTypes.default.string,
  value: _propTypes.default.array,
  onClear: _propTypes.default.func,
  onChange: _propTypes.default.func
};
RangePicker.defaultProps = {
  endPlaceholder: "结束日期",
  format: "YYYY-MM-DD",
  okText: "确定",
  separator: "-",
  startPlaceholder: "开始日期"
};
var _default = RangePicker;
exports.default = _default;