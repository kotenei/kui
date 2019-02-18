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

var Dragger =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Dragger, _Component);

  function Dragger(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Dragger);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dragger).call(this, props));

    _this.handleDragOver = function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onDragOver = _this$props.onDragOver;
      var dragOver = _this.state.dragOver;

      if (dragOver || disabled) {
        return;
      }

      _this.setState({
        dragOver: true
      });

      if (onDragOver) {
        onDragOver(e);
      }
    };

    _this.handleDragLeave = function (e) {
      e.preventDefault();
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          onDragLeave = _this$props2.onDragLeave;
      var dragOver = _this.state.dragOver;

      if (!dragOver || disabled) {
        return;
      }

      _this.setState({
        dragOver: false
      });

      if (onDragLeave) {
        onDragLeave(e);
      }
    };

    _this.handleDrop = function (e) {
      e.preventDefault();
      var onDrop = _this.props.onDrop;

      _this.setState({
        dragOver: false
      });

      if (onDrop) {
        onDrop(e);
      }
    };

    _this.state = {
      dragOver: false
    };
    return _this;
  }

  (0, _createClass2.default)(Dragger, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          children = _this$props3.children;
      var dragOver = this.state.dragOver;
      return _react.default.createElement("div", {
        className: (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "__dragger"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "__dragger--dragover"), dragOver), _classnames)),
        onDragOver: this.handleDragOver,
        onDragLeave: this.handleDragLeave,
        onDrop: this.handleDrop
      }, _react.default.createElement("span", null, children));
    }
  }]);
  return Dragger;
}(_react.Component);

Dragger.propTypes = {
  accept: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  onDragOver: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  onDrop: _propTypes.default.func
};
Dragger.defaultProps = {
  disabled: false,
  prefixCls: "k-upload"
};
var _default = Dragger;
exports.default = _default;