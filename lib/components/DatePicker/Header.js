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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dateFns = require("date-fns");

var _Icon = _interopRequireDefault(require("../Icon"));

var _kUtils = require("../../utils/kUtils");

var _dateUtils = require("../../utils/dateUtils");

var Header =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Header, _Component);

  function Header() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Header);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Header)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    _this.handlePrevYearClick = function (e) {
      var onPrevYearClick = _this.props.onPrevYearClick;

      if (onPrevYearClick) {
        onPrevYearClick();
      }
    };

    _this.handleNextYearClick = function (e) {
      var onNextYearClick = _this.props.onNextYearClick;

      if (onNextYearClick) {
        onNextYearClick();
      }
    };

    _this.handlePrevMonthClick = function (e) {
      var onPrevMonthClick = _this.props.onPrevMonthClick;

      if (onPrevMonthClick) {
        onPrevMonthClick();
      }
    };

    _this.handleNextMonthClick = function (e) {
      var onNextMonthClick = _this.props.onNextMonthClick;

      if (onNextMonthClick) {
        onNextMonthClick();
      }
    };

    _this.handleYearClick = function (e) {
      var onYearClick = _this.props.onYearClick;

      if (onYearClick) {
        onYearClick();
      }
    };

    _this.handleMonthClick = function (e) {
      var onMonthClick = _this.props.onMonthClick;

      if (onMonthClick) {
        onMonthClick();
      }
    };

    return _this;
  }

  (0, _createClass2.default)(Header, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          date = _this$props.date,
          lang = _this$props.lang,
          view = _this$props.view,
          showPrevYear = _this$props.showPrevYear,
          showPrevMonth = _this$props.showPrevMonth,
          showNextMonth = _this$props.showNextMonth,
          showNextYear = _this$props.showNextYear;
      var year = date.getFullYear(),
          num = year.toString().substr(3),
          start = year - num,
          end = start + 9;
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-header"),
        onClick: this.handleClick
      }, showPrevYear ? _react.default.createElement("a", {
        onClick: this.handlePrevYearClick
      }, _react.default.createElement(_Icon.default, {
        type: "double-left",
        className: "".concat(prefixCls, "-prev-button")
      })) : null, view >= 2 && showPrevMonth ? _react.default.createElement("a", {
        onClick: this.handlePrevMonthClick
      }, _react.default.createElement(_Icon.default, {
        type: "left",
        className: "".concat(prefixCls, "-prev-button")
      })) : null, _react.default.createElement("span", {
        className: "".concat(prefixCls, "-header-select")
      }, _react.default.createElement("span", {
        className: "".concat(prefixCls, "-header-select-year")
      }, _react.default.createElement("a", {
        onClick: this.handleYearClick
      }, view >= 1 ? year : "".concat(start, "-").concat(end), lang == "zh-cn" && view >= 1 ? "年" : "")), view >= 2 ? _react.default.createElement("span", {
        className: "".concat(prefixCls, "-header-select-month")
      }, _react.default.createElement("a", {
        onClick: this.handleMonthClick
      }, lang == "zh-cn" ? "".concat(date.getMonth() + 1, "\u6708") : (0, _dateFns.format)(date, "MMMM"))) : null), view >= 2 && showNextMonth ? _react.default.createElement("a", {
        onClick: this.handleNextMonthClick
      }, _react.default.createElement(_Icon.default, {
        type: "right",
        className: "".concat(prefixCls, "-next-button")
      })) : null, showNextYear ? _react.default.createElement("a", {
        onClick: this.handleNextYearClick
      }, _react.default.createElement(_Icon.default, {
        type: "double-right",
        className: "".concat(prefixCls, "-next-button")
      })) : null);
    }
  }]);
  return Header;
}(_react.Component);

Header.propTypes = {
  date: _propTypes.default.object,
  lang: _propTypes.default.string,
  view: _propTypes.default.number,
  showPrevYear: _propTypes.default.bool,
  showPrevMonth: _propTypes.default.bool,
  showNextYear: _propTypes.default.bool,
  showNextMonth: _propTypes.default.bool,
  onPrevYearClick: _propTypes.default.func,
  onNextYearClick: _propTypes.default.func,
  onPrevMonthClick: _propTypes.default.func,
  onNextMonthClick: _propTypes.default.func,
  onYearClick: _propTypes.default.func,
  onMonthClick: _propTypes.default.func
};
Header.defaultProps = {
  date: new Date(),
  lang: "zh-cn",
  view: 2,
  showPrevYear: true,
  showPrevMonth: true,
  showNextYear: true,
  showNextMonth: true
};
var _default = Header;
exports.default = _default;