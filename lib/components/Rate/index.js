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

var _Icon = _interopRequireDefault(require("../Icon"));

var _RateItem = _interopRequireDefault(require("./RateItem"));

var prefixCls = "k-rate";

var Rate =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Rate, _Component);

  function Rate(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Rate);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Rate).call(this, props));

    _this.handleStarHover = function (value) {
      var _this$props = _this.props,
          onHoverChange = _this$props.onHoverChange,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      _this.setState({
        value: value
      });

      if (onHoverChange) {
        onHoverChange(value);
      }
    };

    _this.handleStarClick = function (value) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          disabled = _this$props2.disabled;

      if (disabled) {
        return;
      }

      if (!("value" in _this.props)) {
        _this.setState({
          value: value,
          orgValue: value
        });
      }

      if (onChange) {
        onChange(value);
      }
    };

    _this.handleLeave = function () {
      _this.setState({
        value: _this.state.orgValue
      });
    };

    var _value = props.defaultValue;

    if ("value" in props) {
      _value = props.value;
    }

    _this.state = {
      value: _value,
      orgValue: _value
    };
    return _this;
  }

  (0, _createClass2.default)(Rate, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("value" in nextProps) {
        this.setState({
          value: nextProps.value,
          orgValue: nextProps.value
        });
      }
    }
  }, {
    key: "renderStars",
    value: function renderStars() {
      var _this$props3 = this.props,
          count = _this$props3.count,
          character = _this$props3.character,
          allowHalf = _this$props3.allowHalf,
          disabled = _this$props3.disabled;
      var value = this.state.value;
      var items = [];

      for (var i = 0; i < count; i++) {
        items.push(_react.default.createElement(_RateItem.default, {
          key: i,
          current: value,
          value: i + 1,
          prefixCls: prefixCls,
          character: character,
          allowHalf: allowHalf,
          onHover: this.handleStarHover,
          onClick: this.handleStarClick
        }));
      }

      return items;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var disabled = this.props.disabled;
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classnames, "disabled", disabled), _classnames));
      return _react.default.createElement("ul", {
        className: classString,
        onMouseLeave: this.handleLeave,
        style: this.props.style
      }, this.renderStars());
    }
  }]);
  return Rate;
}(_react.Component);

Rate.propType = {
  allowHalf: _propTypes.default.bool,
  count: _propTypes.default.number,
  defaultValue: _propTypes.default.number,
  value: _propTypes.default.number,
  character: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  onHoverChange: _propTypes.default.func,
  onChange: _propTypes.default.func
};
Rate.defaultProps = {
  allowHalf: false,
  count: 5,
  character: _react.default.createElement(_Icon.default, {
    type: "star",
    theme: "filled"
  }),
  defaultValue: 0,
  disabled: false
};
var _default = Rate;
exports.default = _default;