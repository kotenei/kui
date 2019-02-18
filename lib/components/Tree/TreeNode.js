"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _object = _interopRequireDefault(require("object.pick"));

var _reactTransitionGroup = require("react-transition-group");

var _utils = require("../../utils");

var _TreeNodeContent = _interopRequireDefault(require("./TreeNodeContent"));

var TreeNode =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TreeNode, _Component);

  function TreeNode(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TreeNode);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TreeNode).call(this, props));

    _this.handleExpand = function () {
      var _this$props = _this.props,
          onExpand = _this$props.onExpand,
          id = _this$props.id,
          parentId = _this$props.parentId,
          rootId = _this$props.rootId,
          loadData = _this$props.loadData,
          children = _this$props.children,
          isLeaf = _this$props.isLeaf,
          onLoad = _this$props.onLoad;
      var _this$state = _this.state,
          isLoading = _this$state.isLoading,
          loaded = _this$state.loaded;

      if (onExpand) {
        onExpand(id);
      }

      if (!children && loadData && !isLoading && !loaded && !isLeaf) {
        _this.setState({
          isLoading: true
        }, function () {
          loadData((0, _assertThisInitialized2.default)(_this)).then(function (data) {
            if (onLoad) {
              onLoad(id, data);
            }

            _this.setState({
              isLoading: false,
              loaded: true
            });
          });
        });
      }
    };

    _this.handleCheck = function (e) {
      var target = e.target;
      var _this$props2 = _this.props,
          onCheck = _this$props2.onCheck,
          id = _this$props2.id,
          parentId = _this$props2.parentId,
          rootId = _this$props2.rootId;

      if (onCheck) {
        onCheck(id, target.checked);
      }
    };

    _this.handleSelect = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var _this$props3 = _this.props,
          id = _this$props3.id,
          onSelect = _this$props3.onSelect,
          disabled = _this$props3.disabled,
          selectable = _this$props3.selectable;
      if (disabled || !selectable) return;

      if (onSelect) {
        onSelect(id);
      }
    };

    _this.state = {
      isLoading: false,
      loaded: false
    };
    return _this;
  }

  (0, _createClass2.default)(TreeNode, [{
    key: "isExpanded",
    value: function isExpanded() {
      var _this$props4 = this.props,
          expandedIds = _this$props4.expandedIds,
          id = _this$props4.id;
      var expanded = expandedIds && expandedIds.length > 0 && expandedIds.indexOf(id) != -1;
      return expanded;
    }
  }, {
    key: "renderSwitcher",
    value: function renderSwitcher() {
      var _this$props5 = this.props,
          prefixCls = _this$props5.prefixCls,
          expandedIds = _this$props5.expandedIds,
          id = _this$props5.id,
          children = _this$props5.children,
          isLeaf = _this$props5.isLeaf,
          loadData = _this$props5.loadData,
          showLine = _this$props5.showLine,
          icon = _this$props5.icon;
      var _this$state2 = this.state,
          isLoading = _this$state2.isLoading,
          loaded = _this$state2.loaded;
      var iconType = this.isExpanded() ? "caret-down" : "caret-right";

      if (showLine) {
        iconType = this.isExpanded() ? "minus-square" : "plus-square";

        if (isLeaf && loadData || !children && !loadData) {
          iconType = "file";
        }
      }

      return _react.default.createElement("span", {
        className: "".concat(prefixCls, "-treenode-switcher")
      }, isLoading ? _react.default.createElement(_Icon.default, {
        type: "loading"
      }) : children || loadData && !isLeaf && !loaded || !children && showLine ? _react.default.createElement(_Icon.default, {
        type: iconType,
        className: "expand",
        onClick: this.handleExpand
      }) : null);
    }
  }, {
    key: "renderCheckBox",
    value: function renderCheckBox() {
      var _this$props6 = this.props,
          checkable = _this$props6.checkable,
          checkedIds = _this$props6.checkedIds,
          halfCheckedIds = _this$props6.halfCheckedIds,
          id = _this$props6.id,
          children = _this$props6.children,
          disableCheckbox = _this$props6.disableCheckbox,
          disabled = _this$props6.disabled;
      var checked = false,
          indeterminate = false;

      if (checkedIds.indexOf(id) != -1) {
        checked = true;
      } else if (halfCheckedIds.indexOf(id) != -1) {
        indeterminate = true;
      }

      return checkable ? _react.default.createElement(_Checkbox.default, {
        inline: true,
        onChange: this.handleCheck,
        checked: checked,
        indeterminate: indeterminate,
        disabled: disableCheckbox || disabled
      }) : null;
    }
  }, {
    key: "renderNode",
    value: function renderNode() {
      var _classnames;

      var _this$props7 = this.props,
          prefixCls = _this$props7.prefixCls,
          disabled = _this$props7.disabled,
          children = _this$props7.children,
          id = _this$props7.id,
          rootId = _this$props7.rootId,
          selectedIds = _this$props7.selectedIds;
      var otherProps = (0, _object.default)(this.props, ["parentIds", "checkable", "dragable", "selectable", "showIcon", "showLine", "checkedIds", "expandedIds", "selectedIds", "halfCheckedIds", "dragOverInfo", "loadData", "onExpand", "onCheck", "onSelect", "onDragStart", "onDragOver", "onDragEnd", "onLoad"]);
      return _react.default.createElement("li", {
        className: (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-treenode"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-treenode-disabled"), disabled), (0, _defineProperty2.default)(_classnames, "active", selectedIds.indexOf(id) != -1), _classnames))
      }, this.renderSwitcher(), this.renderCheckBox(), _react.default.createElement(_TreeNodeContent.default, (0, _extends2.default)({}, this.props, {
        onClick: this.handleSelect,
        refInstance: this
      })), _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, children && this.isExpanded() ? _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        timeout: 300,
        classNames: "slide"
      }, _react.default.createElement("ul", null, _react.default.Children.map(children, function (child) {
        return _react.default.cloneElement(child, (0, _objectSpread2.default)({
          parentId: id,
          rootId: rootId
        }, child.props, otherProps));
      }))) : null));
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderNode();
    }
  }]);
  return TreeNode;
}(_react.Component);

TreeNode.displayName = "TreeNode";
TreeNode.propTypes = {
  id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  parentId: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  disableCheckbox: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  isLeaf: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  selectable: _propTypes.default.bool,
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  onExpand: _propTypes.default.func,
  onCheck: _propTypes.default.func
};
TreeNode.defaultProps = {
  id: (0, _utils.guid)(),
  disableCheckbox: false,
  disabled: false,
  isLeaf: false,
  prefixCls: "k-tree",
  selectable: true
};
var _default = TreeNode;
exports.default = _default;