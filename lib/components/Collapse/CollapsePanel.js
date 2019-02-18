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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactTransitionGroup = require("react-transition-group");

var _Icon = _interopRequireDefault(require("../Icon"));

var CollapsePanel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CollapsePanel, _Component);

  function CollapsePanel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, CollapsePanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CollapsePanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          id = _this$props.id,
          index = _this$props.index,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      if (onClick) {
        onClick(e, id);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(CollapsePanel, [{
    key: "renderBody",
    value: function renderBody(isShow) {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          children = _this$props2.children;
      var body = isShow ? _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        timeout: 300,
        classNames: "slide"
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-body")
      }, children)) : null;
      return _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, body);
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames, _classnames2;

      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          activeIds = _this$props3.activeIds,
          id = _this$props3.id,
          children = _this$props3.children,
          header = _this$props3.header,
          disabled = _this$props3.disabled;
      var isShow = activeIds.indexOf(id) != -1;
      var classString = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-item"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-active"), isShow), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, _react.default.createElement("div", {
        className: (0, _classnames3.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-head"), true), (0, _defineProperty2.default)(_classnames2, 'disabled', disabled), _classnames2)),
        onClick: this.handleClick
      }, header, _react.default.createElement(_Icon.default, {
        className: "".concat(prefixCls, "-icon"),
        type: isShow ? 'down' : 'right'
      })), this.renderBody(isShow));
    }
  }]);
  return CollapsePanel;
}(_react.Component);

CollapsePanel.propTypes = {
  index: _propTypes.default.number,
  id: _propTypes.default.string.isRequired,
  header: _propTypes.default.node,
  activeIds: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  onClick: _propTypes.default.func
};
CollapsePanel.defaultProps = {
  activeIds: [],
  disabled: false
};
var _default = CollapsePanel;
exports.default = _default;