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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _object = _interopRequireDefault(require("object.omit"));

var PaginationItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PaginationItem, _Component);

  function PaginationItem(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PaginationItem);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PaginationItem).call(this, props));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(PaginationItem, [{
    key: "handleClick",
    value: function handleClick() {
      var _this$props = this.props,
          num = _this$props.num,
          onClick = _this$props.onClick;
      onClick(num);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          children = _this$props2.children,
          onMouseOver = _this$props2.onMouseOver,
          onMouseLeave = _this$props2.onMouseLeave;
      return _react.default.createElement("li", {
        className: className
      }, _react.default.createElement("a", {
        href: "javascript:void(0);",
        onClick: this.handleClick,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave
      }, children));
    }
  }]);
  return PaginationItem;
}(_react.Component);

PaginationItem.propTypes = {
  num: _propTypes.default.number.isRequired,
  onClick: _propTypes.default.func
};
PaginationItem.defaultProps = {
  onClick: function onClick() {}
};
var _default = PaginationItem;
exports.default = _default;