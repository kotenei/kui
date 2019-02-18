"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _kUtils = require("../../utils/kUtils");

var _utils = require("../../utils");

var _styleMaps = require("../../utils/styleMaps");

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var seed = 1;
var instances = {};

var Tooltip =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tooltip, _Component);

  function Tooltip(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tooltip);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tooltip).call(this, props));

    _this.show = function (e, focus) {
      var delay = _this.props.delay;

      if (typeof e === "boolean") {
        focus = e;
      }

      if ("show" in _this.props && !focus) {
        return;
      }

      _this.setState({
        hidden: false
      }, function () {
        _this.setPosition();

        _this.setState({
          show: true
        });
      });
    };

    _this.hide = function (e, focus) {
      var delay = _this.props.delay;

      if (!_this.mounted) {
        return;
      }

      if (e && !focus && typeof e == "boolean") {
        focus = e;
      }

      if ("show" in _this.props && !focus) {
        return;
      }

      _this.setState({
        show: false
      }, function () {
        _this.setState({
          hidden: true
        });
      });
    };

    _this.handleTriggerMouseEnter = _this.handleTriggerMouseEnter.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleTriggerMouseLeave = _this.handleTriggerMouseLeave.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleTriggerClick = _this.handleTriggerClick.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleTooltipMouseEnter = _this.handleTooltipMouseEnter.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleTooltipMouseLeave = _this.handleTooltipMouseLeave.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleTooltipClick = _this.handleTooltipClick.bind((0, _assertThisInitialized2.default)(_this));
    _this.setPosition = _this.setPosition.bind((0, _assertThisInitialized2.default)(_this));
    _this.id = "tooltip_".concat(seed++);
    _this.state = {
      position: {
        top: -999,
        left: -999
      },
      hidden: false,
      show: props.show
    };
    instances[_this.id] = (0, _assertThisInitialized2.default)(_this);
    return _this;
  }

  (0, _createClass2.default)(Tooltip, [{
    key: "handleTriggerMouseEnter",
    value: function handleTriggerMouseEnter() {
      var _this$props = this.props,
          trigger = _this$props.trigger,
          onMouseEnter = _this$props.onMouseEnter;

      if (trigger != "hover") {
        return;
      }

      if (onMouseEnter) {
        onMouseEnter();
      }

      this.show();
    }
  }, {
    key: "handleTriggerMouseLeave",
    value: function handleTriggerMouseLeave() {
      var _this2 = this;

      var _this$props2 = this.props,
          trigger = _this$props2.trigger,
          onMouseLeave = _this$props2.onMouseLeave;

      if (trigger != "hover") {
        return;
      }

      if (onMouseLeave) {
        onMouseLeave();
      }

      this.tm = setTimeout(function () {
        _this2.hide();
      }, 300);
    }
  }, {
    key: "handleTooltipMouseEnter",
    value: function handleTooltipMouseEnter() {
      var trigger = this.props.trigger;

      if (this.tm && trigger != "click") {
        clearTimeout(this.tm);
      }
    }
  }, {
    key: "handleTooltipMouseLeave",
    value: function handleTooltipMouseLeave() {
      var trigger = this.props.trigger;

      if (trigger == "click") {
        return;
      }

      this.hide();
    }
  }, {
    key: "handleTriggerClick",
    value: function handleTriggerClick(e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var _this$props3 = this.props,
          trigger = _this$props3.trigger,
          onClick = _this$props3.onClick;
      var show = this.state.show;

      if (onClick) {
        onClick(e);
      }

      this.hideOther();

      if (trigger != "click") {
        return;
      }

      if (!show) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: "handleTooltipClick",
    value: function handleTooltipClick(e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      this.hideOther();
    }
  }, {
    key: "setPosition",
    value: function setPosition() {
      var title = this.props.title;

      if (title === null || title === undefined || !this.mounted) {
        return;
      }

      var parent = _reactDom.default.findDOMNode(this.refs.trigger),
          ew = _domUtils.default.outerWidth(parent),
          eh = _domUtils.default.outerHeight(parent),
          tw = _domUtils.default.outerWidth(this.refs.tooltip),
          th = _domUtils.default.outerHeight(this.refs.tooltip),
          position = {
        left: 0,
        top: 0
      },
          pos = {
        left: 0,
        top: 0
      };

      var placement = this.props.placement;

      do {
        position.left += parent.offsetLeft - parent.scrollLeft;
        position.top += parent.offsetTop - parent.scrollTop;
      } while ((parent = parent.offsetParent) && parent != document.body);

      switch (placement) {
        case "left":
          pos = {
            top: position.top + eh / 2 - th / 2,
            left: position.left - tw
          };
          break;

        case "leftTop":
          pos = {
            top: position.top,
            left: position.left - tw
          };
          break;

        case "leftBottom":
          pos = {
            top: position.top + eh - th,
            left: position.left - tw
          };
          break;

        case "top":
          pos = {
            top: position.top - th,
            left: position.left + ew / 2 - tw / 2
          };
          break;

        case "topLeft":
          pos = {
            top: position.top - th,
            left: position.left
          };
          break;

        case "topRight":
          pos = {
            top: position.top - th,
            left: position.left + ew - tw
          };
          break;

        case "right":
          pos = {
            top: position.top + eh / 2 - th / 2,
            left: position.left + ew
          };
          break;

        case "rightTop":
          pos = {
            top: position.top,
            left: position.left + ew
          };
          break;

        case "rightBottom":
          pos = {
            top: position.top + eh - th,
            left: position.left + ew
          };
          break;

        case "bottom":
          pos = {
            top: position.top + eh,
            left: position.left + ew / 2 - tw / 2
          };
          break;

        case "bottomLeft":
          pos = {
            top: position.top + eh,
            left: position.left
          };
          break;

        case "bottomRight":
          pos = {
            top: position.top + eh,
            left: position.left + ew - tw
          };
          break;
      }

      this.setState({
        position: pos
      });
    }
  }, {
    key: "hideOther",
    value: function hideOther() {
      for (var k in instances) {
        if (k == this.id) {
          continue;
        }

        instances[k].hide();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      var _this$props4 = this.props,
          trigger = _this$props4.trigger,
          show = _this$props4.show,
          title = _this$props4.title;

      if (title !== undefined && _react.default.Children.toArray(this.props.children).length == 1) {
        this.setPosition();
        this.setState({
          show: false,
          hidden: true
        });

        if (show) {
          this.setState({
            show: true,
            hidden: false
          });
        }
      }

      window.addEventListener("resize", this.setPosition);

      if (trigger == "click") {
        document.addEventListener("click", this.hide);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var title = nextProps.title;

      if (title === null || title === undefined) {
        return;
      }

      if ("show" in nextProps) {
        if (nextProps.show) {
          setTimeout(function () {
            _this3.setPosition();
          });

          if (!this.state.show) {
            this.show(true);
          }
        } else {
          if (this.state.show) {
            this.hide(true);
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      var trigger = this.props.trigger;

      if (this.tm) {
        clearTimeout(this.tm);
      }

      if (trigger === "click") {
        document.removeEventListener("click", this.hide);
      }

      window.removeEventListener("resize", this.setPosition);
      delete instances[this.id];
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      var _classnames;

      var _this$props5 = this.props,
          title = _this$props5.title,
          placement = _this$props5.placement,
          kClass = _this$props5.kClass,
          className = _this$props5.className,
          style = _this$props5.style;
      var _this$state = this.state,
          show = _this$state.show,
          position = _this$state.position,
          hidden = _this$state.hidden;
      var classes = (0, _kUtils.getClassSet)(this.props);
      var classString = (0, _classnames2.default)(classes, className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(kClass, "-hidden"), hidden), (0, _defineProperty2.default)(_classnames, placement, true), (0, _defineProperty2.default)(_classnames, "in", show), _classnames));
      return title != null && title != undefined && _reactDom.default.createPortal(_react.default.createElement("div", {
        className: classString,
        style: (0, _objectSpread2.default)({}, style, position),
        ref: "tooltip",
        onMouseEnter: this.handleTooltipMouseEnter,
        onMouseLeave: this.handleTooltipMouseLeave,
        onClick: this.handleTooltipClick
      }, _react.default.createElement("div", {
        className: "".concat(kClass, "-arrow")
      }), _react.default.createElement("div", {
        className: "".concat(kClass, "-inner")
      }, title)), document.body);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          title = _this$props6.title,
          children = _this$props6.children;

      if (!this.props.children || _react.default.Children.toArray(this.props.children).length > 1) {
        return null;
      }

      var content = _react.default.cloneElement(children, (0, _objectSpread2.default)({
        ref: "trigger",
        onMouseEnter: this.handleTriggerMouseEnter,
        onMouseLeave: this.handleTriggerMouseLeave,
        onClick: this.handleTriggerClick
      }, children.props));

      return _react.default.createElement(_react.default.Fragment, null, content, this.renderTooltip());
    }
  }]);
  return Tooltip;
}(_react.Component);

Tooltip.propTypes = {
  title: _propTypes.default.node,
  placement: _propTypes.default.oneOf(["top", "left", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"]),
  trigger: _propTypes.default.oneOf(["hover", "click"]),
  delay: _propTypes.default.number,
  show: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func
};
Tooltip.defaultProps = {
  placement: "top",
  trigger: "hover",
  delay: 100
};

var styles = _styleMaps.State.values().concat(_styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, (0, _kUtils.kClass)("k-tooltip", Tooltip));

exports.default = _default;