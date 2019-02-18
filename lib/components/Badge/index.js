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

var Badge =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Badge, _Component);

  function Badge() {
    (0, _classCallCheck2.default)(this, Badge);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Badge).apply(this, arguments));
  }

  (0, _createClass2.default)(Badge, [{
    key: "renderCount",
    value: function renderCount() {
      var _this$props = this.props,
          count = _this$props.count,
          dot = _this$props.dot,
          overflowCount = _this$props.overflowCount;
      var number = count;

      if (count <= 0 && !dot) {
        return null;
      }

      if (dot) {
        return _react.default.createElement("sup", {
          className: "k-badge-dot"
        });
      }

      if (count > overflowCount) {
        number = overflowCount + '+';
      }

      return _react.default.createElement("sup", {
        className: "k-badge-count"
      }, number);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          count = _this$props2.count,
          children = _this$props2.children;
      var classes = (0, _kUtils.getClassSet)(this.props);

      if (!children) {
        classes['k-badge-not-wrap'] = true;
      }

      return _react.default.createElement("span", {
        className: (0, _classnames.default)(classes)
      }, children, this.renderCount());
    }
  }]);
  return Badge;
}(_react.Component);

Badge.propTypes = {
  count: _propTypes.default.number,
  dot: _propTypes.default.bool,
  overflowCount: _propTypes.default.number
};
Badge.defaultProps = {
  count: 0,
  dot: false,
  overflowCount: 99
};

var styles = _styleMaps.State.values().concat(_styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, (0, _kUtils.kClass)('k-badge', Badge));

exports.default = _default;