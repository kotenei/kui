"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactDnd = require("react-dnd");

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _dec, _dec2, _class;

var TreeNodeContent = (_dec = (0, _reactDnd.DropTarget)("TreeNodeContent", {
  canDrop: function canDrop(props) {
    return !props.disabled && props.dragable;
  },
  hover: function hover(props, monitor, component) {
    if (!component) {
      return;
    }

    var expandedIds = props.expandedIds;
    var dragId = monitor.getItem().id;
    var dropId = props.id; // if (dragId == hoverId) {
    //     return;
    // }

    var elmTarget = _reactDom.default.findDOMNode(component);

    var hoverBoundingRect = elmTarget.getBoundingClientRect();

    var offset = _domUtils.default.offset(elmTarget);

    var hoverMiddleY = _domUtils.default.outerHeight(elmTarget) / 2;
    var clientOffset = monitor.getClientOffset();
    var hoverClientY = clientOffset.y - hoverBoundingRect.top;
    var diff = 2,
        type = "middle";

    if (hoverClientY > hoverMiddleY + diff) {
      type = "bottom";
    } else if (hoverClientY < hoverMiddleY - diff) {
      type = "top";
    }

    if (expandedIds.indexOf(dropId) == -1) {
      props.refInstance.handleExpand();
    }

    if (props.onDragOver) {
      props.onDragOver({
        dragId: dragId,
        dropId: dropId,
        type: type
      });
    }
  }
}, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}), _dec2 = (0, _reactDnd.DragSource)("TreeNodeContent", {
  canDrag: function canDrag(props) {
    return !props.disabled && props.dragable;
  },
  beginDrag: function beginDrag(props, monitor, component) {
    var onDragStart = props.onDragStart,
        id = props.id;

    if (onDragStart) {
      onDragStart(id, props.refInstance);
    }

    return {
      id: id
    };
  },
  endDrag: function endDrag(props, monitor) {
    var onDragEnd = props.onDragEnd;
    var result = monitor.getDropResult();

    if (onDragEnd) {
      onDragEnd(result);
    }
  }
}, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}), _dec(_class = _dec2(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TreeNodeContent, _Component);

  function TreeNodeContent() {
    (0, _classCallCheck2.default)(this, TreeNodeContent);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TreeNodeContent).apply(this, arguments));
  }

  (0, _createClass2.default)(TreeNodeContent, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          id = _this$props.id,
          prefixCls = _this$props.prefixCls,
          title = _this$props.title,
          onClick = _this$props.onClick,
          connectDragSource = _this$props.connectDragSource,
          connectDropTarget = _this$props.connectDropTarget,
          isDragging = _this$props.isDragging,
          isOver = _this$props.isOver,
          dragOverInfo = _this$props.dragOverInfo,
          icon = _this$props.icon;
      var isCurrent = dragOverInfo && dragOverInfo.dropId == id && isOver;
      return connectDragSource(connectDropTarget(_react.default.createElement("span", {
        className: (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-treenode-content"), true), (0, _defineProperty2.default)(_classnames, "drag-over-gap-top", isCurrent && dragOverInfo.type == "top"), (0, _defineProperty2.default)(_classnames, "drag-over-gap-bottom", isCurrent && dragOverInfo.type == "bottom"), (0, _defineProperty2.default)(_classnames, "drag-over-gap-middle", isCurrent && dragOverInfo.type == "middle"), _classnames)),
        onClick: onClick
      }, icon, _react.default.createElement("span", {
        className: "".concat(prefixCls, "-treenode-content-title")
      }, title))));
    }
  }]);
  return TreeNodeContent;
}(_react.Component)) || _class) || _class);
var _default = TreeNodeContent;
exports.default = _default;