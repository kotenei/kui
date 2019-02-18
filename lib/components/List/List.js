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

var _List = _interopRequireDefault(require("./List.Item"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var prefixCls = "k-list";

var List =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(List, _Component);

  function List() {
    (0, _classCallCheck2.default)(this, List);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(List).apply(this, arguments));
  }

  (0, _createClass2.default)(List, [{
    key: "renderHeader",
    value: function renderHeader() {
      var header = this.props.header;

      if (header) {
        return _react.default.createElement("li", {
          className: "".concat(prefixCls, "-header")
        }, header);
      }

      return null;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var footer = this.props.footer;

      if (footer) {
        return _react.default.createElement("li", {
          className: "".concat(prefixCls, "-footer")
        }, footer);
      }

      return null;
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this$props = this.props,
          data = _this$props.data,
          children = _this$props.children,
          renderItem = _this$props.renderItem;

      if (data && data.length > 0) {
        var items = [];
        data.forEach(function (item, index) {
          items.push(_react.default.createElement(_List.default, {
            key: index
          }, renderItem(item, index)));
        });
        return items;
      } else {
        return _react.default.Children.map(children, function (child, index) {
          if (child && child.type && child.type.displayName == "ListItem" || child.type.displayName == "ListItemMeta") {
            return child;
          }

          return null;
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props2 = this.props,
          className = _this$props2.className,
          bordered = _this$props2.bordered,
          split = _this$props2.split,
          style = _this$props2.style;
      var classString = (0, _kUtils.getClassSet)(this.props);
      classString = (0, _classnames2.default)(classString, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-bordered"), bordered), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-split"), split), _classnames), className);
      return _react.default.createElement("ul", {
        className: classString,
        style: style
      }, this.renderHeader(), this.renderItems(), this.renderFooter());
    }
  }]);
  return List;
}(_react.Component);

List.propTypes = {
  bordered: _propTypes.default.bool,
  data: _propTypes.default.array,
  footer: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  header: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  renderItem: _propTypes.default.func,
  split: _propTypes.default.bool
};
List.defaultProps = {
  renderItem: function renderItem(item, index) {
    return item;
  },
  split: true
};

var _default = (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], (0, _kUtils.kClass)(prefixCls, List));

exports.default = _default;