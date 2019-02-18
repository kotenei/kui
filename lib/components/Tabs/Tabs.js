"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _object = _interopRequireDefault(require("object.omit"));

var _TabNav = _interopRequireDefault(require("./TabNav"));

var _TabContent = _interopRequireDefault(require("./TabContent"));

var prefixCls = "k-tabs";

var Tabs =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tabs, _Component);

  function Tabs(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tabs);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tabs).call(this, props));

    _this.handleEdit = function (e, action, index) {
      var onEdit = _this.props.onEdit;

      if (onEdit) {
        onEdit(e, action, index);
      }
    };

    _this.handleTabClick = function (e, index) {
      var onTabClick = _this.props.onTabClick;

      if (!("activeIndex" in _this.props)) {
        _this.setState({
          activeIndex: index
        });
      }

      if (onTabClick) {
        onTabClick(e, index);
      }
    };

    _this.handlePrevClick = function () {};

    _this.handleNextClick = function () {};

    _this.state = {
      activeIndex: props.activeIndex || props.defaultActiveIndex || 0
    };
    return _this;
  }

  (0, _createClass2.default)(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var activeIndex = this.state.activeIndex;
      var children = this.props.children;
      var hasMatch = false;

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var disabled = child.props.disabled;

        if (disabled && i == activeIndex) {
          hasMatch = true;
          break;
        }
      }

      if (hasMatch) {
        this.setState({
          activeIndex: 0
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("activeIndex" in nextProps) {
        this.setState({
          activeIndex: nextProps.activeIndex
        });
      }
    }
  }, {
    key: "renderTabNav",
    value: function renderTabNav(key) {
      var children = this.props.children;
      var activeIndex = this.state.activeIndex;

      if (!children) {
        return null;
      }

      var props = (0, _object.default)(this.props, ["children"]);
      return _react.default.createElement(_TabNav.default, (0, _extends2.default)({
        key: key,
        prefixCls: prefixCls,
        panels: children
      }, props, {
        activeIndex: activeIndex,
        onEdit: this.handleEdit,
        onTabClick: this.handleTabClick,
        onPrevClick: this.handlePrevClick,
        onNextClick: this.handleNextClick
      }));
    }
  }, {
    key: "renderTabContent",
    value: function renderTabContent(key) {
      var _this$props = this.props,
          children = _this$props.children,
          tabPosition = _this$props.tabPosition;
      var activeIndex = this.state.activeIndex;

      if (!children) {
        return null;
      }

      var props = (0, _object.default)(this.props, ["children"]);
      return _react.default.createElement(_TabContent.default, (0, _extends2.default)({
        key: key,
        prefixCls: prefixCls,
        panels: children
      }, props, {
        activeIndex: activeIndex
      }));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var tabPosition = this.props.tabPosition;
      var items = [];
      var key = -1;

      if (tabPosition == "bottom") {
        items.push(this.renderTabContent(key++));
        items.push(this.renderTabNav(key++));
      } else {
        items.push(this.renderTabNav(key++));
        items.push(this.renderTabContent(key++));
      }

      return items;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props2 = this.props,
          tabPosition = _this$props2.tabPosition,
          className = _this$props2.className,
          type = _this$props2.type,
          style = _this$props2.style;
      var classString = (0, _classnames2.default)(className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-line"), type == "line"), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-card"), type == "card"), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(tabPosition), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-vertical"), tabPosition == "left" || tabPosition == "right"), _classnames));
      return _react.default.createElement("div", {
        className: classString,
        style: style
      }, this.renderContent());
    }
  }]);
  return Tabs;
}(_react.Component);

Tabs.propTypes = {
  activeIndex: _propTypes.default.number,
  defaultActiveIndex: _propTypes.default.number,
  extraContent: _propTypes.default.node,
  tabPosition: _propTypes.default.oneOf(["top", "left", "right", "bottom"]),
  type: _propTypes.default.oneOf(["line", "card"]),
  editable: _propTypes.default.bool,
  hideAdd: _propTypes.default.bool,
  onTabClick: _propTypes.default.func,
  onPrevClick: _propTypes.default.func,
  onNextClick: _propTypes.default.func,
  onEdit: _propTypes.default.func
};
Tabs.defaultProps = {
  defaultActiveIndex: 0,
  tabPosition: "top",
  type: "line",
  editable: false,
  hideAdd: false
};
var _default = Tabs;
exports.default = _default;