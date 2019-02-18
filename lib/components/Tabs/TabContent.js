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

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var TabContent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TabContent, _Component);

  function TabContent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TabContent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabContent).call(this, props));
    _this.state = {
      scrollLeft: 0
    };
    _this.isVertical = props.tabPosition == 'left' || props.tabPosition == 'right';
    return _this;
  }

  (0, _createClass2.default)(TabContent, [{
    key: "setTabContentInfo",
    value: function setTabContentInfo() {
      var panels = this.props.panels;

      var width = _domUtils.default.outerWidth(this.refs.tabContent),
          totalWidth = panels.length * width;

      this.info = {
        width: width,
        totalWidth: totalWidth
      };
    }
  }, {
    key: "getTabPanels",
    value: function getTabPanels() {
      var _this$props = this.props,
          panels = _this$props.panels,
          prefixCls = _this$props.prefixCls,
          activeIndex = _this$props.activeIndex;
      var items = [];
      panels.map(function (child, index) {
        var _classnames;

        if (!child) {
          return;
        }

        var children = child.props.children;
        var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-panel"), true), (0, _defineProperty2.default)(_classnames, 'active', activeIndex == index), _classnames));
        items.push(_react.default.createElement("div", {
          key: index,
          className: classString
        }, children));
      });
      return items;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(index) {
      var _this$props2 = this.props,
          panels = _this$props2.panels,
          activeIndex = _this$props2.activeIndex,
          tabPosition = _this$props2.tabPosition;
      var props = this.state.props;
      var max = panels.length - 1;
      var scrollLeft = 0;
      index = index != undefined ? index : activeIndex;

      if (index < 0) {
        index = 0;
      }

      if (index > max) {
        index = max;
      }

      scrollLeft = index * this.info.width;

      if (this.isVertical) {
        scrollLeft = 0;
      }

      this.setState({
        scrollLeft: scrollLeft
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTabContentInfo();
      this.scrollTo();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.isVertical = nextProps.tabPosition == 'left' || nextProps.tabPosition == 'right';

      if (this.props.tabPosition != nextProps.tabPosition || this.props.panels.length != nextProps.panels.length) {
        setTimeout(function () {
          _this2.setTabContentInfo();

          _this2.scrollTo(nextProps.activeIndex);
        }, 100);
      } else if (this.props.activeIndex != nextProps.activeIndex) {
        this.scrollTo(nextProps.activeIndex);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.props.prefixCls;
      var scrollLeft = this.state.scrollLeft;
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-content"),
        ref: "tabContent",
        style: {
          marginLeft: -scrollLeft
        }
      }, this.getTabPanels());
    }
  }]);
  return TabContent;
}(_react.Component);

var _default = TabContent;
exports.default = _default;