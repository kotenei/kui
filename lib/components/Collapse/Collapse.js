"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var Collapse =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Collapse, _Component);

  function Collapse(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Collapse);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Collapse).call(this, props));

    _this.handleChange = function (e, id) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          accordion = _this$props.accordion;
      var activeIds = _this.state.activeIds;
      var newActiveIds = accordion ? [] : (0, _toConsumableArray2.default)(activeIds);

      if (onChange) {
        onChange(id);
      }

      if (!('activeIds' in _this.props)) {
        var index = activeIds.indexOf(id);

        if (index == -1) {
          newActiveIds.push(id);
        } else {
          newActiveIds.splice(index, 1);
        }

        _this.setState({
          activeIds: newActiveIds
        });
      }
    };

    _this.state = {
      activeIds: props.activeIds || props.defaultActiveIds || []
    };
    return _this;
  }

  (0, _createClass2.default)(Collapse, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ('activeIds' in nextProps) {
        this.setState({
          activeIds: nextProps.activeIds
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          children = _this$props2.children;
      var activeIds = this.state.activeIds;
      var classString = (0, _classnames2.default)((0, _defineProperty2.default)({}, "".concat(prefixCls), true));
      return _react.default.createElement("div", {
        className: classString
      }, _react.default.Children.map(children, function (child, index) {
        if (!child) {
          return null;
        }

        return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, child.props, {
          prefixCls: prefixCls,
          activeIds: activeIds,
          onClick: _this2.handleChange
        }));
      }));
    }
  }]);
  return Collapse;
}(_react.Component);

Collapse.propTypes = {
  prefixCls: _propTypes.default.string,
  activeIds: _propTypes.default.array,
  defaultActiveIds: _propTypes.default.array,
  accordion: _propTypes.default.bool,
  onChange: _propTypes.default.func
};
Collapse.defaultProps = {
  prefixCls: 'k-collapse',
  defaultActiveIds: [],
  accordion: false
};
var _default = Collapse;
exports.default = _default;