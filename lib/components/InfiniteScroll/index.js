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

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var prefixCls = "k-infinitescroll";

var InfiniteScroll =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InfiniteScroll, _Component);

  function InfiniteScroll(props) {
    var _this;

    (0, _classCallCheck2.default)(this, InfiniteScroll);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InfiniteScroll).call(this, props));

    _this.handleScroll = function (e) {
      var _this$props = _this.props,
          distance = _this$props.distance,
          onScrollBottom = _this$props.onScrollBottom;

      var height = _domUtils.default.height(_this.refs.container),
          scrollBottom = height + _this.refs.container.scrollTop,
          watchElmBottom = _this.top + _domUtils.default.height(_this.refs.watch),
          remaining = watchElmBottom - scrollBottom,
          canScroll = remaining <= height * distance;

      if (canScroll) {
        if (onScrollBottom) {
          onScrollBottom();
        }
      }
    };

    _this.top = 0;
    return _this;
  }

  (0, _createClass2.default)(InfiniteScroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.top = _domUtils.default.position(this.refs.watch).top;
      this.handleScroll();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          style = _this$props2.style,
          width = _this$props2.width,
          height = _this$props2.height;
      return _react.default.createElement("div", {
        className: prefixCls,
        style: {
          width: width,
          height: height,
          style: style
        },
        onScroll: this.handleScroll,
        ref: "container"
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-watch"),
        ref: "watch"
      }, children));
    }
  }]);
  return InfiniteScroll;
}(_react.Component);

InfiniteScroll.propTypes = {
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  distance: _propTypes.default.number,
  onScrollBottom: _propTypes.default.func
};
InfiniteScroll.defaultProps = {
  height: 500,
  distance: 0.3
};
var _default = InfiniteScroll;
exports.default = _default;