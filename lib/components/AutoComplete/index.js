"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Input = _interopRequireDefault(require("../Input"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _MultipleList = _interopRequireDefault(require("../MultipleList"));

var _Dropdown = _interopRequireDefault(require("../Dropdown"));

var _Menu = _interopRequireDefault(require("../Menu"));

var prefixCls = "k-autocomplete";
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  TAB: 9,
  ENTER: 13
};

var AutoComplete =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AutoComplete, _Component);

  function AutoComplete(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AutoComplete);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AutoComplete).call(this, props));

    _this.handleFocus = function (e) {
      var _this$props = _this.props,
          data = _this$props.data,
          onSearch = _this$props.onSearch,
          onFocus = _this$props.onFocus;
      var inputValue = _this.state.inputValue;

      _this.setState({
        focus: true
      }, function () {
        if (onSearch && inputValue) {
          onSearch(inputValue);
        } else {
          _this.show();
        }
      });

      if (onFocus) {
        onFocus();
      }
    };

    _this.handleBlur = function () {
      var onBlur = _this.props.onBlur;

      _this.setState({
        focus: false
      });

      _this.hide();

      if (onBlur) {
        onBlur();
      }
    };

    _this.handleChange = function (e) {
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          onChange = _this$props2.onChange;
      var target = e.target;

      if (onChange) {
        onChange(target.value);
      }

      if ("value" in _this.props && !multiple) {
        return;
      }

      _this.active = 0;

      _this.setState({
        inputValue: target.value
      });
    };

    _this.handleKeyUp = function (e) {
      var target = e.target,
          keyCode = e.keyCode;
      var val = target.value.trim();

      switch (keyCode) {
        case KEY.UP:
        case KEY.LEFT:
          _this.move(-1);

          break;

        case KEY.DOWN:
        case KEY.RIGHT:
          _this.move(1);

          break;

        case KEY.ENTER:
        case KEY.TAB:
          _this.select();

          break;

        default:
          _this.search(val);

          break;
      }
    };

    _this.handleSelect = function (e, ids) {
      var _this$props3 = _this.props,
          onSelect = _this$props3.onSelect,
          data = _this$props3.data;

      for (var i = 0; i < data.length; i++) {
        var item = data[i],
            formatted = _this.formatItem(item);

        if (formatted.value == ids[0]) {
          _this.setState({
            selectedIds: ids
          });

          _this.setValue(item);

          break;
        }
      }
    };

    _this.handleItemRemove = function (e, removeItem) {
      if ("value" in _this.props) {
        return;
      }

      var selectedItems = _this.state.selectedItems;
      var newValue = (0, _toConsumableArray2.default)(selectedItems);
      var index = selectedItems.findIndex(function (item) {
        var formatted = _this.formatItem(item);

        return formatted.value == removeItem.value;
      });
      newValue.splice(index, 1);

      _this.setState({
        selectedItems: newValue
      });
    };

    _this.handleMenuItemMouseEnter = function (e, id, parentIds) {
      _this.setState({
        selectedIds: [id]
      });
    };

    _this.handleMenuItemMouseLeave = function (e, id, parentIds) {};

    _this.state = {
      multipleValue: [],
      inputValue: "",
      selectedIds: [],
      selectedItems: [],
      activeIds: [],
      focus: false,
      show: false
    };
    _this.active = 0;
    return _this;
  }

  (0, _createClass2.default)(AutoComplete, [{
    key: "show",
    //显示
    value: function show() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.data;

      if (!data || data.length == 0) {
        return;
      }

      if (this.tm) {
        clearTimeout(this.tm);
      }

      this.tm = setTimeout(function () {
        var formatted = _this2.formatItem(data[0]);

        var selectedIds = [formatted.value];
        _this2.active = 0;

        _this2.setState({
          show: true,
          selectedIds: selectedIds
        });
      }, 100);
    } //隐藏

  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      this.active = 0;
      this.elmDropdownMenu = null;

      if (this.tm) {
        clearTimeout(this.tm);
      }

      this.tm = setTimeout(function () {
        _this3.setState({
          //selectedIds: [],
          show: false
        });
      }, 300);
    } //移动

  }, {
    key: "move",
    value: function move(step) {
      var _this4 = this;

      var _this$props4 = this.props,
          data = _this$props4.data,
          max = _this$props4.max;
      var show = this.state.show;

      if (!data || data.length == 0 || !show) {
        return;
      }

      var len = data.length - 1;

      if (max && max <= len) {
        len = max - 1;
      }

      if (!this.elmDropdownMenu) {
        this.elmDropdownMenu = _reactDom.default.findDOMNode(this.refs.menu);
        this.elmMenuItems = this.elmDropdownMenu.querySelectorAll("li");
      }

      this.active += step;

      if (this.active < 0) {
        this.active = len;
      } else if (this.active > len) {
        this.active = 0;
      }

      var curDataItem = this.formatItem(data[this.active]),
          selectedIds = [curDataItem.value],
          curMenuItem = this.elmMenuItems[this.active],
          scrollTop = this.elmDropdownMenu.scrollTop,
          clientHeight = this.elmDropdownMenu.clientHeight,
          itemHeight = _domUtils.default.height(curMenuItem),
          itemTop = _domUtils.default.position(curMenuItem).top;

      this.setState({
        selectedIds: selectedIds
      }, function () {
        if (itemTop >= clientHeight) {
          _this4.elmDropdownMenu.scrollTop = itemTop + itemHeight - clientHeight + scrollTop;
        } else if (itemTop < 0) {
          _this4.elmDropdownMenu.scrollTop = scrollTop + itemTop;
        }
      });
    } //选中

  }, {
    key: "select",
    value: function select() {
      var data = this.props.data;
      this.setValue(data[this.active]);
    } //设置值

  }, {
    key: "setValue",
    value: function setValue(selected) {
      var _this$props5 = this.props,
          multiple = _this$props5.multiple,
          onSelect = _this$props5.onSelect,
          onChange = _this$props5.onChange;
      var selectedItems = this.state.selectedItems;
      var formatted = this.formatItem(selected);
      var newValue = selected;
      var hasItem = false;

      if (multiple) {
        newValue = (0, _toConsumableArray2.default)(selectedItems);

        for (var i = 0; i < selectedItems.length; i++) {
          var item = this.formatItem(selectedItems[i]);

          if (item.value == formatted.value) {
            hasItem = true;
            break;
          }
        }

        if (!hasItem) {
          newValue.push(selected);
        }
      }

      if (!("value" in this.props)) {
        if (!multiple) {
          this.setState({
            inputValue: formatted.value,
            selectedItems: [newValue]
          });
        } else {
          if (!hasItem) {
            this.setState({
              selectedItems: newValue,
              inputValue: ""
            });
          }
        }
      }

      if (onSelect) {
        onSelect(newValue);
      }

      if (onChange) {
        onChange(newValue);
      }

      this.hide();
    } //搜索

  }, {
    key: "search",
    value: function search(val) {
      var onSearch = this.props.onSearch;

      if (onSearch) {
        onSearch(val);
        return;
      }
    } //高亮

  }, {
    key: "highlight",
    value: function highlight(char, str) {
      var highlight = this.props.highlight;

      if (highlight) {
        var reg = new RegExp("(".concat(char, ")"), "ig");
        str = str.replace(reg, "<strong>$1</strong>");
      }

      return str;
    } //格式化项

  }, {
    key: "formatItem",
    value: function formatItem(item) {
      if ((0, _typeof2.default)(item) === "object") {
        return {
          text: item.text,
          value: item.value
        };
      } else {
        var val = String(item);
        return {
          text: val,
          value: val
        };
      }
    } //取菜单

  }, {
    key: "getMenus",
    value: function getMenus() {
      var _this$props6 = this.props,
          data = _this$props6.data,
          max = _this$props6.max,
          highlight = _this$props6.highlight;
      var inputValue = this.state.inputValue;

      if (!data) {
        return null;
      }

      var menus = [];

      for (var i = 0; i < data.length; i++) {
        var item = this.formatItem(data[i]);

        if (highlight && inputValue) {
          item.text = this.highlight(inputValue, item.text);
        }

        menus.push(_react.default.createElement(_Menu.default.Item, {
          key: i,
          id: item.value,
          onItemMouseEnter: this.handleMenuItemMouseEnter,
          onItemMouseLeave: this.handleMenuItemMouseLeave
        }, _react.default.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: item.text
          }
        })));

        if (max && i == max - 1) {
          break;
        }
      }

      if (menus.length == 0) {
        return null;
      }

      return _react.default.createElement(_Menu.default, {
        ref: "menu",
        className: "".concat(prefixCls, "-menu")
      }, menus);
    }
  }, {
    key: "init",
    value: function init(value, multiple) {
      var selectedItems = [];

      if (!multiple) {
        var inputValue = typeof value === "string" ? value : "";

        if (inputValue) {
          selectedItems.push(inputValue);
        }

        this.setState({
          inputValue: inputValue
        });
      } else {
        if (Array.isArray(value)) {
          value.forEach(function (item) {
            selectedItems.push(item);
          });
        }
      }

      this.setState({
        selectedItems: selectedItems
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props7 = this.props,
          defaultValue = _this$props7.defaultValue,
          value = _this$props7.value,
          multiple = _this$props7.multiple;
      var tmpValue = value || defaultValue || "";
      this.init(tmpValue, multiple);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var focus = this.state.focus;
      var data = nextProps.data,
          value = nextProps.value,
          multiple = nextProps.multiple;

      if ("value" in nextProps) {
        this.init(value, multiple);
      }

      if (data && data.length > 0 && focus) {
        this.show(data);
      } else {
        this.hide();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.tm) {
        clearTimeout(this.tm);
      }
    }
  }, {
    key: "renderContainer",
    value: function renderContainer() {
      var _this5 = this;

      var _this$props8 = this.props,
          multiple = _this$props8.multiple,
          placeholder = _this$props8.placeholder,
          kSize = _this$props8.kSize;
      var _this$state = this.state,
          inputValue = _this$state.inputValue,
          selectedItems = _this$state.selectedItems;
      var multipleValue = selectedItems.map(function (item) {
        return _this5.formatItem(item);
      });

      if (!multiple) {
        return _react.default.createElement(_Input.default, {
          trigger: "dropdown",
          type: "text",
          kSize: kSize,
          placeholder: placeholder,
          value: inputValue || "",
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyUp: this.handleKeyUp,
          onChange: this.handleChange
        });
      } else {
        return _react.default.createElement(_MultipleList.default, {
          kSize: kSize,
          showInput: true,
          placeholder: placeholder,
          value: multipleValue,
          inputValue: inputValue || "",
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyUp: this.handleKeyUp,
          onChange: this.handleChange,
          onItemRemove: this.handleItemRemove
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props9 = this.props,
          multiple = _this$props9.multiple,
          kSize = _this$props9.kSize;
      var _this$state2 = this.state,
          selectedIds = _this$state2.selectedIds,
          show = _this$state2.show;
      var classes = (0, _kUtils.getClassSet)(this.props);
      var classString = (0, _classnames2.default)(classes, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(multiple ? "multiple" : "single"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(kSize), kSize != null), _classnames));
      var menu = this.getMenus();
      return _react.default.createElement(_Dropdown.default, {
        fullWidth: true,
        inline: false,
        menu: menu,
        className: classString,
        ref: "dropdown",
        trigger: "manual",
        selectedIds: selectedIds,
        onSelect: this.handleSelect,
        show: show
      }, this.renderContainer());
    }
  }]);
  return AutoComplete;
}(_react.Component);

AutoComplete.propTypes = {
  data: _propTypes.default.array,
  multiple: _propTypes.default.bool,
  highlight: _propTypes.default.bool,
  max: _propTypes.default.number,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.string]),
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.string]),
  onChange: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onSelect: _propTypes.default.func
};
AutoComplete.defaultProps = {
  data: [],
  highlight: false,
  max: 10
};

var _default = (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], (0, _kUtils.kClass)(prefixCls, AutoComplete));

exports.default = _default;