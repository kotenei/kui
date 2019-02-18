"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _object = _interopRequireDefault(require("object.omit"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _SubMenu = _interopRequireDefault(require("./SubMenu"));

var Menu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Menu, _Component);

  function Menu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Menu);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Menu).call(this, props));

    _this.handleItemTrigger = function (e, info, trigger) {
      var _this$props = _this.props,
          onOpen = _this$props.onOpen,
          multiple = _this$props.multiple,
          mode = _this$props.mode,
          selectable = _this$props.selectable,
          onSelect = _this$props.onSelect;
      var _this$state = _this.state,
          selectedIds = _this$state.selectedIds,
          openIds = _this$state.openIds;
      var id = info.id,
          parentIds = info.parentIds;
      var newSelectedIds = (0, _toConsumableArray2.default)(selectedIds);
      var newOpenIds = (0, _toConsumableArray2.default)(openIds);
      var index = -1;

      switch (trigger) {
        case "click":
          if (multiple) {
            index = selectedIds.indexOf(id);

            if (index == -1) {
              newSelectedIds.push(id);
            } else {
              newSelectedIds.splice(index, 1);
            }
          } else {
            newSelectedIds = [id];
          }

          if (selectable) {
            _this.setState({
              selectedIds: newSelectedIds,
              selectedSubmenuIds: parentIds
            });
          }

          if (onSelect) {
            onSelect(e, newSelectedIds, info);
          }

          break;

        case "openChange":
          index = openIds.indexOf(id);

          if (index == -1) {
            newOpenIds.push(id);
          } else {
            newOpenIds.splice(index, 1);
          }

          _this.setState({
            openIds: newOpenIds
          });

          break;

        default:
          break;
      }
    };

    _this.handleMouseEnter = function (e) {
      var onMouseEnter = _this.props.onMouseEnter;

      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    _this.handleMouseLeave = function (e) {
      var onMouseLeave = _this.props.onMouseLeave;

      if (onMouseLeave) {
        onMouseLeave(e);
      }
    };

    _this.state = {
      selectedIds: props.selectedIds || props.defaultSelectedIds || [],
      openIds: props.defaultOpenIds || [],
      selectedSubmenuIds: []
    };
    _this.level = 1;
    return _this;
  }

  (0, _createClass2.default)(Menu, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("selectedIds" in nextProps) {
        this.setState({
          selectedIds: nextProps.selectedIds
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames,
          _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          mode = _this$props2.mode,
          children = _this$props2.children,
          prefixCls = _this$props2.prefixCls,
          style = _this$props2.style;
      var _this$state2 = this.state,
          selectedIds = _this$state2.selectedIds,
          openIds = _this$state2.openIds,
          selectedSubmenuIds = _this$state2.selectedSubmenuIds;
      var classString = (0, _classnames2.default)(className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(mode), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-root"), true), _classnames));
      var props = (0, _object.default)(this.props, ["children", "style"]);
      return _react.default.createElement("ul", {
        className: classString,
        style: style,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, _react.default.Children.map(children, function (child, i) {
        if (!child) {
          return null;
        }

        return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, props, child.props, {
          level: _this2.level,
          parentIds: [],
          parentId: 0,
          selectedSubmenuIds: selectedSubmenuIds,
          openIds: openIds,
          selectedIds: selectedIds,
          onItemTrigger: _this2.handleItemTrigger
        }));
      }));
    }
  }]);
  return Menu;
}(_react.Component);

Menu.propTypes = {
  prefixCls: _propTypes.default.string,
  defaultOpenIds: _propTypes.default.array,
  defaultSelectedIds: _propTypes.default.array,
  selectedIds: _propTypes.default.array,
  inlineIndent: _propTypes.default.number,
  inlineCollapsed: _propTypes.default.bool,
  mode: _propTypes.default.oneOf(["vertical", "inline", "horizontal", "inlineCollapsed"]),
  selectable: _propTypes.default.bool,
  multiple: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func
};
Menu.defaultProps = {
  prefixCls: "k-menu",
  inlineIndent: 24,
  inlineCollapsed: false,
  mode: "inline",
  selectable: true,
  multiple: false
};
var _default = Menu;
exports.default = _default;