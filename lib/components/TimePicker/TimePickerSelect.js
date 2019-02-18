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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var Item =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Item, _Component);

  function Item() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Item);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Item)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          value = _this$props.value,
          index = _this$props.index,
          onClick = _this$props.onClick;

      if (onClick) {
        onClick(value, index);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(Item, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          value = _this$props2.value,
          className = _this$props2.className;
      return _react.default.createElement("li", {
        className: className,
        onClick: value ? this.handleClick : null
      }, value);
    }
  }]);
  return Item;
}(_react.Component);

Item.propTypes = {
  value: _propTypes.default.string,
  index: _propTypes.default.number,
  onClick: _propTypes.default.func
};

var TimePickerSelect =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(TimePickerSelect, _Component2);

  function TimePickerSelect(props) {
    var _this2;

    (0, _classCallCheck2.default)(this, TimePickerSelect);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(TimePickerSelect).call(this, props));
    _this2.state = {
      activeIndex: 0
    };

    _this2.handleItemClick = function (value, index) {
      var _this2$props = _this2.props,
          type = _this2$props.type,
          onItemClick = _this2$props.onItemClick,
          disabled = _this2$props.disabled;
      if (disabled) return;

      if (onItemClick) {
        onItemClick(type, value, index);
      }

      _this2.canScroll = false;

      _this2.setState({
        activeIndex: index
      }, function () {
        _this2.scrollTo(index);

        setTimeout(function () {
          _this2.canScroll = true;
        }, 50);
      });
    };

    _this2.handleScroll = function (e) {
      var _this2$props2 = _this2.props,
          onScroll = _this2$props2.onScroll,
          type = _this2$props2.type,
          data = _this2$props2.data;
      var scrollTop = _this2.refs.select.scrollTop;
      var activeIndex = 0;
      var half = _this2.itemHeight / 2;

      for (var i = 0; i < _this2.arrHeight.length; i++) {
        var height = _this2.arrHeight[i];

        if (height - scrollTop >= half) {
          activeIndex = i;
          break;
        }
      }

      if (onScroll && _this2.canScroll) {
        onScroll(type, data[activeIndex], activeIndex);
      }

      _this2.setState({
        activeIndex: activeIndex
      });
    };

    _this2.canScroll = true;
    return _this2;
  }

  (0, _createClass2.default)(TimePickerSelect, [{
    key: "getScrollTop",
    value: function getScrollTop(index) {
      var _this$props3 = this.props,
          data = _this$props3.data,
          value = _this$props3.value;

      if (index == undefined) {
        index = data.findIndex(function (item) {
          return item == value;
        });
      }

      if (index == -1) {
        return 0;
      }

      return index * this.itemHeight;
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(index) {
      var scrollTop = this.getScrollTop(index);
      this.refs.select.scrollTop = scrollTop;
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      var data = this.props.data;

      if (!this.itemHeight) {
        var li = this.refs.select.querySelector("li");
        this.itemHeight = _domUtils.default.height(li);
      }

      this.scrollTo();
      this.arrHeight = [];
      data.forEach(function (item, index) {
        _this3.arrHeight.push((index + 1) * _this3.itemHeight);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this4 = this;

      var _this$props4 = this.props,
          data = _this$props4.data,
          value = _this$props4.value,
          type = _this$props4.type;
      var activeIndex = this.state.activeIndex;
      var items = [];
      items.push(_react.default.createElement(Item, {
        key: "-2"
      }));
      items.push(_react.default.createElement(Item, {
        key: "-1"
      }));
      data.forEach(function (item, index) {
        items.push(_react.default.createElement(Item, {
          key: index,
          className: (0, _classnames.default)({
            active: index == activeIndex
          }),
          index: index,
          value: item,
          onClick: _this4.handleItemClick
        }, item));
      });
      items.push(_react.default.createElement(Item, {
        key: "99"
      }));
      items.push(_react.default.createElement(Item, {
        key: "100"
      }));
      return items;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          prefixCls = _this$props5.prefixCls,
          data = _this$props5.data,
          value = _this$props5.value;
      return data && data.length > 0 ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-select"),
        ref: "select",
        onScroll: this.handleScroll
      }, _react.default.createElement("ul", null, this.renderList())) : null;
    }
  }]);
  return TimePickerSelect;
}(_react.Component);

TimePickerSelect.propTypes = {
  data: _propTypes.default.array,
  value: _propTypes.default.string,
  onItemClick: _propTypes.default.func
};
var _default = TimePickerSelect;
exports.default = _default;