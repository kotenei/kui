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

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _Icon = _interopRequireDefault(require("../Icon"));

var MenuItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MenuItem, _Component);

  function MenuItem(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MenuItem);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MenuItem).call(this, props));

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          onItemTrigger = _this$props.onItemTrigger,
          id = _this$props.id,
          parentIds = _this$props.parentIds,
          disabled = _this$props.disabled,
          title = _this$props.title,
          onSubItemClick = _this$props.onSubItemClick;

      if (disabled) {
        return;
      }

      if (onSubItemClick) {
        onSubItemClick();
      }

      if (onItemTrigger) {
        onItemTrigger(e, {
          id: id,
          parentIds: parentIds,
          title: title
        }, "click");
      }
    };

    _this.handleMouseEnter = function (e) {
      var _this$props2 = _this.props,
          onItemMouseEnter = _this$props2.onItemMouseEnter,
          id = _this$props2.id,
          parentIds = _this$props2.parentIds;

      if (onItemMouseEnter) {
        onItemMouseEnter(e, id, parentIds);
      }
    };

    _this.handleMouseLeave = function (e) {
      var _this$props3 = _this.props,
          onItemMouseLeave = _this$props3.onItemMouseLeave,
          id = _this$props3.id,
          parentIds = _this$props3.parentIds;

      if (onItemMouseLeave) {
        onItemMouseLeave(e, id, parentIds);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(MenuItem, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          disabled = _this$props4.disabled,
          title = _this$props4.title,
          children = _this$props4.children,
          inlineIndent = _this$props4.inlineIndent,
          selectedIds = _this$props4.selectedIds,
          id = _this$props4.id,
          rootId = _this$props4.rootId,
          mode = _this$props4.mode,
          level = _this$props4.level;
      var isSelected = selectedIds.indexOf(id) != -1;
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-item"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-item-active"), isSelected), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-item-disabled"), disabled), _classnames));
      var tooltipTitle = [],
          item,
          icon;

      _react.default.Children.forEach(children, function (child, index) {
        if (!child) {
          return;
        }

        if (child.type && child.type.displayName == "Icon" && index == 0) {
          icon = child;
        } else {
          tooltipTitle.push(child);
        }
      });

      if (mode == "inlineCollapsed" && level == 1) {
        item = _react.default.createElement("li", {
          className: classString
        }, _react.default.createElement(_Tooltip.default, {
          placement: "right",
          title: tooltipTitle,
          onClick: this.handleClick
        }, _react.default.createElement("div", {
          className: "".concat(prefixCls, "-collapsed-item")
        }, icon)));
      } else {
        item = _react.default.createElement("li", {
          className: classString,
          style: {
            paddingLeft: mode == "inline" ? inlineIndent : null
          },
          title: title,
          onClick: this.handleClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        }, children);
      }

      return item;
    }
  }]);
  return MenuItem;
}(_react.Component);

MenuItem.propTypes = {
  id: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool
};
MenuItem.defaultProps = {
  disabled: false
};
var _default = MenuItem;
exports.default = _default;