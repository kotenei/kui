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

var _getPrototypeOf4 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dateFns = require("date-fns");

var _dateUtils = require("../../utils/dateUtils");

var Cell =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Cell, _Component);

  function Cell() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Cell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(Cell)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {};

    _this.handleClick = function () {
      var _this$props = _this.props,
          date = _this$props.date,
          onClick = _this$props.onClick;

      if (onClick) {
        onClick(date);
      }
    };

    _this.handleMouseEnter = function (e) {
      var _this$props2 = _this.props,
          date = _this$props2.date,
          onCellHover = _this$props2.onCellHover,
          hoverDate = _this$props2.hoverDate;

      if (onCellHover) {
        onCellHover("enter", date);
      }
    };

    _this.handleMouseLeave = function (e) {
      var _this$props3 = _this.props,
          date = _this$props3.date,
          onCellHover = _this$props3.onCellHover;

      if (onCellHover) {
        onCellHover("leave", date);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(Cell, [{
    key: "inRange",
    value: function inRange(date) {
      var _this$props4 = this.props,
          rangeDates = _this$props4.rangeDates,
          hoverDate = _this$props4.hoverDate;
      var formatStr = "YYYYMMDD",
          curDate = (0, _dateFns.format)(date, formatStr),
          startDate,
          endDate,
          hDate;

      if (!rangeDates || rangeDates.length == 0) {
        return false;
      }

      startDate = (0, _dateFns.format)(rangeDates[0], formatStr);

      if (rangeDates[1]) {
        endDate = (0, _dateFns.format)([rangeDates[1]], formatStr);
        return curDate > startDate && curDate < endDate;
      } else if (hoverDate) {
        hDate = (0, _dateFns.format)(hoverDate, formatStr);

        if (hDate > startDate) {
          return curDate > startDate && curDate < hDate;
        } else if (hDate < startDate) {
          return curDate > hDate && curDate < startDate;
        } else {
          return false;
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          className = _this$props5.className,
          value = _this$props5.value,
          date = _this$props5.date,
          selected = _this$props5.selected,
          hoverDate = _this$props5.hoverDate,
          week = _this$props5.week,
          rangeDates = _this$props5.rangeDates,
          onCellHover = _this$props5.onCellHover;
      var formatStr = "YYYYMMDD",
          now = (0, _dateFns.format)(new Date(), formatStr),
          curDate = (0, _dateFns.format)(date, formatStr),
          isCur = curDate == now,
          strClassName = (0, _classnames.default)(className, {
        curDay: isCur
      }),
          isActive,
          inRange;

      if (rangeDates) {
        if (rangeDates.length > 0) {
          rangeDates.forEach(function (rangeDate) {
            if (curDate === (0, _dateFns.format)(rangeDate, formatStr)) {
              isActive = true;
            }
          });
        }
      } else {
        isActive = selected && curDate == (0, _dateFns.format)(selected, formatStr);
      }

      inRange = this.inRange(date);
      strClassName = (0, _classnames.default)(strClassName, {
        active: isActive || rangeDates && rangeDates.length == 1 && curDate == (0, _dateFns.format)(hoverDate, formatStr)
      });
      return _react.default.createElement("td", {
        className: (0, _classnames.default)({
          inRange: inRange
        }),
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, week ? _react.default.createElement("span", {
        className: strClassName
      }, value) : _react.default.createElement("a", {
        className: strClassName,
        onClick: this.handleClick
      }, value));
    }
  }]);
  return Cell;
}(_react.Component);

Cell.propTypes = {
  value: _propTypes.default.any,
  date: _propTypes.default.object,
  hoverDate: _propTypes.default.object,
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  selected: _propTypes.default.object,
  rangeDates: _propTypes.default.array,
  week: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onCellHover: _propTypes.default.func
};

var Row =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(Row, _Component2);

  function Row() {
    var _getPrototypeOf3;

    var _this2;

    (0, _classCallCheck2.default)(this, Row);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(Row)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _this2.handleClick = function () {
      var _this2$props = _this2.props,
          onClick = _this2$props.onClick,
          startDate = _this2$props.startDate,
          endDate = _this2$props.endDate,
          date = _this2$props.date;

      if (onClick) {
        onClick(date);
      }
    };

    return _this2;
  }

  (0, _createClass2.default)(Row, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          className = _this$props6.className,
          children = _this$props6.children,
          week = _this$props6.week;
      return _react.default.createElement("tr", {
        className: (0, _classnames.default)(className, {
          "week-row": week
        }),
        onClick: this.handleClick
      }, children);
    }
  }]);
  return Row;
}(_react.Component);

Row.propTypes = {
  week: _propTypes.default.bool,
  date: _propTypes.default.array,
  onClick: _propTypes.default.func
};

