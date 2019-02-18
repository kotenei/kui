"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Input = _interopRequireDefault(require("../Input"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var _Icon = _interopRequireDefault(require("../Icon"));

var _reactTransitionGroup = require("react-transition-group");

var seed = 1;
var prefixCls = "k-multiple-list";

var MultipleList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MultipleList, _Component);

  function MultipleList(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MultipleList);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MultipleList).call(this, props));

    _this.handleClick = function (e) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e);
      }
    };

    _this.handleFocus = function (e) {
      var onFocus = _this.props.onFocus;

      if (onFocus) {
        onFocus(e);
      }
    };

    _this.handleBlur = function (e) {
      var onBlur = _this.props.onBlur;

      if (onBlur) {
        onBlur(e);
      }
    };

    _this.handleKeyUp = function (e) {
      var onKeyUp = _this.props.onKeyUp;

      if (onKeyUp) {
        onKeyUp(e);
      }
    };

    _this.handleChange = function (e) {
      var target = e.target;
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(e);
      }
    };

    _this.handleItemRemove = function (item, e) {
      var onItemRemove = _this.props.onItemRemove;

      if (onItemRemove) {
        onItemRemove(e, item);
      }
    };

    _this.state = {
      inputValue: props.inputValue
    };
    _this.id = "multiplelist_".concat(seed++);
    return _this;
  }

  (0, _createClass2.default)(MultipleList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("inputValue" in nextProps) {
        this.setState({
          inputValue: nextProps.inputValue
        });
      }
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this2 = this;

      var _this$props = this.props,
          value = _this$props.value,
          showInput = _this$props.showInput,
          kSize = _this$props.kSize,
          placeholder = _this$props.placeholder;
      var inputValue = this.state.inputValue;
      var items = [];
      value.forEach(function (v, i) {
        var item = v;

        if (typeof v === "string") {
          item = {
            text: v,
            value: v
          };
        }

        items.push(_react.default.createElement(_reactTransitionGroup.CSSTransition, {
          key: i,
          timeout: 300,
          classNames: "fade"
        }, _react.default.createElement("li", {
          className: "item",
          title: item.text
        }, _react.default.createElement("div", {
          className: "".concat(prefixCls, "-choice-content")
        }, item.text), _react.default.createElement(_Icon.default, {
          type: "close",
          onClick: _this2.handleItemRemove.bind(_this2, item)
        }))));
      });

      if (showInput) {
        items.push(_react.default.createElement(_reactTransitionGroup.CSSTransition, {
          key: "input_".concat(this.id),
          timeout: 300,
          classNames: "fade"
        }, _react.default.createElement("li", {
          key: "li-".concat(this.id),
          style: {
            width: "100%",
            flex: 1
          }
        }, _react.default.createElement(_Input.default, {
          className: "".concat(prefixCls, "-input"),
          type: "text",
          kSize: kSize,
          placeholder: placeholder,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyUp: this.handleKeyUp,
          onChange: this.handleChange,
          value: inputValue,
          autoFocus: this.props.autoFocus
        }))));
      }

      return _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: "ul",
        className: "".concat(prefixCls, "-choice-list")
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          trigger = _this$props2.trigger,
          className = _this$props2.className,
          showInput = _this$props2.showInput,
          value = _this$props2.value,
          placeholder = _this$props2.placeholder,
          disabled = _this$props2.disabled;
      var classes = (0, _kUtils.getClassSet)(this.props);
      var classString = (0, _classnames.default)(classes, className, {
        disabled: disabled
      });
      return _react.default.createElement("div", {
        className: classString,
        onClick: this.handleClick
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-selection"),
        trigger: trigger
      }, this.renderList()), value.length == 0 && !showInput && placeholder ? _react.default.createElement("div", {
        title: placeholder,
        className: "".concat(prefixCls, "-placeholder")
      }, placeholder) : null);
    }
  }]);
  return MultipleList;
}(_react.Component);

MultipleList.propTypes = {
  ref: _propTypes.default.string,
  value: _propTypes.default.array,
  inputValue: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  showInput: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onItemRemove: _propTypes.default.func
};
MultipleList.defaultProps = {
  value: [],
  disabled: false,
  showInput: false
};

var _default = (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], (0, _kUtils.kClass)(prefixCls, MultipleList));

exports.default = _default;