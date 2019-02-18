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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var _Step = _interopRequireDefault(require("./Step"));

var prefixCls = "k-steps";

var Steps =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Steps, _Component);

  function Steps(props) {
    (0, _classCallCheck2.default)(this, Steps);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Steps).call(this, props));
  }

  (0, _createClass2.default)(Steps, [{
    key: "renderSteps",
    value: function renderSteps() {
      var _this$props = this.props,
          children = _this$props.children,
          status = _this$props.status,
          current = _this$props.current;
      var items = [],
          nextErrs = [];

      _react.default.Children.forEach(children, function (child, index) {
        if (!child || !child.type || child.type.displayName != "Step") {
          return;
        }

        var childStatus = child.props.status;
        var newStatus = "wait";

        if (index < current) {
          newStatus = "finish";
        }

        if (index == current) {
          newStatus = "process";
        }

        if (status && index == current) {
          newStatus = status;
        }

        if (status == "error" && current == index && index > 0) {
          nextErrs.push(index - 1);
        }

        newStatus = childStatus ? childStatus : newStatus;
        items.push(_react.default.cloneElement(child, (0, _objectSpread2.default)({
          key: index,
          prefixCls: prefixCls,
          current: current,
          index: index
        }, child.props, {
          status: newStatus
        })));
      });

      if (nextErrs.length > 0) {
        nextErrs.forEach(function (index) {
          var child = items[index];
          items[index] = _react.default.cloneElement(child, (0, _objectSpread2.default)({}, child.props, {
            isNextError: true
          }));
        });
      }

      return items;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props2 = this.props,
          direction = _this$props2.direction,
          alignCenter = _this$props2.alignCenter;
      var classString = (0, _kUtils.getClassSet)(this.props);
      classString = (0, _classnames2.default)(classString, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(direction), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-center"), alignCenter && direction != "vertical"), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, this.renderSteps());
    }
  }]);
  return Steps;
}(_react.Component);

Steps.propTypes = {
  current: _propTypes.default.number,
  alignCenter: _propTypes.default.bool,
  direction: _propTypes.default.oneOf(["horizontal", "vertical"]),
  status: _propTypes.default.oneOf(["wait", "process", "finish", "error"])
};
Steps.defaultProps = {
  current: 0,
  alignCenter: false,
  direction: "horizontal"
};

var _default = (0, _kUtils.kSize)([_styleMaps.Sizes.SMALL], (0, _kUtils.kClass)(prefixCls, Steps));

exports.default = _default;