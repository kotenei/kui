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

var _TabItem = _interopRequireDefault(require("./TabItem"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _Icon = _interopRequireDefault(require("../Icon"));

var TabNav =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TabNav, _Component);

  function TabNav(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TabNav);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TabNav).call(this, props));

    _this.handleTabClick = function (e, index) {
      var onTabClick = _this.props.onTabClick;

      if (onTabClick) {
        onTabClick(e, index);
      }
    };

    _this.handleTabAdd = function (e) {
      var onEdit = _this.props.onEdit;

      if (onEdit) {
        onEdit(e, 'add');
      }
    };

    _this.handleTabRemove = function (e, index) {
      var onEdit = _this.props.onEdit;

      if (onEdit) {
        onEdit(e, 'remove', index);
      }
    };

    _this.handlePrevClick = function (e) {
      var _this$state = _this.state,
          scrollLeft = _this$state.scrollLeft,
          scrollTop = _this$state.scrollTop;

      if (_this.isVertical) {
        scrollTop -= _this.tabsInfo.scrollHeight;

        if (scrollTop <= 0) {
          scrollTop = 0;
        }

        _this.setState({
          scrollTop: scrollTop
        });
      } else {
        scrollLeft -= _this.tabsInfo.scrollWidth;

        if (scrollLeft <= 0) {
          scrollLeft = 0;
        }

        _this.setState({
          scrollLeft: scrollLeft
        });
      }
    };

    _this.handleNextClick = function (e) {
      var _this$state2 = _this.state,
          scrollLeft = _this$state2.scrollLeft,
          scrollTop = _this$state2.scrollTop;
      var maxLeft = 0,
          maxTop = 0;

      if (_this.isVertical) {
        scrollTop += _this.tabsInfo.scrollHeight;
        maxTop = _this.tabsInfo.totalHeight - _this.tabsInfo.scrollHeight;

        if (scrollTop >= maxTop) {
          scrollTop = maxTop;
        }

        _this.setState({
          scrollTop: scrollTop
        });
      } else {
        scrollLeft += _this.tabsInfo.scrollWidth;
        maxLeft = _this.tabsInfo.totalWidth - _this.tabsInfo.scrollWidth;

        if (scrollLeft >= maxLeft) {
          scrollLeft = maxLeft;
        }

        _this.setState({
          scrollLeft: scrollLeft
        });
      }
    };

    _this.state = {
      scrollTop: 0,
      scrollLeft: 0,
      inkWidth: 0,
      inkHeight: 0,
      inkLeft: 0,
      inkTop: 0,
      scrolling: false
    };
    _this.isVertical = props.tabPosition == 'left' || props.tabPosition == 'right';
    return _this;
  }

  (0, _createClass2.default)(TabNav, [{
    key: "setTabsInfo",
    value: function setTabsInfo() {
      var activeIndex = this.props.activeIndex;
      this.tabsInfo = {
        arrHeight: [],
        arrWidth: [],
        arrLeft: [],
        arrTop: [],
        count: 0
      };

      var left = 0,
          top = 0,
          totalWidth = 0,
          totalHeight = 0,
          scrollWidth = _domUtils.default.outerWidth(this.refs.scroll),
          scrollHeight = _domUtils.default.outerHeight(this.refs.scroll),
          tabs = this.refs.scroll.getElementsByClassName("tab-item");

      for (var i = 0, w, h; i < tabs.length; i++) {
        w = _domUtils.default.outerWidth(tabs[i], true);
        h = _domUtils.default.outerHeight(tabs[i], true);
        totalWidth += w;
        totalHeight += h;
        this.tabsInfo.arrWidth.push(w);
        this.tabsInfo.arrHeight.push(h);
        this.tabsInfo.arrLeft.push(left);
        this.tabsInfo.arrTop.push(top);
        left += w;
        top += h;
      }

      this.tabsInfo.tabs = tabs;
      this.tabsInfo.maxLeft = totalWidth - scrollWidth;
      this.tabsInfo.maxHeight = totalHeight - scrollHeight;
      this.tabsInfo.count = tabs.length;
      this.tabsInfo.totalWidth = totalWidth;
      this.tabsInfo.totalHeight = totalHeight;
      this.tabsInfo.scrollWidth = scrollWidth;
      this.tabsInfo.scrollHeight = scrollHeight;
      this.tabsInfo.scrollOffset = _domUtils.default.offset(this.refs.scroll);
    }
  }, {
    key: "getTabs",
    value: function getTabs() {
      var _this2 = this;

      var _this$props = this.props,
          panels = _this$props.panels,
          onTabClick = _this$props.onTabClick,
          editable = _this$props.editable;
      var activeIndex = this.props.activeIndex;
      var items = [];
      panels.map(function (child, index) {
        if (!child) {
          return;
        }

        var _child$props = child.props,
            tab = _child$props.tab,
            disabled = _child$props.disabled;
        items.push(_react.default.createElement(_TabItem.default, {
          key: index,
          index: index,
          disabled: disabled,
          editable: editable && panels.length > 1,
          isActive: activeIndex == index,
          onClick: _this2.handleTabClick,
          onClose: _this2.handleTabRemove
        }, tab));
      });
      return items;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(index) {
      var _this$props2 = this.props,
          panels = _this$props2.panels,
          activeIndex = _this$props2.activeIndex;
      var props = this.state.props;
      var max = panels.length - 1;
      index = index != undefined ? index : activeIndex;

      if (index < 0) {
        index = 0;
      }

      if (index > max) {
        index = max;
      }

      if (this.isVertical) {
        this.verticalScroll(index);
      } else {
        this.horizontalScroll(index);
      }
    } //水平滚动

  }, {
    key: "horizontalScroll",
    value: function horizontalScroll(index) {
      var scrollLeft = this.state.scrollLeft;
      var type = this.props.type;

      var el = this.tabsInfo.tabs[index],
          offset = _domUtils.default.offset(el),
          position = _domUtils.default.position(el),
          ew = this.tabsInfo.arrWidth[index] - _domUtils.default.css(el, 'marginRight', true),
          tw = offset.left + this.tabsInfo.arrWidth[index],
          nw = this.tabsInfo.scrollOffset.left + this.tabsInfo.scrollWidth,
          left;

      if (offset.left < this.tabsInfo.scrollOffset.left) {
        left = this.tabsInfo.arrLeft[index];
      }

      if (tw > nw) {
        left = tw - nw - _domUtils.default.css(el, 'marginRight', true) + scrollLeft;
      }

      if (left != undefined) {
        this.setState({
          scrollLeft: left
        });
      }

      this.setState({
        inkLeft: position.left,
        inkWidth: ew
      });
    } //垂直滚动

  }, {
    key: "verticalScroll",
    value: function verticalScroll(index) {
      var scrollTop = this.state.scrollTop;

      var el = this.tabsInfo.tabs[index],
          offset = _domUtils.default.offset(el),
          position = _domUtils.default.position(el),
          eh = this.tabsInfo.arrHeight[index] - _domUtils.default.css(el, 'marginBottom', true),
          th = offset.top + this.tabsInfo.arrHeight[index],
          nh = this.tabsInfo.scrollOffset.top + this.tabsInfo.scrollHeight,
          top;

      if (offset.top < this.tabsInfo.scrollOffset.top) {
        top = this.tabsInfo.arrTop[index];
      }

      if (th > nh) {
        top = th - nh - _domUtils.default.css(el, 'marginBottom', true) + scrollTop;
      }

      if (top != undefined) {
        this.setState({
          scrollTop: top
        });
      }

      this.setState({
        inkTop: position.top,
        inkHeight: eh
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.setTabsInfo();

      if (!this.isVertical && this.tabsInfo.totalWidth > this.tabsInfo.scrollWidth || this.isVertical && this.tabsInfo.totalHeight > this.tabsInfo.scrollHeight) {
        this.setState({
          scrolling: true
        });
        setTimeout(function () {
          _this3.setTabsInfo();

          _this3.scrollTo();
        });
      } else {
        this.scrollTo();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this4 = this;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.isVertical = nextProps.tabPosition == 'left' || nextProps.tabPosition == 'right';

      if (this.props.tabPosition != nextProps.tabPosition || this.props.panels.length != nextProps.panels.length) {
        var _this$tabsInfo = this.tabsInfo,
            totalWidth = _this$tabsInfo.totalWidth,
            totalHeight = _this$tabsInfo.totalHeight,
            count = _this$tabsInfo.count;
        var _this$state3 = this.state,
            scrollLeft = _this$state3.scrollLeft,
            scrollTop = _this$state3.scrollTop;
        this.timeout = setTimeout(function () {
          _this4.setTabsInfo();

          if (!_this4.isVertical && _this4.tabsInfo.totalWidth > _this4.tabsInfo.scrollWidth || _this4.isVertical && _this4.tabsInfo.totalHeight > _this4.tabsInfo.scrollHeight) {
            _this4.setState({
              scrolling: true
            });
          } else {
            _this4.setState({
              scrolling: false,
              scrollLeft: 0,
              scrollTop: 0
            });
          }

          setTimeout(function () {
            _this4.setTabsInfo();

            if (count > nextProps.panels.length) {
              var lastIndex = _this4.tabsInfo.count - 1,
                  el = _this4.tabsInfo.tabs[lastIndex],
                  offset = _domUtils.default.offset(el),
                  num;

              if (_this4.isVertical) {
                var th = offset.top + _this4.tabsInfo.arrHeight[lastIndex],
                    nh = _this4.tabsInfo.scrollOffset.top + _this4.tabsInfo.scrollHeight;

                if (th < nh) {
                  num = th - nh - _domUtils.default.css(el, 'marginBottom', true) + scrollTop;

                  _this4.setState({
                    scrollTop: num
                  });
                }
              } else {
                var tw = offset.left + _this4.tabsInfo.arrWidth[lastIndex],
                    nw = _this4.tabsInfo.scrollOffset.left + _this4.tabsInfo.scrollWidth;

                if (tw < nw) {
                  num = tw - nw - _domUtils.default.css(el, 'marginRight', true) + scrollLeft;

                  _this4.setState({
                    scrollLeft: num
                  });
                }
              }
            } else {
              _this4.scrollTo(nextProps.activeIndex);
            }
          }, 100);
        }, 100);
      } else if (this.props.activeIndex != nextProps.activeIndex) {
        this.scrollTo(nextProps.activeIndex);
      }
    }
  }, {
    key: "renderTabsContainer",
    value: function renderTabsContainer() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          type = _this$props3.type;
      var _this$state4 = this.state,
          inkTop = _this$state4.inkTop,
          inkLeft = _this$state4.inkLeft,
          inkWidth = _this$state4.inkWidth,
          inkHeight = _this$state4.inkHeight,
          scrollLeft = _this$state4.scrollLeft,
          scrolling = _this$state4.scrolling,
          scrollTop = _this$state4.scrollTop;
      var navStyle, inkStyle;

      if (this.isVertical) {
        navStyle = {
          transform: "translate3d(0px, -".concat(scrollTop, "px, 0px)")
        };
        inkStyle = {
          height: inkHeight,
          transform: "translate3d(0px, ".concat(inkTop, "px, 0px)")
        };
      } else {
        navStyle = {
          transform: "translate3d(-".concat(scrollLeft, "px, 0px, 0px)")
        };
        inkStyle = {
          width: inkWidth,
          transform: "translate3d(".concat(inkLeft, "px, 0px, 0px)")
        };
      }

      return _react.default.createElement("div", {
        className: (0, _classnames2.default)("".concat(prefixCls, "-nav-container"), {
          'scrolling': scrolling
        })
      }, _react.default.createElement("span", {
        className: (0, _classnames2.default)("".concat(prefixCls, "-tab-prev"), {
          'disabled': !scrolling
        }),
        onClick: this.handlePrevClick
      }, _react.default.createElement(_Icon.default, {
        type: this.isVertical ? 'up' : 'left'
      })), _react.default.createElement("span", {
        className: (0, _classnames2.default)("".concat(prefixCls, "-tab-next"), {
          'disabled': !scrolling
        }),
        onClick: this.handleNextClick
      }, _react.default.createElement(_Icon.default, {
        type: this.isVertical ? 'down' : 'right'
      })), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-nav-scroll"),
        ref: "scroll"
      }, _react.default.createElement("ul", {
        className: "".concat(prefixCls, "-nav"),
        style: navStyle
      }, type == 'line' ? _react.default.createElement("li", {
        className: "".concat(prefixCls, "-ink-bar"),
        style: inkStyle
      }) : null, this.getTabs())));
    }
  }, {
    key: "renderExtraContent",
    value: function renderExtraContent() {
      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          editable = _this$props4.editable,
          extraContent = _this$props4.extraContent,
          hideAdd = _this$props4.hideAdd;
      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-extra-content")
      }, editable && !hideAdd ? _react.default.createElement(_Icon.default, {
        type: "plus-square",
        onClick: this.handleTabAdd
      }) : null, extraContent);
    }
  }, {
    key: "render",
    value: function render() {
      var prefixCls = this.props.prefixCls;
      var classString = (0, _classnames2.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-bar"), true));
      return _react.default.createElement("div", {
        className: classString
      }, this.isVertical ? null : this.renderExtraContent(), this.renderTabsContainer(), this.isVertical ? this.renderExtraContent() : null);
    }
  }]);
  return TabNav;
}(_react.Component);

var _default = TabNav;
exports.default = _default;