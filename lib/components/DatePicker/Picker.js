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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dateFns = require("date-fns");

var _Input = _interopRequireDefault(require("../Input"));

var _Button = _interopRequireDefault(require("../Button"));

var _dateUtils = require("../../utils/dateUtils");

var _Header = _interopRequireDefault(require("./Header"));

var _Body = _interopRequireDefault(require("./Body"));

var _Footer = _interopRequireDefault(require("./Footer"));

var _YearView = _interopRequireDefault(require("./YearView"));

var _MonthView = _interopRequireDefault(require("./MonthView"));

var _DayView = _interopRequireDefault(require("./DayView"));

var _TimePicker = _interopRequireDefault(require("../TimePicker"));

var prefixCls = "k-datepicker";
var CHANGE_TYPE = {
  year: "year",
  month: "month",
  day: "day",
  week: "week",
  time: "time",
  today: "today",
  confirm: "confirm"
};

var Picker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Picker, _Component);

  function Picker(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Picker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Picker).call(this, props));

    _this.handlePrevYearClick = function (e) {
      var onPrev = _this.props.onPrev;
      var _this$state = _this.state,
          tmpDate = _this$state.tmpDate,
          curView = _this$state.curView;
      var newDate;

      if (curView == 0) {
        newDate = (0, _dateFns.addYears)(tmpDate, -10);
      } else {
        newDate = (0, _dateFns.addYears)(tmpDate, -1);
      }

      _this.setState({
        tmpDate: newDate
      });

      if (onPrev) {
        onPrev("year", newDate);
      }
    };

    _this.handleNextYearClick = function (e) {
      var onNext = _this.props.onNext;
      var _this$state2 = _this.state,
          tmpDate = _this$state2.tmpDate,
          curView = _this$state2.curView;
      var newDate;

      if (curView == 0) {
        newDate = (0, _dateFns.addYears)(tmpDate, 10);
      } else {
        newDate = (0, _dateFns.addYears)(tmpDate, 1);
      }

      _this.setState({
        tmpDate: newDate
      });

      if (onNext) {
        onNext("year", newDate);
      }
    };

    _this.handlePrevMonthClick = function (e) {
      var onPrev = _this.props.onPrev;
      var tmpDate = _this.state.tmpDate;
      var newDate = (0, _dateFns.addMonths)(tmpDate, -1);

      _this.setState({
        tmpDate: newDate
      });

      if (onPrev) {
        onPrev("month", newDate);
      }
    };

    _this.handleNextMonthClick = function (e) {
      var onNext = _this.props.onNext;
      var tmpDate = _this.state.tmpDate;
      var newDate = (0, _dateFns.addMonths)(tmpDate, 1);

      _this.setState({
        tmpDate: newDate
      });

      if (onNext) {
        onNext("month", newDate);
      }
    };

    _this.handleYearClick = function (e) {
      _this.setState({
        curView: 0,
        orgView: _this.state.curView
      });
    };

    _this.handleMonthClick = function (e) {
      _this.setState({
        curView: 1,
        orgView: _this.state.curView
      });
    };

    _this.handleYearSelect = function (year) {
      var _this$state3 = _this.state,
          curView = _this$state3.curView,
          tmpDate = _this$state3.tmpDate,
          orgView = _this$state3.orgView;
      var _this$props = _this.props,
          view = _this$props.view,
          onChange = _this$props.onChange;
      var newDate = (0, _dateFns.setYear)(tmpDate, year);

      _this.setState({
        tmpDate: newDate,
        curView: orgView
      });

      if (view == 0) {
        if (!("value" in _this.props)) {
          _this.setState({
            date: newDate
          });
        }
      }

      if (onChange) {
        onChange({
          type: CHANGE_TYPE.year,
          date: newDate,
          canClose: view == 0
        });
      }
    };

    _this.handleMonthSelect = function (month) {
      var tmpDate = _this.state.tmpDate;
      var _this$props2 = _this.props,
          view = _this$props2.view,
          onChange = _this$props2.onChange;
      var newDate = (0, _dateFns.setMonth)(tmpDate, month);

      _this.setState({
        tmpDate: newDate,
        curView: view
      });

      if (view == 1) {
        if (!("value" in _this.props)) {
          _this.setState({
            date: newDate
          });
        }
      }

      if (onChange) {
        onChange({
          type: CHANGE_TYPE.month,
          date: newDate,
          canClose: view == 1
        });
      }
    };

    _this.handleDaySelect = function (date) {
      var _this$props3 = _this.props,
          view = _this$props3.view,
          onChange = _this$props3.onChange,
          showTime = _this$props3.showTime;
      var rangeDates = _this.state.rangeDates;
      var canSetDate = !rangeDates || rangeDates && rangeDates.length == 0,
          newRangeDates;

      if (_this.state.date) {
        var time = (0, _dateFns.format)(_this.state.date, "HH:mm:ss");
        date = new Date((0, _dateFns.format)(date, "YYYY-MM-DD") + " " + time);
      }

      _this.setRangeDates(date);

      if (canSetDate) {
        _this.setState({
          tmpDate: date
        });
      }

      if (view == 2) {
        if (!("value" in _this.props) && canSetDate) {
          _this.setState({
            date: date
          });
        }
      }

      if (onChange) {
        onChange({
          type: CHANGE_TYPE.day,
          date: date,
          canClose: view == 2 && (!showTime && !rangeDates || rangeDates && rangeDates.length == 2)
        });
      }
    };

    _this.handleWeekSelect = function (date) {
      var _this$props4 = _this.props,
          view = _this$props4.view,
          minDate = _this$props4.minDate,
          maxDate = _this$props4.maxDate,
          onChange = _this$props4.onChange;
      var startDate = date[0],
          endDate = date[6],
          min = minDate ? (0, _dateFns.format)(minDate, "YYYYMMDD") : null,
          max = maxDate ? (0, _dateFns.format)(maxDate, "YYYYMMDD") : null,
          end = (0, _dateFns.format)(endDate, "YYYYMMDD");

      if (min && end < min || max && end > max) {
        return;
      }

      _this.setState({
        tmpDate: startDate
      });

      if (!("value" in _this.props)) {
        _this.setState({
          date: startDate
        });
      }

      if (onChange) {
        onChange({
          type: CHANGE_TYPE.week,
          date: date,
          canClose: true
        });
      }
    };

    _this.handleTimeClick = function () {
      var date = _this.state.date;
      var onChange = _this.props.onChange;

      if (!date) {
        var newDate = new Date();

        _this.setState({
          tmpDate: newDate
        });

        if (!("value" in _this.props)) {
          _this.setState({
            date: newDate
          });
        }

        if (onChange) {
          onChange({
            type: CHANGE_TYPE.time,
            date: newDate,
            canClose: false
          });
        }
      }
    };

    _this.handleTimeOK = function (time) {
      var _this$state4 = _this.state,
          date = _this$state4.date,
          tmpDate = _this$state4.tmpDate;
      var onChange = _this.props.onChange;
      var strDate = (0, _dateFns.format)(tmpDate, "YYYY-MM-DD") + " " + time;
      var newDate = new Date(strDate);

      _this.setState({
        tmpDate: newDate
      });

      if (!("value" in _this.props)) {
        _this.setState({
          date: newDate
        });
      }

      if (onChange) {
        onChange({
          type: CHANGE_TYPE.time,
          date: newDate,
          canClose: false
        });
      }
    };

    _this.handleTodayClick = function (e) {
      var _this$props5 = _this.props,
          value = _this$props5.value,
          onChange = _this$props5.onChange;
      var date = new Date();

      _this.setState({
        date: "value" in _this.props ? value : date,
        tmpDate: date
      });

      if (onChange) {
        onChange({
          type: CHANGE_TYPE.today,
          date: date,
          canClose: true
        });
      }
    };

    _this.handleOKClick = function (e) {
      var date = _this.state.date;
      var _this$props6 = _this.props,
          value = _this$props6.value,
          onChange = _this$props6.onChange;

      if (date) {
        if (onChange) {
          onChange({
            date: date,
            canClose: true
          });
        }
      } else {
        var newDate = new Date();

        _this.setState({
          date: "value" in _this.props ? value : newDate,
          tmpDate: newDate
        });

        if (onChange) {
          onChange({
            type: CHANGE_TYPE.confirm,
            date: newDate,
            canClose: true
          });
        }
      }
    };

    _this.setRangeDates = function (date) {
      var _this$state5 = _this.state,
          range = _this$state5.range,
          rangeDates = _this$state5.rangeDates;
      if (!range || "rangeDates" in _this.props) return;
      var newRangeDates = rangeDates && rangeDates.length < 2 ? (0, _toConsumableArray2.default)(rangeDates) : [];

      if (newRangeDates.length == 0) {
        newRangeDates.push(date);
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

    _this.state = {
      curView: props.view,
      orgView: props.view,
      date: props.defaultValue || props.value,
      tmpDate: props.defaultValue || props.value || new Date(),
      rangeDates: props.rangeDates
    };
    return _this;
  }

  (0, _createClass2.default)(Picker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("value" in nextProps) {
        this.setState({
          date: nextProps.value,
          tmpDate: nextProps.value || new Date()
        });
      }

      if ("rangeDates" in nextProps) {
        this.setState({
          rangeDates: nextProps.rangeDates
        });
      }

      this.setState({
        curView: nextProps.view
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          footerExtra = _this$props7.footerExtra,
          hoverDate = _this$props7.hoverDate,
          minDate = _this$props7.minDate,
          maxDate = _this$props7.maxDate,
          lang = _this$props7.lang,
          okText = _this$props7.okText,
          showToday = _this$props7.showToday,
          showTime = _this$props7.showTime,
          showWeek = _this$props7.showWeek,
          showPrevMonth = _this$props7.showPrevMonth,
          showPrevYear = _this$props7.showPrevYear,
          showNextMonth = _this$props7.showNextMonth,
          showNextYear = _this$props7.showNextYear,
          useRangeDatesIndex = _this$props7.useRangeDatesIndex,
          onDayHover = _this$props7.onDayHover;
      var _this$state6 = this.state,
          tmpDate = _this$state6.tmpDate,
          curView = _this$state6.curView,
          date = _this$state6.date,
          rangeDates = _this$state6.rangeDates;
      var newMinDate = minDate,
          newMaxDate = maxDate,
          dateTime = date,
          dateTimeDisabled = false;

      if (minDate && maxDate && minDate.getTime() > maxDate.getTime()) {
        newMaxDate = minDate();
      }

      if (rangeDates) {
        dateTime = null;
        dateTimeDisabled = true;

        if (rangeDates.length == 2) {
          dateTime = rangeDates[useRangeDatesIndex];
          dateTimeDisabled = false;
        }
      }

      return _react.default.createElement("div", {
        className: prefixCls,
        onClick: this.handlePickerClick
      }, showTime ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-time-header")
      }, _react.default.createElement("div", null, _react.default.createElement(_Input.default, {
        kSize: "sm",
        value: dateTime ? (0, _dateFns.format)(dateTime, "YYYY-MM-DD") : "",
        disabled: dateTimeDisabled,
        onChange: function onChange() {}
      })), _react.default.createElement("div", null, _react.default.createElement(_TimePicker.default, {
        kSize: "sm",
        value: dateTime ? (0, _dateFns.format)(dateTime, "HH:mm:ss") : "",
        disabled: dateTimeDisabled,
        showClearIcon: false,
        onClick: this.handleTimeClick,
        onOK: this.handleTimeOK
      }))) : null, _react.default.createElement(_Header.default, {
        prefixCls: prefixCls,
        date: tmpDate,
        lang: lang,
        view: curView,
        showPrevMonth: showPrevMonth,
        showPrevYear: showPrevYear,
        showNextMonth: showNextMonth,
        showNextYear: showNextYear,
        onPrevYearClick: this.handlePrevYearClick,
        onNextYearClick: this.handleNextYearClick,
        onPrevMonthClick: this.handlePrevMonthClick,
        onNextMonthClick: this.handleNextMonthClick,
        onYearClick: this.handleYearClick,
        onMonthClick: this.handleMonthClick
      }), _react.default.createElement(_Body.default, {
        prefixCls: prefixCls
      }, curView == 0 ? _react.default.createElement(_YearView.default, {
        prefixCls: prefixCls,
        lang: lang,
        view: curView,
        date: tmpDate,
        minDate: newMinDate,
        maxDate: newMaxDate,
        onYearSelect: this.handleYearSelect
      }) : null, curView == 1 ? _react.default.createElement(_MonthView.default, {
        prefixCls: prefixCls,
        lang: lang,
        date: tmpDate,
        minDate: newMinDate,
        maxDate: newMaxDate,
        onMonthSelect: this.handleMonthSelect
      }) : null, curView >= 2 ? _react.default.createElement(_DayView.default, {
        prefixCls: prefixCls,
        lang: lang,
        date: tmpDate,
        hoverDate: hoverDate,
        minDate: newMinDate,
        maxDate: newMaxDate,
        selected: date,
        rangeDates: rangeDates,
        week: showWeek,
        onDaySelect: this.handleDaySelect,
        onDayHover: onDayHover,
        onWeekSelect: this.handleWeekSelect
      }) : null), _react.default.createElement(_Footer.default, {
        prefixCls: prefixCls
      }, curView == 2 && showToday ? _react.default.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, _react.default.createElement("a", {
        className: "".concat(prefixCls, "-today-btn"),
        onClick: this.handleTodayClick
      }, _dateUtils.dates[lang].today)) : null, showTime && !rangeDates ? _react.default.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, _react.default.createElement("a", {
        className: "".concat(prefixCls, "-now-btn"),
        onClick: this.handleTodayClick
      }, _dateUtils.dates[lang].now), _react.default.createElement(_Button.default, {
        raised: true,
        kSize: "sm",
        kStyle: "primary",
        onClick: this.handleOKClick
      }, okText)) : null, footerExtra));
    }
  }]);
  return Picker;
}(_react.Component);

