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

var YearView =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(YearView, _Component);

  function YearView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, YearView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(YearView).call(this, props));

    _this.handleYearClick = function (e) {
      var target = e.target;
      var onYearSelect = _this.props.onYearSelect;
      var year = target.getAttribute("year");

      if (onYearSelect) {
        onYearSelect(year);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(YearView, [{
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          date = _this$props.date,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate;
      var rows = [],
          year = date.getFullYear(),
          num = parseInt(year.toString().substr(3)),
          start = year - num,
          flag = 0,
          disabled,
          cells;

      for (var i = 0; i < 3; i++) {
        cells = [];

        for (var j = flag, y; j < 10; j++) {
          y = start + j;
          disabled = false;

          if (minDate && y < minDate.getFullYear() || maxDate && y > maxDate.getFullYear()) {
            disabled = true;
          }

          cells.push(_react.default.createElement("td", {
            key: "cell-".concat(j)
          }, _react.default.createElement("a", {
            year: y,
            className: (0, _classnames.default)({
              active: y == year,
              disabled: disabled
            }),
            onClick: !disabled ? this.handleYearClick : null
          }, y)));
          flag++;

          if ((j + 1) % 4 == 0) {
            break;
          }
        }

        if (i == 2) {
          cells.push(_react.default.createElement("td", {
            key: "cell-empty1-".concat(i)
          }));
          cells.push(_react.default.createElement("td", {
            key: "cell-empty2-".concat(i)
          }));
        }

        rows.push(_react.default.createElement("tr", {
          key: "row-".concat(i)
        }, cells));
      }

      return rows;
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.props.prefixCls;
      return _react.default.createElement("table", {
        className: "".concat(prefixCls, "-year-table")
      }, _react.default.createElement("tbody", null, this.renderContent()));
    }
  }]);
  return YearView;
}(_react.Component);

YearView.propTypes = {
  date: _propTypes.default.object,
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  onYearSelect: _propTypes.default.func
};
YearView.defaultProps = {
  date: new Date()
};
var _default = YearView;
exports.default = _default;