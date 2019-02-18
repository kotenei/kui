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

var _Icon = _interopRequireDefault(require("../Icon"));

var TableSorter =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TableSorter, _Component);

  function TableSorter() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TableSorter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TableSorter)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleSort = function () {
      var _this$props = _this.props,
          sorter = _this$props.sorter,
          column = _this$props.column,
          onSort = _this$props.onSort;
      var newSorter = {
        column: column,
        field: column.dataIndex,
        order: "up"
      };

      if (sorter && sorter.field == column.dataIndex) {
        switch (sorter.order) {
          case "up":
            newSorter.order = "desc";
            break;

          case "desc":
            newSorter = {};
            break;

          default:
            newSorter.order = "asc";
            break;
        }
      }

      if (onSort) {
        onSort(newSorter);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(TableSorter, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          column = _this$props2.column,
          sorter = _this$props2.sorter;
      var upStyle, downStyle;

      if (!column.sorter) {
        return null;
      }

      if (sorter && sorter.field && sorter.field === column.dataIndex) {
        if (sorter.order == "desc") {
          downStyle = "primary";
        } else {
          upStyle = "primary";
        }
      }

      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-sorter"),
        onClick: this.handleSort
      }, _react.default.createElement(_Icon.default, {
        type: "caret-up",
        kStyle: upStyle
      }), _react.default.createElement(_Icon.default, {
        type: "caret-down",
        kStyle: downStyle
      }));
    }
  }]);
  return TableSorter;
}(_react.Component);

TableSorter.propTypes = {
  column: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  sorter: _propTypes.default.object,
  onSort: _propTypes.default.func
};
var _default = TableSorter;
exports.default = _default;