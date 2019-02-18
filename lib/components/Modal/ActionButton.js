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

var _Button = _interopRequireDefault(require("../Button"));

var ActionButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ActionButton, _Component);

  function ActionButton(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ActionButton);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ActionButton).call(this, props));

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          closeModal = _this$props.closeModal;

      if (onClick) {
        var ret = onClick();

        if (ret != false) {
          closeModal();
        }
      } else {
        closeModal();
      }
    };

    _this.state = {
      loading: false
    };
    _this.timeout;
    return _this;
  }

  (0, _createClass2.default)(ActionButton, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          kStyle = _this$props2.kStyle,
          kSize = _this$props2.kSize;
      return _react.default.createElement(_Button.default, {
        raised: true,
        kStyle: kStyle,
        kSize: kSize,
        onClick: this.handleClick
      }, children);
    }
  }]);
  return ActionButton;
}(_react.Component);

ActionButton.propTypes = {
  loading: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  closeModal: _propTypes.default.func
};
ActionButton.defaultProps = {
  closeModal: function closeModal() {}
};
var _default = ActionButton;
exports.default = _default;