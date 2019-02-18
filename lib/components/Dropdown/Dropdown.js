"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactTransitionGroup = require("react-transition-group");

var _utils = require("../../utils");

var _PopPanel = _interopRequireDefault(require("../PopPanel"));

var seed = 1;
var instances = {};

var Dropdown =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Dropdown, _Component);

  function Dropdown(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Dropdown);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dropdown).call(this, props));

    _this.handleMouseEnter = function (e) {
      var trigger = _this.props.trigger;

      if (trigger == "click" || trigger == "manual") {
        return;
      }

      _this.show();
    };

    _this.handleMouseLeave = function (e) {
      var trigger = _this.props.trigger;

      if (trigger == "click" || trigger == "manual") {
        return;
      }

      _this.hide();
    };

    _this.handleClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var show = _this.state.show;
      var trigger = _this.props.trigger;

      if (trigger == "hover" || trigger == "manual") {
        return;
      }

      if (show) {
        _this.hide();
      } else {
        _this.show();
      }

      _this.hideOther();
    };

    _this.handleMenuEnter = function (e) {
      var trigger = _this.props.trigger;

      if (trigger == "click" || trigger == "manual") {
        return;
      }

      _this.show();
    };

    _this.handleMenuLeave = function (e) {
      var trigger = _this.props.trigger;

      if (trigger == "click" || trigger == "manual") {
        return;
      }

      _this.hide();
    };

    _this.handleMenuSelect = function (e, selectedIds, info) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          multiple = _this$props.multiple;

      if (onSelect) {
        onSelect(e, selectedIds, info);
      }

      if (!multiple) {
        _this.hide();
      }
    };

    _this.show = function () {
      var disabled = _this.props.disabled;

      if (disabled) {
        return;
      }

      if (_this.tm) {
        clearTimeout(_this.tm);
      }

      _this.tm = setTimeout(function () {
        _this.setState({
          show: true
        });
      }, 100);
    };

    _this.hide = function () {
      if (_this.tm) {
        clearTimeout(_this.tm);
      }

      if (!_this.mounted) {
        return;
      }

      _this.tm = setTimeout(function () {
        _this.setState({
          show: false
        });
      }, 300);
    };

    _this.state = {
      show: false
    };
    _this.id = "dropdown_".concat(seed++);
    instances[_this.id] = (0, _assertThisInitialized2.default)(_this);
    return _this;
  }

  (0, _createClass2.default)(Dropdown, [{
    key: "hideOther",
    value: function hideOther() {
      for (var k in instances) {
        if (k == this.id) {
          continue;
        }

        instances[k].hide();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      document.addEventListener("click", this.hide);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("show" in nextProps) {
        if (nextProps.show) {
          this.show();
        } else {
          this.hide();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tm) {
        clearTimeout(this.tm);
      }

      document.removeEventListener("click", this.hide);
      delete instances[this.id];
      this.mounted = false;
      ;
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this$props2 = this.props,
          menu = _this$props2.menu,
          prefixCls = _this$props2.prefixCls,
          multiple = _this$props2.multiple,
          selectedIds = _this$props2.selectedIds;
      return menu && _react.default.cloneElement(menu, (0, _objectSpread2.default)({}, menu.props, {
        multiple: multiple,
        selectedIds: selectedIds,
        mode: "vertical",
        className: (0, _classnames3.default)(menu.props.className, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-menu"), true)),
        onMouseEnter: this.handleMenuEnter,
        onMouseLeave: this.handleMenuLeave,
        onSelect: this.handleMenuSelect
      }));
    }
  }, {
    key: "renderChilren",
    value: function renderChilren() {
      var _this2 = this;

      var children = this.props.children;
      return _react.default.Children.map(children, function (child) {
        if (!child) {
          return null;
        }

        var handle = {};

        if (child.props.trigger && child.props.trigger == "dropdown" || !Array.isArray(children)) {
          handle = {
            onMouseEnter: _this2.handleMouseEnter,
            onMouseLeave: _this2.handleMouseLeave,
            onClick: _this2.handleClick
          };
        }

        return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, child.props, handle));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          className = _this$props3.className,
          style = _this$props3.style,
          Container = _this$props3.component,
          placement = _this$props3.placement,
          fullWidth = _this$props3.fullWidth;
      var show = this.state.show;
      var classString = (0, _classnames3.default)(className, (0, _defineProperty2.default)({}, "".concat(prefixCls), true));

      var input = _react.default.createElement(Container, {
        className: classString,
        ref: "trigger",
        style: style
      }, this.renderChilren());

      return _react.default.createElement(_PopPanel.default, {
        fullWidth: fullWidth,
        open: show,
        input: input,
        placement: placement
      }, this.renderMenu());
    }
  }]);
  return Dropdown;
}(_react.Component);

Dropdown.propTypes = {
  fullWidth: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  component: _propTypes.default.any,
  menu: _propTypes.default.element,
  selectedIds: _propTypes.default.array,
  trigger: _propTypes.default.oneOf(["click", "hover", "manual"]),
  placement: _propTypes.default.oneOf(["topLeft", "top", "topRight", "bottomLeft", "bottom", "bottomRight"]),
  disabled: _propTypes.default.bool,
  multiple: _propTypes.default.bool,
  show: _propTypes.default.bool,
  onSelect: _propTypes.default.func
};
Dropdown.defaultProps = {
  fullWidth: false,
  prefixCls: "k-dropdown",
  component: "div",
  selectedIds: [],
  placement: "bottomLeft",
  trigger: "hover",
  disabled: false,
  multiple: false
};
var _default = Dropdown;
exports.default = _default;