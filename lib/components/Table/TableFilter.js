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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _Radio = _interopRequireDefault(require("../Radio"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Menu = _interopRequireDefault(require("../Menu"));

var _PopPanel = _interopRequireDefault(require("../PopPanel"));

var _Button = _interopRequireDefault(require("../Button"));

var seed = 1;
var instances = {};

var TableFilter =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TableFilter, _Component);

  function TableFilter(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TableFilter);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TableFilter).call(this, props));
    _this.state = {
      selectedItems: [],
      filtered: false,
      open: false
    };

    _this.setSelectedValues = function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _this.setState({
        selectedItems: value
      });
    };

    _this.open = function () {
      if (_this.state.show) {
        return;
      }

      _this.setState({
        show: true
      });

      _this.closeOther();
    };

    _this.close = function () {
      if (!_this.state.show) {
        return;
      }

      _this.setState({
        show: false
      });
    };

    _this.handleClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      _this.setState({
        show: !_this.state.show
      });

      _this.closeOther();
    };

    _this.handleSelect = function (e, ids) {
      _this.setState({
        selectedItems: ids
      });
    };

    _this.handleOK = function () {
      var _this$props = _this.props,
          onOK = _this$props.onOK,
          column = _this$props.column;
      var selectedItems = _this.state.selectedItems;
      var filter = (0, _defineProperty2.default)({}, "".concat(column.dataIndex), selectedItems);

      if (onOK) {
        onOK(filter);
      }

      _this.close();
    };

    _this.handleReset = function () {
      var _this$props2 = _this.props,
          onReset = _this$props2.onReset,
          column = _this$props2.column;
      var selectedItems = _this.state.selectedItems;
      var filter = (0, _defineProperty2.default)({}, "".concat(column.dataIndex), []);

      if (onReset) {
        onReset(filter);
      }

      _this.setState({
        selectedItems: [],
        show: false
      });
    };

    _this.id = "poppanel_".concat(seed++);
    instances[_this.id] = (0, _assertThisInitialized2.default)(_this);
    return _this;
  }

  (0, _createClass2.default)(TableFilter, [{
    key: "init",
    value: function init() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var filter = props.filter,
          column = props.column;
      var selectedItems = [];

      if (filter && filter[column.dataIndex] && filter[column.dataIndex].length > 0) {
        selectedItems = filter[column.dataIndex];
        this.setState({
          filtered: true,
          selectedItems: selectedItems
        });
      } else {
        this.setState({
          filtered: false,
          selectedItems: selectedItems
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
      document.addEventListener("click", this.close);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.init(nextProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("click", this.close);
    }
  }, {
    key: "renderMenus",
    value: function renderMenus() {
      var selectedItems = this.state.selectedItems;
      var _this$props3 = this.props,
          column = _this$props3.column,
          prefixCls = _this$props3.prefixCls;
      var filters = column.filters,
          filterMultiple = column.filterMultiple;
      var menus = [];

      if (filters && filters.length > 0) {
        filters.forEach(function (item, index) {
          var checked = selectedItems ? selectedItems.indexOf(item.value) > -1 : false;
          menus.push(_react.default.createElement(_Menu.default.Item, {
            key: index,
            id: item.value
          }, filterMultiple ? _react.default.createElement(_Checkbox.default, {
            checked: checked
          }, item.text) : _react.default.createElement(_Radio.default, {
            checked: checked
          }, item.text)));
        });
      }

      return menus.length > 0 && _react.default.createElement(_Menu.default, {
        multiple: filterMultiple,
        selectedIds: selectedItems,
        className: "".concat(prefixCls, "-filter-dropdown"),
        onSelect: this.handleSelect
      }, menus);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          column = _this$props4.column,
          prefixCls = _this$props4.prefixCls;
      var _this$state = this.state,
          show = _this$state.show,
          filtered = _this$state.filtered,
          selectedItems = _this$state.selectedItems;
      var filterIcon = column.filterIcon,
          filters = column.filters,
          filterMultiple = column.filterMultiple,
          filterDropdown = column.filterDropdown;
      var icon = filterIcon ? filterIcon(filtered) : _react.default.createElement(_Icon.default, {
        type: "filter",
        theme: "filled",
        kStyle: filtered ? "primary" : null
      });

      var filterInput = _react.default.createElement("div", {
        className: "".concat(prefixCls, "-filter"),
        onClick: this.handleClick
      }, icon);

      if ((!filters || filters.length == 0) && !filterDropdown) {
        return null;
      }

      return _react.default.createElement(_PopPanel.default, {
        className: "".concat(prefixCls, "-filter"),
        input: filterInput,
        open: show,
        placement: "bottomRight"
      }, this.renderMenus(), filterDropdown ? filterDropdown(this.setSelectedValues, selectedItems, this.handleOK, this.handleReset) : null, !filterDropdown && _react.default.createElement("div", {
        className: "".concat(prefixCls, "-filter__btns")
      }, _react.default.createElement(_Button.default, {
        raised: true,
        kSize: "sm",
        onClick: this.handleOK
      }, "\u786E\u5B9A"), _react.default.createElement(_Button.default, {
        raised: true,
        kStyle: "default",
        kSize: "sm",
        onClick: this.handleReset
      }, "\u91CD\u7F6E")));
    }
  }, {
    key: "closeOther",
    value: function closeOther() {
      for (var k in instances) {
        if (k == this.id) {
          continue;
        }

        instances[k].close();
      }
    }
  }]);
  return TableFilter;
}(_react.Component);

TableFilter.propTypes = {
  filter: _propTypes.default.object,
  column: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  onOK: _propTypes.default.func,
  onReset: _propTypes.default.func
};
var _default = TableFilter;
exports.default = _default;