var DayView =
/*#__PURE__*/
function (_Component3) {
  (0, _inherits2.default)(DayView, _Component3);

  function DayView(props) {
    var _this3;

    (0, _classCallCheck2.default)(this, DayView);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf4.default)(DayView).call(this, props));

    _this3.handleClick = function (date) {
      var _this3$props = _this3.props,
          onDaySelect = _this3$props.onDaySelect,
          week = _this3$props.week;
      if (week) return;
      var strDate = (0, _dateFns.format)(date, "YYYY-MM-DD") + " " + (0, _dateFns.format)(new Date(), "HH:mm:ss");
      date = new Date(strDate);

      if (onDaySelect) {
        onDaySelect(date);
      }
    };

    _this3.state = {
      daysName: _dateUtils.dates[props.lang].daysMin
    };
    return _this3;
  }

  (0, _createClass2.default)(DayView, [{
    key: "getDisabled",
    value: function getDisabled(date) {
      var _this$props7 = this.props,
          minDate = _this$props7.minDate,
          maxDate = _this$props7.maxDate;
      var min = minDate ? (0, _dateFns.format)(minDate, "YYYYMMDD") : null,
          max = maxDate ? (0, _dateFns.format)(maxDate, "YYYYMMDD") : null,
          cur = (0, _dateFns.format)(date, "YYYYMMDD");
      return min && cur < min || max && cur > max;
    }
  }, {
    key: "renderHead",
    value: function renderHead() {
      var daysName = this.state.daysName;
      var week = this.props.week;
      var items = [];

      if (week) {
        items.push(_react.default.createElement("td", {
          key: "week"
        }));
      }

      daysName.forEach(function (item) {
        items.push(_react.default.createElement("td", {
          key: item
        }, item));
      });
      return items;
    }
  }, {
    key: "renderBody",
    value: function renderBody() {
      var _this$props8 = this.props,
          date = _this$props8.date,
          week = _this$props8.week,
          selected = _this$props8.selected,
          onWeekSelect = _this$props8.onWeekSelect,
          onDayHover = _this$props8.onDayHover,
          rangeDates = _this$props8.rangeDates,
          hoverDate = _this$props8.hoverDate;
      var curDate = new Date(),
          days = (0, _dateFns.getDaysInMonth)(date),
          //当月所有天数
      firstDate = new Date(date.getFullYear(), date.getMonth(), 1),
          dayOfWeek = firstDate.getDay(),
          //当月第一天是星期几
      lastDayOfPrevMonth = (0, _dateFns.lastDayOfMonth)((0, _dateFns.addMonths)(date, -1)).getDate(),
          //上月最后一天
      rows = [],
          cells = [],
          tmpDate = [],
          index = 0,
          disabled,
          start,
          end,
          startDate;

      if (dayOfWeek == 0) {
        start = lastDayOfPrevMonth - 6;
        startDate = (0, _dateFns.addDays)(firstDate, -7);
      } else {
        start = lastDayOfPrevMonth - dayOfWeek + 1;
        startDate = (0, _dateFns.addDays)(firstDate, -dayOfWeek);
      }

      for (var i = start; i <= lastDayOfPrevMonth; i++) {
        disabled = this.getDisabled(startDate);
        cells.push(_react.default.createElement(Cell, {
          className: (0, _classnames.default)("prev", {
            disabled: disabled
          }),
          key: index,
          value: i,
          date: startDate,
          selected: selected,
          week: week,
          onCellHover: onDayHover,
          onClick: !disabled ? this.handleClick : null
        }));
        tmpDate.push(startDate);
        startDate = (0, _dateFns.addDays)(startDate, 1);
        index++;
      }

      for (var _i = 1; _i <= days; _i++) {
        disabled = this.getDisabled(startDate);
        cells.push(_react.default.createElement(Cell, {
          className: (0, _classnames.default)({
            disabled: disabled
          }),
          key: index,
          value: _i,
          date: startDate,
          rangeDates: rangeDates,
          selected: selected,
          week: week,
          hoverDate: hoverDate,
          onCellHover: onDayHover,
          onClick: !disabled ? this.handleClick : null
        }));
        tmpDate.push(startDate);
        startDate = (0, _dateFns.addDays)(startDate, 1);
        index++;
      }

      end = 42 - cells.length;

      for (var _i2 = 1; _i2 <= end; _i2++) {
        disabled = this.getDisabled(startDate);
        cells.push(_react.default.createElement(Cell, {
          className: (0, _classnames.default)("next", {
            disabled: disabled
          }),
          key: index,
          value: _i2,
          date: startDate,
          selected: selected,
          week: week,
          onCellHover: onDayHover,
          onClick: !disabled ? this.handleClick : null
        }));
        tmpDate.push(startDate);
        startDate = (0, _dateFns.addDays)(startDate, 1);
        index++;
      }

      for (var _i3 = 0; _i3 < 6; _i3++) {
        var weekDate = tmpDate.splice(0, 7);
        rows.push(_react.default.createElement(Row, {
          key: _i3,
          className: (0, _classnames.default)({
            active: selected && selected >= weekDate[0] && selected <= weekDate[6]
          }),
          week: week,
          date: weekDate,
          onClick: week ? onWeekSelect : null
        }, week ? _react.default.createElement(Cell, {
          className: "week",
          week: week,
          value: (0, _dateUtils.getWeek)(weekDate[0])
        }) : null, cells.splice(0, 7)));
      }

      return rows;
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.props.prefixCls;
      return _react.default.createElement("table", {
        className: "".concat(prefixCls, "-day-table")
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, this.renderHead())), _react.default.createElement("tbody", null, this.renderBody()));
    }
  }]);
  return DayView;
}(_react.Component);

DayView.propTypes = {
  prefixCls: _propTypes.default.string,
  date: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  hoverDate: _propTypes.default.object,
  selected: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  lang: _propTypes.default.string,
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  rangeDates: _propTypes.default.array,
  week: _propTypes.default.bool,
  onDaySelect: _propTypes.default.func,
  onDayHover: _propTypes.default.func,
  onWeekSelect: _propTypes.default.func
};
DayView.defaultProps = {
  date: new Date(),
  lang: "zh-cn",
  week: false
};
var _default = DayView;
exports.default = _default;