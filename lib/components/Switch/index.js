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

var prefixCls = "k-switch";

var Switch =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Switch, _Component);

  function Switch(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Switch);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Switch).call(this, props));

    _this.handleChange = function (e) {
      var checked = _this.state.checked;
      var onChange = _this.props.onChange;
      var newChecked = !checked;

      if (!("checked" in _this.props)) {
        _this.setState({
          checked: newChecked
        });
      }

      if (onChange) {
        onChange(newChecked);
      }
    };

    var _checked = props.defaultChecked;

    if ("checked" in props) {
      _checked = props.checked;
    }

    _this.state = {
      checked: _checked
    };
    return _this;
  }

  (0, _createClass2.default)(Switch, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("checked" in nextProps) {
        this.setState({
          checked: nextProps.checked
        });
      }
    }
  }, {
    key: "renderInner",
    value: function renderInner() {
      var _this$props = this.props,
          checkedContent = _this$props.checkedContent,
          unCheckedContent = _this$props.unCheckedContent;
      var checked = this.state.checked;

      if (checked) {
        return checkedContent;
      } else {
        return unCheckedContent;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          loading = _this$props2.loading;
      var checked = this.state.checked;
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-checked"), checked), (0, _defineProperty2.default)(_classnames, "disabled", disabled), (0, _defineProperty2.default)(_classnames, "loading", loading), _classnames));
      return _react.default.createElement("div", {
        className: classString,
        onClick: this.handleChange
      }, _react.default.createElement("span", {
        className: "".concat(prefixCls, "-inner")
      }, this.renderInner(), _react.default.createElement("span", {
        className: "".concat(prefixCls, "-inner__dot")
      }, loading ? _react.default.createElement(_Icon.default, {
        type: "loading"
      }) : null)));
    }
  }]);
  return Switch;
}(_react.Component);

Switch.propTypes = {
  defaultChecked: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  checkedContent: _propTypes.default.node,
  unCheckedContent: _propTypes.default.node,
  onChange: _propTypes.default.func
};
Switch.defaultProps = {
  defaultChecked: false,
  disabled: false,
  loading: false
};
var _default = Switch;
exports.default = _default;