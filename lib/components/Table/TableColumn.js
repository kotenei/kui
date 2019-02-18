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

var _utils = require("../../utils");

var TableColumn =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TableColumn, _Component);

  function TableColumn() {
    (0, _classCallCheck2.default)(this, TableColumn);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TableColumn).apply(this, arguments));
  }

  (0, _createClass2.default)(TableColumn, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return TableColumn;
}(_react.Component);

TableColumn.displayName = "TableColumn";
TableColumn.propTypes = {
  align: _propTypes.default.oneOf(["left", "right", "center"]),
  dataIndex: _propTypes.default.string,
  // defaultSortOrder: PropTypes.oneOf(["asc", "desc"]),
  // filterDropdown: PropTypes.func,
  filterIcon: _propTypes.default.func,
  filterMultiple: _propTypes.default.bool,
  filters: _propTypes.default.arrayOf(_propTypes.default.object),
  fixed: _propTypes.default.oneOf(["left", "right", true]),
  // id: PropTypes.string,
  render: _propTypes.default.func,
  sorter: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  // sortOrder: PropTypes.oneOf(["asc", "desc", false]),
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  width: _propTypes.default.number,
  onFilter: _propTypes.default.func // onSort: PropTypes.func

};
TableColumn.defaultProps = {
  filterMultiple: true
};
var _default = TableColumn;
exports.default = _default;