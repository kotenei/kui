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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var Checkbox =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Checkbox, _Component);

  function Checkbox(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Checkbox);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Checkbox).call(this, props));

    _this.handleClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      checked: props.checked || props.defaultChecked || false,
      value: props.value
    };
    return _this;
  }

  (0, _createClass2.default)(Checkbox, [{
    key: "handleChange",
    value: function handleChange(e) {
      var _this$props = this.props,
          onChange = _this$props.onChange,
          option = _this$props.option;

      if (onChange) {
        onChange(e, option);
      }

      this.setState({
        checked: e.target.checked
      });
    }
  }, {
    key: "renderMode",
    value: function renderMode(checked) {
      var mode = this.props.mode;

      switch (mode) {
        case "normal":
          return this.renderMaterial(checked);

        case "toggle":
          return this.renderToggle();

        default:
          return null;
      }
    }
  }, {
    key: "renderMaterial",
    value: function renderMaterial(checked) {
      var indeterminate = this.props.indeterminate;
      return _react.default.createElement("span", {
        className: (0, _classnames2.default)({
          material: true,
          indeterminate: indeterminate && !checked,
          checked: checked
        })
      }, _react.default.createElement("span", {
        className: (0, _classnames2.default)({
          check: true
        })
      }));
    }
  }, {
    key: "renderToggle",
    value: function renderToggle() {
      return _react.default.createElement("span", {
        className: "toggle"
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var checkboxGroup = this.context.checkboxGroup;
      var checkboxProps = (0, _objectSpread2.default)({}, this.props);

      if (checkboxGroup) {
        checkboxProps.name = checkboxGroup.name;
        checkboxProps.inline = checkboxGroup.inline;
        checkboxProps.disabled = checkboxProps.disabled || checkboxGroup.disabled;
        checkboxProps.checked = checkboxGroup.value.indexOf(checkboxProps.value) !== -1;

        checkboxProps.onChange = function (e) {
          return checkboxGroup.onChange(e, {
            text: checkboxProps.children,
            value: checkboxProps.value
          });
        };
      }

      var disabled = checkboxProps.disabled,
          children = checkboxProps.children,
          mode = checkboxProps.mode,
          name = checkboxProps.name,
          inline = checkboxProps.inline,
          checked = checkboxProps.checked,
          value = checkboxProps.value,
          className = checkboxProps.className;
      var prefixCls = "k-checkbox";
      var classString = (0, _classnames2.default)(className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-material"), mode == "material"), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-toggle"), mode == "toggle"), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-inline"), checkboxProps.inline), (0, _defineProperty2.default)(_classnames, "disabled", disabled), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, _react.default.createElement("label", null, _react.default.createElement("input", {
        type: "checkbox",
        className: mode == "none" ? "normal" : "",
        name: name,
        value: value,
        disabled: disabled,
        checked: checked,
        onClick: this.handleClick,
        onChange: checkboxProps.onChange || this.handleChange
      }), this.renderMode(checkboxProps.checked), children ? _react.default.createElement("span", {
        className: "content"
      }, children) : null));
    }
  }]);
  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  option: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  indeterminate: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  mode: _propTypes.default.oneOf(["none", "normal", "toggle"]),
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool]),
  onChange: _propTypes.default.func
};
Checkbox.defaultProps = {
  inline: false,
  indeterminate: false,
  mode: "normal"
};
Checkbox.contextTypes = {
  checkboxGroup: _propTypes.default.any
};
var _default = Checkbox;
exports.default = _default;