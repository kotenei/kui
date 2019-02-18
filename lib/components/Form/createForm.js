"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createForm = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _validate = _interopRequireDefault(require("./validate"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var createForm = function createForm(WrappedComponent) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(_temp, _Component);

    function _temp(props) {
      var _this;

      (0, _classCallCheck2.default)(this, _temp);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_temp).call(this, props));
      _this.state = {
        fields: {}
      };

      _this.init = function (instance) {
        if (!instance) {
          return;
        }

        var _instance$props = instance.props,
            fieldName = _instance$props.fieldName,
            initialValue = _instance$props.initialValue;

        if (fieldName) {
          _this.setFieldValue(fieldName, initialValue);

          _this.instances[fieldName] = instance;
        }
      };

      _this.getFieldValue = function (fieldName) {
        return _this.state.fields[fieldName];
      };

      _this.setFieldValue = function (fieldName, value, callback) {
        _this.setState(function (state) {
          state.fields[fieldName] = value;
          return state;
        }, callback);
      };

      _this.validateField = function (fieldName) {
        var instance = _this.instances[fieldName];

        if (instance && instance.validate) {
          instance.validate();
        }
      };

      _this.validateFields = function (callback) {
        var valid = true;
        var count = 0;
        var length = Object.keys(_this.instances).length;
        var err;

        var _loop = function _loop(key) {
          if (_this.instances.hasOwnProperty(key)) {
            var instance = _this.instances[key];
            var errorMessage = instance.state.errorMessage;

            if (errorMessage) {
              if (!err) {
                err = {};
              }

              count++;
              err[key] = errorMessage;

              if (typeof callback === "function" && count === length) {
                callback(err, _this.state.fields);
              }
            } else {
              if (instance.validate) {
                instance.validate(function (result, message) {
                  count++;

                  if (!result) {
                    if (!err) {
                      err = {};
                    }

                    err[key] = message;
                  }

                  if (typeof callback === "function" && count === length) {
                    callback(err, _this.state.fields);
                  }
                });
              }
            }
          }
        };

        for (var key in _this.instances) {
          _loop(key);
        }
      };

      _this.resetFields = function () {
        for (var key in _this.instances) {
          if (_this.instances.hasOwnProperty(key)) {
            var instance = _this.instances[key];
            instance.resetField();
          }
        }
      };

      _this.removeField = function (fieldName) {
        var fields = _this.state.fields;
        var newFields = (0, _objectSpread2.default)({}, fields);

        if (_this.instances.hasOwnProperty(fieldName)) {
          delete _this.instances[fieldName];
          delete newFields[fieldName];

          _this.setState({
            fields: newFields
          });
        }
      };

      _this.instances = {};
      return _this;
    }

    (0, _createClass2.default)(_temp, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = (0, _objectSpread2.default)({}, this.props, {
          form: {
            getFieldValue: this.getFieldValue,
            setFieldValue: this.setFieldValue,
            validateField: this.validateField,
            validateFields: this.validateFields,
            resetFields: this.resetFields
          }
        });
        return _react.default.createElement(_FormContext.default.Provider, {
          value: {
            form: {
              init: this.init,
              getFieldValue: this.getFieldValue,
              setFieldValue: this.setFieldValue,
              removeField: this.removeField
            }
          }
        }, _react.default.createElement(WrappedComponent, (0, _extends2.default)({}, props, {
          ref: function ref(_ref) {
            return _this2.instanceComponent = _ref;
          }
        })));
      }
    }]);
    return _temp;
  }(_react.Component), _temp;
};

exports.createForm = createForm;