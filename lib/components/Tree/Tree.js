"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _object2 = _interopRequireDefault(require("object.pick"));

var _utils = require("../../utils");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _dec, _class, _class2, _temp;

var prefixCls = "k-tree";
var Tree = (_dec = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend.default), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tree, _Component);

  function Tree(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tree);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tree).call(this, props));

    _this.handleExpand = function (id) {
      var onExpand = _this.props.onExpand;
      var expandedIds = _this.state.expandedIds;
      var newExpandedIds = (0, _toConsumableArray2.default)(expandedIds),
          index = newExpandedIds.indexOf(id);

      if (index == -1) {
        newExpandedIds.push(id);
      } else {
        newExpandedIds.splice(index, 1);
      }

      if (onExpand) {
        onExpand(id, index != -1, newExpandedIds);
      }

      if (!("expandedIds" in _this.props)) {
        _this.setState({
          expandedIds: newExpandedIds
        });
      }
    };

    _this.handleCheck = function (id, isChecked) {
      _this.setChecked(id, isChecked);
    };

    _this.handleSelect = function (id) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onSelect = _this$props.onSelect;
      var newSelectedIds = (0, _toConsumableArray2.default)(_this.state.selectedIds);

      if (multiple) {
        var index = newSelectedIds.indexOf(id);

        if (index == -1) {
          newSelectedIds.push(id);
        } else {
          newSelectedIds.splice(index, 1);
        }
      } else {
        newSelectedIds = [id];
      }

      if (onselect) {
        onselect(newSelectedIds);
      }

      if (!("selectedIds" in _this.props)) {
        _this.setState({
          selectedIds: newSelectedIds
        });
      }
    };

    _this.handleDragStart = function (id, treeNode) {
      var onDragStart = _this.props.onDragStart;

      if (onDragStart) {
        onDragStart(id, treeNode);
      }
    };

    _this.handleDragOver = function (overInfo) {
      var dragOverInfo = _this.state.dragOverInfo;
      var onDragOver = _this.props.onDragOver;

      if (dragOverInfo && dragOverInfo.dropId == overInfo.dropId && dragOverInfo.type == overInfo.type) {
        return;
      }

      _this.setState({
        dragOverInfo: overInfo
      });

      if (onDragOver) {
        onDragOver(overInfo);
      }
    };

    _this.handleDragEnd = function (result) {
      var onDragEnd = _this.props.onDragEnd;
      var dragOverInfo = _this.state.dragOverInfo;

      _this.setState({
        dragOverInfo: null
      });

      if (onDragEnd) {
        onDragEnd(result && dragOverInfo ? dragOverInfo : null);
      }
    };

    _this.state = {
      checkedIds: props.checkedIds || props.defaultCheckedIds,
      expandedIds: props.expandedIds || props.defaultExpandedIds,
      selectedIds: props.selectedIds || props.defaultSelectedIds,
      halfCheckedIds: [],
      dragOverInfo: null
    };
    _this.nodes = [];
    _this.dicNodes = {};
    return _this;
  }

  (0, _createClass2.default)(Tree, [{
    key: "init",

    /**
     *
     * @param {object} props 组件输入参数
     */
    value: function init() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var children = props.children,
          checkedIds = props.checkedIds,
          expandedIds = props.expandedIds,
          selectedIds = props.selectedIds;

      var nodes = [],
          dicNodes = {},
          tmpCheckedIds = checkedIds || this.state.checkedIds,
          tmpExpandedIds = expandedIds || this.state.expandedIds,
          set = function set(nodes, dicNodes, children, parentNode) {
        _react.default.Children.map(children, function (child) {
          var _child$props = child.props,
              id = _child$props.id,
              children = _child$props.children,
              disabled = _child$props.disabled,
              disableCheckbox = _child$props.disableCheckbox;
          var path = parentNode ? parentNode.path + id + "/" : "/".concat(id, "/"),
              parentIds = parentNode ? parentNode.parentIds.length > 0 ? [parentNode.id].concat((0, _toConsumableArray2.default)(parentNode.parentIds)) : [parentNode.id] : [],
              node = {
            id: id,
            parentId: parentNode ? parentNode.id : "",
            parentIds: parentIds,
            path: path,
            disabled: disabled || disableCheckbox,
            level: parentNode ? parentNode.level + 1 : 1
          };
          nodes.push(node);
          dicNodes[id] = node;

          if (children) {
            set(nodes, dicNodes, children, node);
          }
        });
      };

      set(nodes, dicNodes, children, null);
      this.nodes = nodes;
      this.dicNodes = dicNodes;
      this.initChecked(tmpCheckedIds);

      if (!this.isInitExpanded && !expandedIds) {
        this.initExpanded(tmpExpandedIds);
        this.isInitExpanded = true;
      }

      if (selectedIds) {
        this.setState({
          selectedIds: selectedIds
        });
      }
    }
    /**
     * 初始化选中
     */

  }, {
    key: "initChecked",
    value: function initChecked(checkedIds) {
      var _this2 = this;

      var newCheckIds = (0, _toConsumableArray2.default)(checkedIds),
          halfCheckedIds = [];
      checkedIds.forEach(function (id) {
        if (!_this2.dicNodes[id]) return;
        var curNode = _this2.dicNodes[id],
            isDisabled = curNode.disabled,
            childNodes = isDisabled ? [] : _this2.getNodes(id, "s", function (node) {
          return newCheckIds.indexOf(node.id) == -1;
        }),
            disabled = childNodes.filter(function (node) {
          return node.disabled;
        }),
            parentNodes = isDisabled ? [] : _this2.getNodes(id, "p");
        disabled.forEach(function (node) {
          childNodes = childNodes.filter(function (child) {
            return child.path.indexOf(node.path) == -1;
          });
        });

        if (childNodes.length > 0) {
          newCheckIds.push.apply(newCheckIds, (0, _toConsumableArray2.default)(childNodes.map(function (child) {
            return child.id;
          })));
        }

        parentNodes.every(function (parent) {
          if (parent.disabled) return false;
          var tmpCount = 0;

          var childNodes = _this2.getNodes(parent.id);

          childNodes.forEach(function (child) {
            if (newCheckIds.indexOf(child.id) != -1) {
              tmpCount++;
            }
          });

          if (tmpCount == childNodes.length && newCheckIds.indexOf(parent.id) == -1) {
            newCheckIds.push(parent.id);
          } else if (newCheckIds.indexOf(parent.id) == -1 && halfCheckedIds.indexOf(parent.id) == -1) {
            halfCheckedIds.push(parent.id);
          }

          return true;
        });
      });
      this.setState({
        checkedIds: newCheckIds,
        halfCheckedIds: halfCheckedIds
      });
    } //初始化展开

  }, {
    key: "initExpanded",
    value: function initExpanded(expandedIds) {
      var _this3 = this;

      var newExpandedIds = (0, _toConsumableArray2.default)(expandedIds);
      expandedIds.forEach(function (id) {
        var parentNodes = _this3.getNodes(id, "p", function (node) {
          return newExpandedIds.indexOf(node.id) == -1;
        });

        if (parentNodes.length > 0) {
          newExpandedIds.push.apply(newExpandedIds, (0, _toConsumableArray2.default)(parentNodes.map(function (parent) {
            return parent.id;
          })));
        }
      });
      this.setState({
        expandedIds: newExpandedIds
      });
    }
    /**
     * 设置复选
     * @param {string} id
     * @param {bool} checked
     */

  }, {
    key: "setChecked",
    value: function setChecked(id, checked) {
      var _this4 = this;

      var onCheck = this.props.onCheck;
      var _this$state = this.state,
          checkedIds = _this$state.checkedIds,
          halfCheckedIds = _this$state.halfCheckedIds;
      var newCheckIds = (0, _toConsumableArray2.default)(checkedIds),
          newHalfCheckedIds = (0, _toConsumableArray2.default)(halfCheckedIds),
          childNodes = this.getNodes(id),
          parentNodes = this.getNodes(id, "p"),
          index = -1,
          tmpCount = 0,
          disabledNodes; //如果当前节点有半选状态则取消

      index = newHalfCheckedIds.indexOf(id);

      if (index != -1) {
        newHalfCheckedIds.splice(index, 1);
      }

      index = newCheckIds.indexOf(id);

      if (checked) {
        //选中当前节点
        if (index == -1) {
          newCheckIds.push(id);
        } //过滤被禁用的子节点


        disabledNodes = childNodes.filter(function (node) {
          return node.disabled;
        });
        disabledNodes.forEach(function (node) {
          childNodes = childNodes.filter(function (child) {
            return child.path.indexOf(node.path) == -1;
          });
        }); //选中当前节点所有子节点

        childNodes.forEach(function (child) {
          index = newCheckIds.indexOf(child.id);

          if (index == -1) {
            newCheckIds.push(child.id);
          }

          index = newHalfCheckedIds.indexOf(child.id);

          if (index != -1) {
            newHalfCheckedIds.splice(index, 1);
          }
        }); //遍历父节点，

        parentNodes.every(function (parent) {
          if (parent.disabled) return false;
          tmpCount = 0;
          childNodes = _this4.getNodes(parent.id, "s", function (node) {
            return node.level == parent.level + 1 && node.id != id && !node.disabled;
          });
          childNodes.forEach(function (child) {
            index = newCheckIds.indexOf(child.id);

            if (index != -1) {
              tmpCount++;
            }
          }); //如果父节点的所有子节点都选中,并且父节点没有全选，则全选其父节点

          if (tmpCount == childNodes.length && newCheckIds.indexOf(parent.id) == -1) {
            newCheckIds.push(parent.id);
          } else if (newHalfCheckedIds.indexOf(parent.id) == -1) {
            //如果父节点没有半选状态，则添加半选状态
            newHalfCheckedIds.push(parent.id);
          }

          return true;
        });
      } else {
        //取消当前选中的节点
        if (index != -1) {
          newCheckIds.splice(index, 1);
        } //过滤被禁用的子节点


        disabledNodes = childNodes.filter(function (node) {
          return node.disabled;
        });
        disabledNodes.forEach(function (node) {
          childNodes = childNodes.filter(function (child) {
            return child.path.indexOf(node.path) == -1;
          });
        }); //取消当前节点下所有选中的子节点

        childNodes.forEach(function (child) {
          index = newCheckIds.indexOf(child.id);

          if (index != -1) {
            newCheckIds.splice(index, 1);
          }

          index = newHalfCheckedIds.indexOf(child.id);

          if (index != -1) {
            newHalfCheckedIds.splice(index, 1);
          }
        }); //遍历所有父节点

        parentNodes.every(function (parent) {
          if (parent.disabled) return false; //取消父节点的选中状态

          index = newCheckIds.indexOf(parent.id);

          if (index != -1) {
            newCheckIds.splice(index, 1);
          } //获取父节点的一级子节点（非禁用且有全选或半选状态的子节点）


          childNodes = _this4.getNodes(parent.id, "s", function (node) {
            return node.level == parent.level + 1 && node.id != id && !node.disabled && (newCheckIds.indexOf(node.id) != -1 || newHalfCheckedIds.indexOf(node.id) != -1);
          }); //检查父节点的半选状态

          index = newHalfCheckedIds.indexOf(parent.id); //如果子节点数量大于0，并且没有半选状态则添加半选状态

          if (childNodes.length > 0 && index == -1) {
            newHalfCheckedIds.push(parent.id);
          } else if (childNodes.length == 0 && index != -1) {
            //如果子节点数量为0，并且有半选状态，则取消半选状态
            newHalfCheckedIds.splice(index, 1);
          }

          return true;
        });
      }

      if (onCheck) {
        onCheck(id, checked, newCheckIds);
      }

      if (!("checkedIds" in this.props)) {
        this.setState({
          checkedIds: newCheckIds,
          halfCheckedIds: newHalfCheckedIds
        });
      }
    }
    /**
     * 取节点
     * @param {string} nodeId 节点编号
     * @param {string} type 类型，默认's'，  p：父  s：子  b：兄弟
     * @param {function} condition 条件函数function(node:object){}，返回true或者false
     */

  }, {
    key: "getNodes",
    value: function getNodes(nodeId) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "s";
      var condition = arguments.length > 2 ? arguments[2] : undefined;
      var nodes = this.nodes,
          dicNodes = this.dicNodes,
          ret = [],
          curNode = dicNodes[nodeId];

      if (curNode) {
        switch (type) {
          case "p":
            if (curNode.parentId) {
              var parentIds = curNode.parentIds;

              for (var i = 0; i < parentIds.length; i++) {
                var node = this.dicNodes[parentIds[i]];

                if (!condition || condition && condition(node) == true) {
                  ret.push(node);
                }
              }
            }

            break;

          case "b":
            ret = nodes.filter(function (node) {
              var result = node.parentId == curNode.parentId && node.id != curNode.id;

              if (result && condition) {
                result = condition(node);
              }

              return result == true;
            });
            break;

          default:
            ret = nodes.filter(function (node) {
              var result = node.path.indexOf(curNode.path) != -1 && node.id != curNode.id;

              if (result && condition) {
                result = condition(node);
              }

              return result == true;
            });
            break;
        }
      }

      return ret;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.init(nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames,
          _this5 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          showLine = _this$props2.showLine;
      var _this$state2 = this.state,
          checkedIds = _this$state2.checkedIds,
          expandedIds = _this$state2.expandedIds,
          selectedIds = _this$state2.selectedIds,
          halfCheckedIds = _this$state2.halfCheckedIds,
          dragOverInfo = _this$state2.dragOverInfo;
      var otherProps = (0, _object2.default)(this.props, ["checkable", "dragable", "selectable", "showIcon", "showLine", "loadData", "onLoad"]);
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-showLine"), showLine), _classnames));
      return _react.default.createElement("div", null, _react.default.createElement("ul", {
        className: classString
      }, _react.default.Children.map(children, function (child, index) {
        if (!child || child.type && child.type.displayName && child.type.displayName != "TreeNode") {
          return null;
        }

        var id = child.props.id || (0, _utils.guid)();
        return _react.default.cloneElement(child, (0, _objectSpread2.default)({
          id: id,
          rootId: id,
          parentIds: []
        }, otherProps, child.props, {
          prefixCls: prefixCls,
          checkedIds: checkedIds,
          expandedIds: expandedIds,
          selectedIds: selectedIds,
          halfCheckedIds: halfCheckedIds,
          dragOverInfo: dragOverInfo,
          onExpand: _this5.handleExpand,
          onCheck: _this5.handleCheck,
          onSelect: _this5.handleSelect,
          onDragStart: _this5.handleDragStart,
          onDragOver: _this5.handleDragOver,
          onDragEnd: _this5.handleDragEnd
        }));
      })));
    }
  }]);
  return Tree;
}(_react.Component), _class2.propTypes = {
  checkable: _propTypes.default.bool,
  checkedIds: _propTypes.default.array,
  defaultCheckedIds: _propTypes.default.array,
  defaultExpandAll: _propTypes.default.bool,
  defaultExpandedIds: _propTypes.default.array,
  defaultSelectedIds: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  dragable: _propTypes.default.bool,
  expandedIds: _propTypes.default.array,
  loadData: _propTypes.default.func,
  multiple: _propTypes.default.bool,
  selectable: _propTypes.default.bool,
  selectedIds: _propTypes.default.bool,
  showIcon: _propTypes.default.bool,
  showLine: _propTypes.default.bool,
  onCheck: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDragOver: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onLoad: _propTypes.default.func
}, _class2.defaultProps = {
  checkable: false,
  defaultCheckedIds: [],
  defaultExpandAll: false,
  defaultExpandedIds: [],
  defaultSelectedIds: [],
  disabled: false,
  dragable: false,
  multiple: false,
  selectable: false,
  showIcon: false,
  showLine: false
}, _temp)) || _class);
var _default = Tree;
exports.default = _default;