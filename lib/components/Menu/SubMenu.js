"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames5 = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _object = _interopRequireDefault(require("object.omit"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _reactTransitionGroup = require("react-transition-group");

var _utils = require("../../utils");

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var SubMenu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SubMenu, _Component);

  function SubMenu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SubMenu);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SubMenu).call(this, props));

    _this.handleItemClick = function (e) {
      var _this$props = _this.props,
          onItemTrigger = _this$props.onItemTrigger,
          id = _this$props.id,
          parentIds = _this$props.parentIds,
          mode = _this$props.mode,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      if (onItemTrigger) {
        onItemTrigger(e, {
          id: id,
          parentIds: parentIds
        }, "openChange");
      }
    };

    _this.handleSubItemClick = function (e) {
      _this.hide();
    };

    _this.handleItemEnter = function (e) {
      _this.show();
    };

    _this.handleItemLeave = function () {
      _this.hide();
    };

    _this.handleMenuOver = function () {
      _this.show();
    };

    _this.show = function () {
      var _this$props2 = _this.props,
          mode = _this$props2.mode,
          disabled = _this$props2.disabled;

      if (mode == "inline" || disabled) {
        return;
      }

      if (_this.tm) {
        clearTimeout(_this.tm);
      }

      _this.setState({
        show: true
      });
    };

    _this.hide = function () {
      var mode = _this.props.mode;
      var show = _this.state.show;

      if (mode == "inline" || !show) {
        return;
      }

      _this.tm = setTimeout(function () {
        _this.setState({
          show: false
        });
      }, 150);
    };

    _this.state = {
      top: 0,
      left: -999,
      height: 0,
      position: "absolute",
      show: false
    };
    return _this;
  }

  (0, _createClass2.default)(SubMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          mode = _this$props3.mode,
          level = _this$props3.level;

      var left = _domUtils.default.outerWidth(this.refs.subItem, true);

      var top = _domUtils.default.outerHeight(this.refs.subItem, true);

      if (mode == "vertical" || mode == "inlineCollapsed" || mode == "horizontal" && level > 1) {
        this.setState({
          left: left
        });
      }

      if (mode == "horizontal" && level == 1) {
        this.setState({
          left: 0,
          top: top
        });
      }

      document.addEventListener("click", this.hide);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tm) {
        clearTimeout(this.tm);
      }

      document.removeEventListener("click", this.hide);
    }
  }, {
    key: "renderTitle",
    value: function renderTitle(isOpen) {
      var _classnames2;

      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          mode = _this$props4.mode,
          inlineIndent = _this$props4.inlineIndent,
          title = _this$props4.title,
          level = _this$props4.level;
      var tooltipTitle = [],
          icon;

      if (mode == "inlineCollapsed" && level == 1) {
        var _classnames;

        _react.default.Children.forEach(title, function (child) {
          if (!child || !child.props.children) {
            return;
          }

          _react.default.Children.forEach(child.props.children, function (item, index) {
            if (item && item.type && item.type.displayName == "Icon" && index == 0) {
              icon = item;
            } else {
              tooltipTitle.push(item);
            }
          });
        });

        return _react.default.createElement("div", {
          className: (0, _classnames5.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-submenu-title"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-item"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-collapsed-item"), true), _classnames))
        }, icon);
      }

      return _react.default.createElement("div", {
        className: (0, _classnames5.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-submenu-title"), true), (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-item"), true), _classnames2)),
        style: {
          paddingLeft: mode == "inline" ? inlineIndent : null
        },
        onClick: this.handleItemClick
      }, title, this.renderIcon(isOpen));
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(isOpen) {
      var _this$props5 = this.props,
          mode = _this$props5.mode,
          children = _this$props5.children,
          level = _this$props5.level;

      if (!children || mode == "inlineCollapsed" && level == 1) {
        return null;
      }

      if (mode == "inline" || mode == "horizontal" && level == 1) {
        return _react.default.createElement(_Icon.default, {
          className: "direction",
          type: isOpen ? "up" : "down"
        });
      }

      return _react.default.createElement(_Icon.default, {
        className: "direction",
        type: "right"
      });
    }
  }, {
    key: "renderSub",
    value: function renderSub(props) {
      var _classnames3;

      var _this$props6 = this.props,
          prefixCls = _this$props6.prefixCls,
          children = _this$props6.children,
          inlineIndent = _this$props6.inlineIndent,
          openIds = _this$props6.openIds,
          id = _this$props6.id,
          mode = _this$props6.mode,
          level = _this$props6.level,
          parentIds = _this$props6.parentIds;
      var _this$state = this.state,
          left = _this$state.left,
          top = _this$state.top,
          show = _this$state.show;
      var newParentIds = (0, _toConsumableArray2.default)(parentIds);
      var isOpen = openIds.indexOf(id) != -1;
      var classString = (0, _classnames5.default)((_classnames3 = {}, (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-").concat(mode), true), (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-sub"), true), (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-pop-enter"), mode == "vertical" && show), (0, _defineProperty2.default)(_classnames3, "slide-down-enter", mode == "horizontal" && show && level == 1), _classnames3));
      var isHide = mode != "inline" ? !show : !isOpen;
      var style = {};

      if (mode != "inline") {
        style = {
          top: top,
          left: left
        };
      }

      var animateName = "slide";

      if (mode == "vertical" || mode == "inlineCollapsed" || mode == "horizontal") {
        animateName = "".concat(prefixCls, "-pop");
      }

      if (level == 1 && mode == "horizontal") {
        animateName = "slide-down";
      }

      if (parentIds.indexOf(id) == -1) {
        newParentIds.push(id);
      }

      var menu = !isHide ? _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        timeout: 300,
        classNames: animateName
      }, _react.default.createElement("ul", {
        className: classString,
        ref: "subMenu",
        style: style,
        onMouseEnter: this.handleMenuOver
      }, _react.default.Children.map(children, function (child, index) {
        if (!child) {
          return null;
        }

        return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, props, child.props, {
          inlineIndent: mode == "inline" ? inlineIndent * 2 : inlineIndent,
          level: level + 1,
          parentIds: newParentIds,
          parentId: id
        }));
      }))) : null;
      return _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, menu);
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames4;

      var _this$props7 = this.props,
          prefixCls = _this$props7.prefixCls,
          mode = _this$props7.mode,
          title = _this$props7.title,
          disabled = _this$props7.disabled,
          children = _this$props7.children,
          inlineIndent = _this$props7.inlineIndent,
          openIds = _this$props7.openIds,
          id = _this$props7.id,
          level = _this$props7.level,
          selectedSubmenuIds = _this$props7.selectedSubmenuIds;
      var show = this.state.show;
      var isOpen = openIds.indexOf(id) != -1 || show;
      var classString = (0, _classnames5.default)((_classnames4 = {}, (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-submenu"), true), (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-submenu-").concat(mode), true), (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-submenu-open"), isOpen), (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-submenu-disabled"), disabled), (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-submenu-selected"), selectedSubmenuIds.indexOf(id) != -1), _classnames4));
      var props = (0, _object.default)(this.props, ["children", "style"]);
      return _react.default.createElement("li", {
        ref: "subItem",
        className: classString,
        onMouseEnter: this.handleItemEnter,
        onMouseLeave: this.handleItemLeave
      }, this.renderTitle(isOpen), this.renderSub(props));
    }
  }]);
  return SubMenu;
}(_react.Component);

SubMenu.propTypes = {
  id: _propTypes.default.string.isRequired,
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  disabled: _propTypes.default.bool
};
SubMenu.defaultProps = {
  disabled: false
};
var _default = SubMenu;
exports.default = _default;