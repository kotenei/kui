"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _utils = require("../../utils");

var SliderHandler =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SliderHandler, _Component);

  function SliderHandler(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SliderHandler);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SliderHandler).call(this, props));

    _this.handleMouseDown = function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();

      _this.start(e); //禁止文档选择事件


      document.onselectstart = function () {
        return false;
      };

      return false;
    };

    _this.handleMouseMove = function (e) {
      _this.move(e);

      return false;
    };

    _this.handleMouseUp = function (e) {
      _this.stop(e);

      document.removeEventListener("mousemove", _this.handleMouseMove);
      document.removeEventListener("mouseup", _this.handleMouseUp);
      return false;
    };

    _this.handleMouseEnter = function () {
      var _this$props = _this.props,
          onMouseEnter = _this$props.onMouseEnter,
          value = _this$props.value;

      if (onMouseEnter) {
        onMouseEnter(value);
      }
    };

    _this.handleMouseLeave = function () {
      var _this$props2 = _this.props,
          onMouseLeave = _this$props2.onMouseLeave,
          value = _this$props2.value;

      if (onMouseLeave) {
        onMouseLeave(value);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(SliderHandler, [{
    key: "start",
    value: function start(e) {
      var target = e.target;
      var onDragStart = this.props.onDragStart;
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);

      if (target.setCapture) {
        target.setCapture();
      }

      if (onDragStart) {
        onDragStart(e);
      }
    }
  }, {
    key: "move",
    value: function move(e) {
      var onChange = this.props.onChange;

      if (onChange) {
        onChange(e);
      }
    }
  }, {
    key: "stop",
    value: function stop(e) {
      var onDragStop = this.props.onDragStop;

      if (onDragStop) {
        onDragStop(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          title = _this$props3.title,
          style = _this$props3.style,
          disabled = _this$props3.disabled,
          showTooltip = _this$props3.showTooltip;
      return _react.default.createElement(_Tooltip.default, {
        title: title,
        ref: "tooltip",
        show: showTooltip,
        style: {
          zIndex: showTooltip ? 2 : 1
        }
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-handle"),
        style: (0, _objectSpread2.default)({}, style, {
          zIndex: showTooltip ? 2 : 1
        }),
        onMouseDown: disabled ? null : this.handleMouseDown,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }));
    }
  }]);
  return SliderHandler;
}(_react.Component);

SliderHandler.propTypes = {
  prefixCls: _propTypes.default.string,
  title: _propTypes.default.node,
  style: _propTypes.default.object,
  vertical: _propTypes.default.bool,
  value: _propTypes.default.number.isRequired,
  showTooltip: _propTypes.default.bool,
  onDragStart: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onDragStop: _propTypes.default.func
};
SliderHandler.defaultProps = {
  prefixCls: "k-slider",
  value: 0
};
var _default = SliderHandler;
exports.default = _default;