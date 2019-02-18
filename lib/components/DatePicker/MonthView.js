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

var _classnames = _interopRequireDefault(require("classnames"));

var _dateUtils = require("../../utils/dateUtils");

var _dateFns = require("date-fns");

var MonthView =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MonthView, _Component);

  function MonthView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MonthView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MonthView).call(this, props));

    _this.handleMonthClick = function (e) {
      var target = e.target;
      var onMonthSelect = _this.props.onMonthSelect;
      var month = target.getAttribute("data-month");

      if (onMonthSelect) {
        onMonthSelect(month);
      }
    };

    _this.state = {
      months: _dateUtils.dates[props.lang].monthsShort
    };
    return _this;
  }

  (0, _createClass2.default)(MonthView, [{
    key: "renderRows",
    value: function renderRows() {
      var _this$props = this.props,
          date = _this$props.date,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate;
      var months = this.state.months;
      var rows = [],
          year = date.getFullYear(),
          month = date.getMonth(),
          flag = 0,
          min = minDate ? (0, _dateFns.format)(minDate, "YYYYMM") : null,
          max = maxDate ? (0, _dateFns.format)(maxDate, "YYYYMM") : null,
          disabled;

      for (var i = 0; i < 3; i++) {
        var cells = [];

        for (var j = flag, num; j < months.length; j++) {
          disabled = false;
          num = year + (j + 1).toString().padStart(2, "0");

          if (min && num < min || max && num > max) {
            disabled = true;
          }

          cells.push(_react.default.createElement("td", {
            key: "cell_".concat(j)
          }, _react.default.createElement("a", {
            "data-month": j,
            className: (0, _classnames.default)({
              active: month == j,
              disabled: disabled
            }),
            onClick: !disabled ? this.handleMonthClick : null
          }, months[j])));
          flag++;

          if ((j + 1) % 4 == 0) {
            break;
          }
        }

        rows.push(_react.default.createElement("tr", {
          key: "row_".concat(i)
        }, cells));
      }

      return rows;
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.props.prefixCls;
      return _react.default.createElement("table", {
        className: "".concat(prefixCls, "-month-table")
      }, _react.default.createElement("tbody", null, this.renderRows()));
    }
  }]);
  return MonthView;
}(_react.Component);

MonthView.propTypes = {
  prefixCls: _propTypes.default.string,
  lang: _propTypes.default.string,
  date: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  onMonthSelect: _propTypes.default.func
};
MonthView.defaultProps = {
  prefixCls: "k-datepicker",
  lang: "zh-cn",
  date: new Date()
};
var _default = MonthView;
exports.default = _default;