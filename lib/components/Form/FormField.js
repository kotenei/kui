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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactTransitionGroup = require("react-transition-group");

var _validate = _interopRequireDefault(require("./validate"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var prefixCls = "k-form-field";

var FormField =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FormField, _Component);

  function FormField() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FormField);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FormField)).call.apply(_getPrototypeOf2, [this].concat(_args)));
    _this.state = {
      errorMessage: "",
      value: undefined
    };

    _this.handleChange = function () {
      var _this$props = _this.props,
          getValueFromEvent = _this$props.getValueFromEvent,
          fieldName = _this$props.fieldName;
      var form = _this.context.form;
      var value;

      if (getValueFromEvent) {
        value = getValueFromEvent.apply(void 0, arguments);
      } else {
        var e = arguments.length <= 0 ? undefined : arguments[0];

        if (e && e.target) {
          var target = e.target;
          value = target.type === "checkbox" || target.type === "radio" ? target.checked : target.value;
        } else {
          value = e;
        }
      }

      if (form) {
        form.setFieldValue(fieldName, value, function () {
          _this.validate();
        });
      } else {
        _this.setState({
          value: value
        }, function () {
          _this.validate();
        });
      }
    };

    _this.handleFocus = function () {
      var focusClear = _this.props.focusClear;

      if (focusClear) {
        _this.setState({
          errorMessage: ""
        });
      }
    };

    _this.handleBlur = function () {
      var focusClear = _this.props.focusClear;

      if (focusClear) {
        _this.validate();
      }
    };

    _this.setError = function (msg) {
      var errorMessage = _this.state.errorMessage;

      if (typeof msg === "string") {
        _this.setState({
          errorMessage: msg
        });
      }
    };

    _this.validate = function (callback) {
      var _this$props2 = _this.props,
          validator = _this$props2.validator,
          fieldName = _this$props2.fieldName;
      var form = _this.context.form;
      var result = true;
      var message;
      var value = form ? form.getFieldValue(fieldName) : _this.state.value;

      if (_this.rules) {
        for (var method in _this.rules) {
          var rule = _this.rules[method];
          result = _validate.default.methods[method](value, rule.params);

          if (!result) {
            message = _this.formatMessage(rule.message, rule.params);
            break;
          }
        }
      }

      _this.setState({
        errorMessage: message
      }, function () {
        if (validator) {
          validator(value, function (msg) {
            if (msg) {
              result = false;
              message = msg;
            }

            _this.setState({
              errorMessage: message
            }, function () {
              if (typeof callback === "function") {
                callback(result, message);
              }
            });
          });
        } else {
          if (typeof callback === "function") {
            callback(result, message);
          }
        }
      });
    };

    _this.resetField = function () {
      var _this$props3 = _this.props,
          fieldName = _this$props3.fieldName,
          initialValue = _this$props3.initialValue;
      var form = _this.context.form;

      if (form) {
        form.setFieldValue(fieldName, initialValue, function () {
          _this.setState({
            errorMessage: ""
          });
        });
      }
    };

    return _this;
  }

  (0, _createClass2.default)(FormField, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var fieldName = props.fieldName,
          rules = props.rules;
      var count = 0;
      this.rules = {};

      if (rules && rules.length > 0) {
        rules.forEach(function (rule) {
          if (rule.required) {
            _this2.rules["required"] = {
              message: rule.message || _validate.default.messages["required"],
              params: rule.params
            };
            count++;
          } else if (rule.type) {
            _this2.rules[rule.type] = {
              message: rule.message || _validate.default.messages[rule.type],
              params: rule.params
            };
            count++;
          }
        });
      }

      if (count === 0 && this.state.errorMessage) {
        this.setState({
          errorMessage: ""
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var form = this.context.form;

      if (form) {
        form.init(this);
      }

      this.init();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.init(nextProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var form = this.context.form;
      var fieldName = this.props.fieldName;

      if (form) {
        form.removeField(fieldName);
      }
    }
  }, {
    key: "renderError",
    value: function renderError() {
      var errorMessage = this.state.errorMessage;
      return _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, errorMessage ? _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        timeout: 300,
        classNames: "slide-down"
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "__error")
      }, errorMessage)) : null);
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props4 = this.props,
          className = _this$props4.className,
          children = _this$props4.children,
          fieldName = _this$props4.fieldName,
          style = _this$props4.style,
          tooltip = _this$props4.tooltip,
          tooltipPlacement = _this$props4.tooltipPlacement;
      var errorMessage = this.state.errorMessage;
      var form = this.context.form;
      var value = form ? form.getFieldValue(fieldName) : this.state.value;

      var content = _react.default.cloneElement(children, (0, _objectSpread2.default)({
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        value: value
      }, children.props));

      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "--error"), errorMessage), _classnames), className);
      return _react.default.createElement("div", {
        className: classString,
        style: style
      }, tooltip ? _react.default.createElement(_Tooltip.default, {
        title: errorMessage,
        kStyle: "danger",
        show: errorMessage ? true : false,
        placement: tooltipPlacement
      }, content) : content, !tooltip && this.renderError());
    }
  }, {
    key: "formatMessage",
    value: function formatMessage(message, params) {
      if (message.indexOf("{0}") != -1) {
        if (!Array.isArray(params)) {
          params = [params];
        }

        params.forEach(function (v, i) {
          message = message.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
            return v;
          });
        });
      }

      return message;
    }
  }]);
  return FormField;
}(_react.Component);

FormField.contextType = _FormContext.default;
FormField.propTypes = {
  fieldName: _propTypes.default.string.isRequired,
  focusClear: _propTypes.default.bool,
  initialValue: _propTypes.default.any,
  getValueFromEvent: _propTypes.default.func,
  rules: _propTypes.default.array,
  validator: _propTypes.default.func,
  tooltip: _propTypes.default.bool,
  tooltipPlacement: _propTypes.default.oneOf(["top", "left", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"])
};
FormField.defaultProps = {
  focusClear: false,
  tooltip: false,
  tooltipPlacement: "right"
};
var _default = FormField;
exports.default = _default;