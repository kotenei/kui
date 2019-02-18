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

var _propTypes = _interopRequireWildcard(require("prop-types"));

var _classnames5 = _interopRequireDefault(require("classnames"));

var _CarouselPanel = _interopRequireDefault(require("./CarouselPanel"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _kUtils = require("../../utils/kUtils");

var _reactTransitionGroup = require("react-transition-group");

var _Icon = _interopRequireDefault(require("../Icon"));

var prefixCls = "k-carousel";

var Carousel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Carousel, _Component);

  function Carousel(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Carousel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Carousel).call(this, props));

    _this.handleEnter = function (e) {
      _this.stop();
    };

    _this.handleLeave = function (e) {
      _this.isStop = false;

      _this.run();
    };

    _this.handleDotClick = function (index) {
      _this.stop();

      _this.active(index + 1);
    };

    _this.handlePrev = function () {
      var activeIndex = _this.state.activeIndex;
      var index = activeIndex - 1;

      _this.active(index);
    };

    _this.handleNext = function () {
      var activeIndex = _this.state.activeIndex;
      var index = activeIndex + 1;

      _this.active(index);
    };

    _this.state = {
      activeIndex: 1,
      width: 0,
      height: 0,
      totalWidth: 0,
      totalHeight: 0,
      transition: ""
    };
    return _this;
  }

  (0, _createClass2.default)(Carousel, [{
    key: "init",
    value: function init() {
      var children = this.props.children;
      var activeIndex = this.state.activeIndex;

      var len = children.length,
          max = len + 2,
          width = _domUtils.default.outerWidth(this.refs.carousel),
          height = _domUtils.default.outerHeight(this.refs.carousel),
          totalWidth = max * width,
          totalHeight = max * height,
          x = activeIndex * width,
          y = activeIndex * height;

      this.setState({
        max: max,
        width: width,
        height: height,
        totalWidth: totalWidth,
        totalHeight: totalHeight,
        x: x,
        y: y,
        transition: ""
      });
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      var _this$props = this.props,
          delay = _this$props.delay,
          autoplay = _this$props.autoplay;
      var activeIndex = this.state.activeIndex;

      if (autoplay && !this.isStop) {
        this.tm = setTimeout(function () {
          var index = activeIndex + 1;

          _this2.active(index, function () {
            _this2.run();
          });
        }, delay);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.tm) {
        clearTimeout(this.tm);
      }

      this.isStop = true;
    }
  }, {
    key: "active",
    value: function active(index, callback) {
      var _this3 = this;

      var vertical = this.props.vertical;
      var _this$state = this.state,
          width = _this$state.width,
          height = _this$state.height,
          max = _this$state.max;
      var transition = "all .3s ease",
          style,
          x,
          y;
      var tmpIndex = index;

      if (index == max) {
        index = 1;
        transition = "";
      }

      if (index < 0) {
        index = max - 2;
        transition = "";
      }

      if (vertical) {
        y = index * height;
        this.setState({
          y: y
        });
      } else {
        x = index * width;
        this.setState({
          x: x
        });
      }

      this.setState({
        transition: transition,
        activeIndex: tmpIndex
      }, function () {
        setTimeout(function () {
          if (index == max - 1) {
            _this3.setState({
              activeIndex: 1,
              x: width,
              y: height,
              transition: ""
            }, function () {
              if (callback) {
                callback.call(_this3);
              }
            });
          } else if (index == 0) {
            var num = max - 2;

            _this3.setState({
              activeIndex: num,
              x: num * width,
              y: num * height,
              transition: ""
            }, function () {
              if (callback) {
                callback.call(_this3);
              }
            });
          } else {
            if (callback) {
              callback.call(_this3);
            }
          }
        }, 300);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          delay = _this$props2.delay,
          max = _this$props2.max;
      this.init();
      this.run();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tm) {
        clearTimeout(this.tm);
      }
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          vertical = _this$props3.vertical;
      var _this$state2 = this.state,
          totalWidth = _this$state2.totalWidth,
          totalHeight = _this$state2.totalHeight,
          width = _this$state2.width,
          height = _this$state2.height,
          x = _this$state2.x,
          y = _this$state2.y,
          transition = _this$state2.transition;
      var items = [];
      var key = 0;
      var style = {
        transition: transition
      };

      _react.default.Children.forEach(children, function (child, index) {
        var props = {
          prefixCls: prefixCls,
          index: index,
          width: width,
          height: height,
          vertical: vertical
        };

        if (index == 0) {
          items.push(_react.default.createElement(_CarouselPanel.default, (0, _extends2.default)({
            key: key
          }, props), children[children.length - 1]));
          key++;
        }

        items.push(_react.default.createElement(_CarouselPanel.default, (0, _extends2.default)({
          key: key
        }, props), child));
        key++;

        if (index == children.length - 1) {
          items.push(_react.default.createElement(_CarouselPanel.default, (0, _extends2.default)({
            key: key
          }, props), children[0]));
        }
      });

      if (vertical) {
        style.height = totalHeight;
        style.transform = "translate3d(0px, -".concat(y, "px, 0px)");
      } else {
        style.width = totalWidth;
        style.transform = "translate3d(-".concat(x, "px, 0px, 0px)");
      }

      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-list"),
        style: style
      }, items);
    }
  }, {
    key: "renderDots",
    value: function renderDots() {
      var children = this.props.children;
      var _this$state3 = this.state,
          activeIndex = _this$state3.activeIndex,
          max = _this$state3.max;
      var items = [],
          len = children.length;
      var index = activeIndex - 1;

      if (index >= max - 2) {
        index = 0;
      }

      if (index < 0) {
        index = len - 1;
      }

      for (var i = 0; i < len; i++) {
        var _classnames;

        items.push(_react.default.createElement("span", {
          key: i,
          className: (0, _classnames5.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-dot"), true), (0, _defineProperty2.default)(_classnames, "active", index == i), _classnames)),
          onClick: this.handleDotClick.bind(this, i)
        }));
      }

      return items;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames2, _classnames3, _classnames4;

      var _this$props4 = this.props,
          children = _this$props4.children,
          height = _this$props4.height,
          vertical = _this$props4.vertical;
      var classString = (0, _classnames5.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-vertical"), vertical), _classnames2));
      return _react.default.createElement("div", {
        className: classString,
        ref: "carousel",
        style: {
          height: height
        },
        onMouseEnter: this.handleEnter,
        onMouseLeave: this.handleLeave
      }, this.renderList(), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-dots")
      }, this.renderDots()), _react.default.createElement("span", {
        className: (0, _classnames5.default)((_classnames3 = {}, (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-control"), true), (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-control-left"), true), _classnames3)),
        onClick: this.handlePrev
      }, _react.default.createElement(_Icon.default, {
        type: "left"
      })), _react.default.createElement("span", {
        className: (0, _classnames5.default)((_classnames4 = {}, (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-control"), true), (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-control-right"), true), _classnames4)),
        onClick: this.handleNext
      }, _react.default.createElement(_Icon.default, {
        type: "right"
      })));
    }
  }]);
  return Carousel;
}(_react.Component);

Carousel.propTypes = {
  height: _propTypes.default.number,
  delay: _propTypes.default.number,
  autoplay: _propTypes.default.bool,
  vertical: _propTypes.default.bool
};
Carousel.defaultProps = {
  height: 160,
  delay: 3000,
  autoplay: false,
  vertical: false
};
var _default = Carousel;
exports.default = _default;