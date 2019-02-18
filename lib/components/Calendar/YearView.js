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

var _classnames = _interopRequireDefault(require("classnames"));

var _dateUtils = require("../../utils/dateUtils");

var _dateFns = require("date-fns");

var YearView =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(YearView, _Component);

  function YearView() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, YearView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(YearView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function (date) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(date);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(YearView, [{
    key: "renderBody",
    value: function renderBody() {
      var _this2 = this;

      var _this$props = this.props,
          date = _this$props.date,
          data = _this$props.data,
          lang = _this$props.lang,
          prefixCls = _this$props.prefixCls;
      var formatStr = "YYYYMMDD",
          rows = [],
          flag = 0,
          now = new Date();

      for (var i = 0; i < 3; i++) {
        var cells = [];

        var _loop = function _loop(j) {
          var monthText = _dateUtils.dates[lang].months[j],
              start = (0, _dateFns.format)(new Date(date.getFullYear(), j, 1), formatStr),
              end = (0, _dateFns.format)(new Date(date.getFullYear(), j + 1, 0), formatStr),
              number = 0;

          if (data && data.length > 0) {
            data.forEach(function (item) {
              item.datesNumber.forEach(function (num) {
                if (num >= start && num <= end) {
                  number++;
                }
              });
            });
          }

          cells.push(_react.default.createElement("div", {
            className: "".concat(prefixCls, "-year-row-cell"),
            key: j,
            onClick: _this2.handleClick.bind(_this2, new Date(date.getFullYear(), j, 1))
          }, _react.default.createElement("div", {
            className: (0, _classnames.default)({
              month: true,
              active: date.getFullYear() + date.getMonth() == now.getFullYear() + now.getMonth() && date.getMonth() == j
            })
          }, monthText), _react.default.createElement("div", {
            className: "number"
          }, number || "")));
          flag++;

          if (flag % 4 == 0) {
            return "break";
          }
        };

        for (var j = flag; j < _dateUtils.dates[lang].months.length; j++) {
          var _ret = _loop(j);

          if (_ret === "break") break;
        }

        rows.push(_react.default.createElement("div", {
          className: "".concat(prefixCls, "-year-row"),
          key: i
        }, cells));
      }

      return rows;
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.props.prefixCls;
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-year")
      }, this.renderBody());
    }
  }]);
  return YearView;
}(_react.Component);

YearView.propsTypes = {
  prefixCls: _propTypes.default.string,
  date: _propTypes.default.object,
  data: _propTypes.default.array,
  lang: _propTypes.default.string,
  onClick: _propTypes.default.func
};
YearView.defaultProps = {
  prefixCls: "k-calendar",
  date: new Date(),
  lang: "zh-cn"
};
var _default = YearView;
exports.default = _default;