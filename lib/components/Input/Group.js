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

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var prefixCls = "k-input-group";

var InputGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InputGroup, _Component);

  function InputGroup() {
    (0, _classCallCheck2.default)(this, InputGroup);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InputGroup).apply(this, arguments));
  }

  (0, _createClass2.default)(InputGroup, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var addonBefore = props.addonBefore ? _react.default.createElement("span", {
        className: "".concat(prefixCls, "-addon")
      }, props.addonBefore) : null;
      var addonAfter = props.addonAfter ? _react.default.createElement("span", {
        className: "".concat(prefixCls, "-addon")
      }, props.addonAfter) : null;
      var classes = (0, _kUtils.getClassSet)(props);
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(classes)
      }, addonBefore, props.children, addonAfter);
    }
  }]);
  return InputGroup;
}(_react.Component);

InputGroup.propTypes = {
  addonBefore: _propTypes.default.node,
  addonAfter: _propTypes.default.node
};
InputGroup.defaultProps = {};

var _default = (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], (0, _kUtils.kClass)(prefixCls, InputGroup));

exports.default = _default;