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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

var _utils = require("../../utils");

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var prefixCls = "k-popPanel";
var seed = 1;
var instances = {};

var PopPanel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PopPanel, _Component);

  function PopPanel(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PopPanel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PopPanel).call(this, props));

    _this.handlePanelClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    _this.setPosition = function (position) {
      var _this$props = _this.props,
          placement = _this$props.placement,
          fullWidth = _this$props.fullWidth;
      var width;

      if (fullWidth) {
        width = _domUtils.default.outerWidth(_reactDom.default.findDOMNode(_this.refs.trigger));
        _this.orgSize.width = width;
      }

      position = position || _this.props.position || (0, _utils.getPosition)((0, _objectSpread2.default)({
        trigger: _this.refs.trigger,
        placement: placement
      }, _this.orgSize));

      if (fullWidth) {
        position.width = width;
      }

      _this.setState({
        position: position
      });
    };

    _this.open = function () {
      var onOpen = _this.props.onOpen;

      if (onOpen && onOpen() === false) {
        return;
      }

      _this.setPosition();

      _this.setState({
        open: true
      });

      _this.closeOther();
    };

    _this.close = function () {
      var onClose = _this.props.onClose;

      if (onClose && onClose() === false) {
        return;
      }

      _this.setState({
        open: false
      });
    };

    _this.state = {
      open: true,
      position: props.position || {
        left: -999,
        top: -999
      }
    };
    _this.orgSize = {
      width: 0,
      height: 0
    };
    _this.id = "poppanel_".concat(seed++);
    instances[_this.id] = (0, _assertThisInitialized2.default)(_this);
    return _this;
  }

  (0, _createClass2.default)(PopPanel, [{
    key: "closeOther",

    /**
     * 关闭其它
     */
    value: function closeOther() {
      for (var k in instances) {
        if (k == this.id) {
          continue;
        }

        instances[k].close();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.orgSize = {
        width: _domUtils.default.width(this.refs.panel),
        height: _domUtils.default.height(this.refs.panel)
      };
      this.close();

      if (this.props.open === true) {
        this.open();
      }

      if (!("open" in this.props)) {
        document.addEventListener("click", this.close);
      }

      window.addEventListener("resize", this.setPosition);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.position) {
        this.setPosition(nextProps.position);
      }

      if ("open" in nextProps) {
        if (nextProps.open) {
          this.open();
        } else {
          this.close();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!("open" in this.props)) {
        document.removeEventListener("click", this.close);
      }

      window.removeEventListener("resize", this.setPosition);
      delete instances[this.id];
    }
  }, {
    key: "renderWrapper",
    value: function renderWrapper() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          style = _this$props2.style,
          timeout = _this$props2.timeout,
          transitionName = _this$props2.transitionName;
      var _this$state = this.state,
          open = _this$state.open,
          position = _this$state.position;
      return _reactDom.default.createPortal(_react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, open && children ? _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        timeout: timeout,
        classNames: transitionName
      }, _react.default.createElement("div", {
        ref: "panel",
        className: prefixCls,
        style: (0, _objectSpread2.default)({}, style, position),
        onClick: this.handlePanelClick
      }, children)) : null), document.body);
    }
  }, {
    key: "render",
    value: function render() {
      var input = this.props.input;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.cloneElement(input, (0, _objectSpread2.default)({
        ref: "trigger"
      }, input.props)), this.renderWrapper());
    }
  }]);
  return PopPanel;
}(_react.Component);

PopPanel.propTypes = {
  fullWidth: _propTypes.default.bool,
  input: _propTypes.default.node,
  placement: _propTypes.default.oneOf(["top", "left", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"]),
  open: _propTypes.default.bool,
  position: _propTypes.default.object,
  timeout: _propTypes.default.number,
  transitionName: _propTypes.default.string,
  trigger: _propTypes.default.oneOf(["hover", "click"]),
  onClose: _propTypes.default.func,
  onOpen: _propTypes.default.func
};
PopPanel.defaultProps = {
  fullWidth: false,
  placement: "bottomLeft",
  timeout: 300,
  transitionName: "slide-down",
  trigger: "click"
};
var _default = PopPanel;
exports.default = _default;