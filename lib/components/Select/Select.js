"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var _Icon = _interopRequireDefault(require("../Icon"));

var _Dropdown = _interopRequireDefault(require("../Dropdown"));

var _Menu = _interopRequireDefault(require("../Menu"));

var _Button = _interopRequireDefault(require("../Button"));

var _MultipleList = _interopRequireDefault(require("../MultipleList"));

var prefixCls = "k-select";

var SelectContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SelectContainer, _Component);

  function SelectContainer() {
    (0, _classCallCheck2.default)(this, SelectContainer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SelectContainer).apply(this, arguments));
  }

  (0, _createClass2.default)(SelectContainer, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: this.props.className
      }, this.props.children);
    }
  }]);
  return SelectContainer;
}(_react.Component);

var Select =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(Select, _Component2);

  function Select(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Select);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).call(this, props));

    _this.handleOptionSelect = function (e, selectedIds, info) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange;
      var value = _this.state.value;

      if (multiple) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }

      if (!("value" in _this.props)) {
        _this.setState({
          value: selectedIds
        });
      }

      if (onSelect) {
        onSelect(selectedIds);
      }

      if (onChange) {
        onChange(selectedIds);
      }
    };

    _this.handleItemRemove = function (e, item) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          multiple = _this$props2.multiple,
          onChange = _this$props2.onChange;
      var value = _this.state.value;

      if (disabled) {
        return;
      }

      var newValue = (0, _toConsumableArray2.default)(value);
      var index = value.indexOf(item.value);

      _this.refs.dropdown.hide();

      if (!multiple) {
        return;
      }

      if (index != -1) {
        newValue.splice(index, 1);

        if (!("value" in _this.props)) {
          _this.setState({
            value: newValue
          });
        }
      }

      if (onChange) {
        onChange(newValue);
      }
    };

    _this.handleMultipleListClick = function (e) {
      var disabled = _this.props.disabled;
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (disabled) {
        return;
      }

      _this.refs.dropdown.show();
    };

    _this.state = {
      value: props.value || props.defaultValue
    };
    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var children = this.props.children;
      this.optionsMap = {};

      _react.default.Children.forEach(children, function (child) {
        if (!child) {
          return false;
        }

        _this2.optionsMap[child.props.value] = {
          children: child.props.chidlren,
          text: child.props.title || child.props.value,
          value: child.props.value
        };
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var multiple = this.props.multiple;

      if ("value" in nextProps) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var _this3 = this;

      var children = this.props.children;
      var items = [];

      _react.default.Children.forEach(children, function (child, index) {
        if (!child) {
          return false;
        }

        items.push(_react.default.cloneElement(child, (0, _objectSpread2.default)({
          key: index,
          index: index
        }, child.props, {
          onClick: _this3.handleOptionClick
        })));
      });

      return _react.default.createElement(_Menu.default, {
        multiple: true
      }, items);
    }
  }, {
    key: "renderContainer",
    value: function renderContainer() {
      var _this4 = this;

      var _this$props3 = this.props,
          multiple = _this$props3.multiple,
          placeholder = _this$props3.placeholder,
          disabled = _this$props3.disabled,
          kSize = _this$props3.kSize;
      var value = this.state.value;
      var valList = [];

      if (value && value.length > 0 && this.optionsMap) {
        value.forEach(function (v) {
          if (_this4.optionsMap[v]) {
            valList.push({
              text: _this4.optionsMap[v].text,
              value: v
            });
          }
        });
      }

      if (!multiple) {
        return _react.default.createElement("div", null, _react.default.createElement("div", {
          className: "".concat(prefixCls, "-").concat(multiple ? "multiple" : "single")
        }, valList.length == 0 ? _react.default.createElement("span", {
          className: "".concat(prefixCls, "-placeholder")
        }, placeholder) : valList[0].text, _react.default.createElement(_Icon.default, {
          type: "caret-down",
          className: "icon-caretdown"
        })));
      } else {
        return _react.default.createElement(_MultipleList.default, {
          value: valList,
          placeholder: placeholder,
          onItemRemove: this.handleItemRemove,
          disabled: disabled,
          kSize: kSize
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          placeholder = _this$props4.placeholder,
          multiple = _this$props4.multiple,
          disabled = _this$props4.disabled;
      var value = this.state.value;
      var classes = (0, _kUtils.getClassSet)(this.props);
      var classString = (0, _classnames.default)(classes, {
        disabled: disabled
      });
      return _react.default.createElement(_Dropdown.default, {
        ref: "dropdown",
        menu: this.renderOptions(),
        className: classString,
        trigger: "click",
        onSelect: this.handleOptionSelect,
        selectedIds: value,
        multiple: multiple,
        disabled: disabled
      }, this.renderContainer());
    }
  }]);
  return Select;
}(_react.Component);

Select.propTypes = {
  multiple: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  defaultValue: _propTypes.default.array,
  value: _propTypes.default.array,
  onChange: _propTypes.default.func,
  onSelect: _propTypes.default.func
};
Select.defaultProps = {
  multiple: false,
  disabled: false,
  defaultValue: []
};

var _default = (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], (0, _kUtils.kClass)(prefixCls, Select));

exports.default = _default;