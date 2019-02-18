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

var _Icon = _interopRequireDefault(require("../Icon"));

var _classnames = _interopRequireDefault(require("classnames"));

var _kUtils = require("../../utils/kUtils");

var _utils = require("../../utils");

var _styleMaps = require("../../utils/styleMaps");

var _reactTransitionGroup = require("react-transition-group");

var Tag =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tag, _Component);

  function Tag(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tag);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tag).call(this, props));
    _this.handleClose = _this.handleClose.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      closed: false
    };
    return _this;
  }

  (0, _createClass2.default)(Tag, [{
    key: "handleClose",
    value: function handleClose(e) {
      var onClose = this.props.onClose;

      if (onClose() == true) {
        this.setState({
          closed: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          closable = _this$props.closable,
          children = _this$props.children,
          color = _this$props.color,
          iconColor = _this$props.iconColor;
      var closed = this.state.closed;
      var classString = (0, _kUtils.getClassSet)(this.props);
      var tag = closed ? null : _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        key: (0, _utils.guid)(),
        timeout: 300,
        classNames: "fade"
      }, _react.default.createElement("div", {
        className: (0, _classnames.default)(classString),
        style: {
          background: color,
          color: color ? "#fff" : null
        }
      }, _react.default.createElement("span", {
        className: "k-tag-text"
      }, children), closable ? _react.default.createElement(_Icon.default, {
        type: "close",
        color: iconColor,
        onClick: this.handleClose
      }) : null));
      return _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, tag);
    }
  }]);
  return Tag;
}(_react.Component);

Tag.propTypes = {
  color: _propTypes.default.string,
  closable: _propTypes.default.bool,
  iconColor: _propTypes.default.string,
  onClose: _propTypes.default.func
};
Tag.defaultProps = {
  closable: false,
  onClose: function onClose() {
    return true;
  }
};

var styles = _styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, _styleMaps.DEFAULT, (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL, _styleMaps.Sizes.XSMALL], (0, _kUtils.kClass)("k-tag", Tag)));

exports.default = _default;