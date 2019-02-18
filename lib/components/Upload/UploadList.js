"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _UploadListItem = _interopRequireDefault(require("./UploadListItem"));

var UploadList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(UploadList, _Component);

  function UploadList() {
    (0, _classCallCheck2.default)(this, UploadList);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UploadList).apply(this, arguments));
  }

  (0, _createClass2.default)(UploadList, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          listType = _this$props.listType,
          children = _this$props.children;
      var prefixCls = "".concat(this.props.prefixCls, "-list");
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(listType), listType != undefined), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, children);
    }
  }]);
  return UploadList;
}(_react.Component);

UploadList.propTypes = {
  listType: _propTypes.default.oneOf(["text", "picture", "picture-card"]),
  prefixCls: _propTypes.default.string,
  onRemove: _propTypes.default.func
};
UploadList.defaultProps = {
  listType: "text",
  prefixCls: "k-upload"
};
var _default = UploadList;
exports.default = _default;