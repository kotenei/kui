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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Header = _interopRequireDefault(require("./Header"));

var _YearView = _interopRequireDefault(require("./YearView"));

var _MonthView = _interopRequireDefault(require("./MonthView"));

var _DayView = _interopRequireDefault(require("./DayView"));

var _WeekView = _interopRequireDefault(require("./WeekView"));

var _dateFns = require("date-fns");

var _dateUtils = require("../../utils/dateUtils");

var _utils = require("../../utils");

var prefixCls = "k-calendar";

var Calendar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Calendar, _Component);

  function Calendar(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Calendar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Calendar).call(this, props));

    _this.handlePrevNextClick = function (type) {
      var _this$state = _this.state,
          tmpView = _this$state.tmpView,
          date = _this$state.date;
      var newDate = date,
          num = type == "prev" ? -1 : 1;

      switch (tmpView) {
        case 0:
          newDate = (0, _dateFns.addYears)(date, num);
          break;

        case 1:
          newDate = (0, _dateFns.addMonths)(date, num);
          break;

        case 2:
          newDate = (0, _dateFns.addDays)(date, num);
          break;
      }

      _this.setState({
        date: newDate
      });
    };

    _this.handleTodayClick = function () {
      _this.setState({
        date: new Date()
      });
    };

    _this.handleViewClick = function (view) {
      var onChangeView = _this.props.onChangeView;

      if (onChangeView) {
        onChangeView(view);
      }

      if (!("view" in _this.props)) {
        _this.setState({
          tmpView: view
        });
      }
    };

    _this.handleMonthClick = function (date) {
      _this.setState({
        date: date
      });

      if (!("view" in _this.props)) {
        _this.setState({
          tmpView: 1
        });
      }
    };

    _this.handleEventClick = function (event) {
      var onEventClick = _this.props.onEventClick;

      if (onEventClick) {
        onEventClick(event);
      }
    };

    _this.state = {
      date: new Date(),
      tmpView: props.view || props.defaultView,
      tmpData: null
    };
    return _this;
  }

  (0, _createClass2.default)(Calendar, [{
    key: "init",
    value: function init(props) {
      var _ref = props || this.props,
          data = _ref.data;

      if (data && data.length > 0) {
        var formatStr = "YYYYMMDD",
            tmpData = (0, _utils.deepClone)(data),
            days;
        tmpData.sort(function (a, b) {
          var diff = a.start.replace(/-/g, "") - b.start.replace(/-/g, "");

          if (diff == 0) {
            return b.end.replace(/-/g, "") - a.end.replace(/-/g, "");
          }

          return diff;
        });
        tmpData.forEach(function (item) {
          item.startDate = new Date(item.start);
          item.endDate = new Date(item.end);
          item.tmpStartDate = new Date(item.startDate.getFullYear(), item.startDate.getMonth(), item.startDate.getDate(), 0, 0, 0);
          item.tmpEndDate = new Date(item.endDate.getFullYear(), item.endDate.getMonth(), item.endDate.getDate(), 0, 0, 0);
          days = (0, _dateUtils.getDiffDay)(item.tmpStartDate, item.endDate);
          item.dates = [item.tmpStartDate];
          item.datesNumber = [(0, _dateFns.format)(item.tmpStartDate, formatStr)];

          if (days > 0) {
            for (var i = 1, d; i <= days; i++) {
              d = (0, _dateFns.addDays)(item.tmpStartDate, i);
              item.dates.push(d);
              item.datesNumber.push((0, _dateFns.format)(d, formatStr));
            }
          }
        });
        this.setState({
          tmpData: tmpData
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.init(nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var lang = this.props.lang;
      var _this$state2 = this.state,
          tmpView = _this$state2.tmpView,
          date = _this$state2.date,
          tmpData = _this$state2.tmpData;
      return _react.default.createElement("div", {
        className: prefixCls
      }, _react.default.createElement(_Header.default, {
        prefixCls: prefixCls,
        view: tmpView,
        date: date,
        onPrevNextClick: this.handlePrevNextClick,
        onTodayClick: this.handleTodayClick,
        onViewClick: this.handleViewClick
      }), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-container")
      }, tmpView == 0 ? _react.default.createElement(_YearView.default, {
        prefixCls: prefixCls,
        date: date,
        data: tmpData,
        onClick: this.handleMonthClick
      }) : null, tmpView == 1 ? _react.default.createElement(_MonthView.default, {
        prefixCls: prefixCls,
        date: date,
        data: tmpData,
        onEventClick: this.handleEventClick
      }) : null));
    }
  }]);
  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  defaultView: _propTypes.default.oneOf([0, 1, 2, 3]),
  view: _propTypes.default.oneOf([0, 1, 2, 3]),
  lang: _propTypes.default.string,
  data: _propTypes.default.array,
  onChangeView: _propTypes.default.func,
  onEventClick: _propTypes.default.func
};
Calendar.defaultProps = {
  lang: "zh-cn",
  defaultView: 1
};
var _default = Calendar;
exports.default = _default;