Picker.propTypes = {
  disabled: _propTypes.default.bool,
  defaultValue: _propTypes.default.object,
  footerExtra: _propTypes.default.node,
  format: _propTypes.default.string,
  lang: _propTypes.default.string,
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  okText: _propTypes.default.string,
  range: _propTypes.default.bool,
  rangeDates: _propTypes.default.array,
  showPrevYear: _propTypes.default.bool,
  showPrevMonth: _propTypes.default.bool,
  showNextYear: _propTypes.default.bool,
  showNextMonth: _propTypes.default.bool,
  showToday: _propTypes.default.bool,
  showTime: _propTypes.default.bool,
  showWeek: _propTypes.default.bool,
  useRangeDatesIndex: _propTypes.default.number,
  value: _propTypes.default.object,
  view: _propTypes.default.oneOf([0, 1, 2]),
  //0:年，1:月，2:日
  onChange: _propTypes.default.func,
  onPrev: _propTypes.default.func,
  onNext: _propTypes.default.func
};
Picker.defaultProps = {
  disabled: false,
  format: "YYYY-MM-DD",
  lang: "zh-cn",
  okText: "确定",
  rnage: false,
  showPrevYear: true,
  showPrevMonth: true,
  showNextYear: true,
  showNextMonth: true,
  showToday: false,
  showTime: false,
  showWeek: false,
  useRangeDatesIndex: 0,
  view: 2
};
var _default = Picker;
exports.default = _default;