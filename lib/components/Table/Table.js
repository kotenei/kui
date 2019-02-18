"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames6 = _interopRequireDefault(require("classnames"));

var _TableColumn = _interopRequireDefault(require("./TableColumn"));

var _Loading = _interopRequireDefault(require("../Loading"));

var _Pagination = _interopRequireDefault(require("../Pagination"));

var _utils = require("../../utils");

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _object = _interopRequireDefault(require("object.omit"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _TableSorter = _interopRequireDefault(require("./TableSorter"));

var _TableFilter = _interopRequireDefault(require("./TableFilter"));

var _invariant = _interopRequireDefault(require("invariant"));

var prefixCls = "k-table";
var FLEX_WIDTH = 50;

var HeaderContaienr = function HeaderContaienr(props) {
  return _react.default.createElement("div", {
    ref: props.elRef,
    className: (0, _classnames6.default)(props.className, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-header"), true)),
    style: props.style
  }, props.children);
};

var BodyContainer = function BodyContainer(props) {
  var _classnames2;

  return _react.default.createElement("div", {
    ref: props.elRef,
    className: (0, _classnames6.default)(props.className, (_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-body"), true), (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-body__scroll"), props.scroll), _classnames2)),
    style: props.style
  }, props.children);
};

var ExpandIcon = function ExpandIcon(props) {
  var onClick = function onClick() {
    if (props.onClick) {
      props.onClick(props.id);
    }
  };

  return _react.default.createElement("span", {
    onClick: onClick
  }, props.expanded ? _react.default.createElement(_Icon.default, {
    type: "minus-square"
  }) : _react.default.createElement(_Icon.default, {
    type: "plus-square"
  }));
};

var Table =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Table, _Component);

  function Table(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Table);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Table).call(this, props));

    _this.setWidth = function () {
      var _this$props = _this.props,
          checkbox = _this$props.checkbox,
          expandedRowRender = _this$props.expandedRowRender;

      var totalWidth = _domUtils.default.width(_this.refs.table);

      var tmpWidth = 0;
      var count = 0;
      var columnsWidth = {};

      if (checkbox) {
        tmpWidth += FLEX_WIDTH;
        columnsWidth["checkbox"] = FLEX_WIDTH;
      }

      if (expandedRowRender) {
        tmpWidth += FLEX_WIDTH;
        columnsWidth["expand"] = FLEX_WIDTH;
      }

      _this.columns.forEach(function (item, index) {
        if (item.width) {
          tmpWidth += item.width;
          columnsWidth[item.id] = item.width;
        } else {
          columnsWidth[item.id] = 0;
          count++;
        }
      });

      var diff = Math.abs(totalWidth - tmpWidth);
      var width = count == 0 ? 0 : diff / count;

      for (var key in columnsWidth) {
        if (columnsWidth[key] === 0) {
          columnsWidth[key] = width;
        }
      }

      _this.setState({
        columnsWidth: columnsWidth,
        tableWidth: tmpWidth,
        tableContainerWidth: totalWidth
      });
    };

    _this.setHeight = function () {
      var elTableScroll = _this.refs.table.querySelector(".k-table-scroll");

      var theadRows = elTableScroll.querySelectorAll(".".concat(prefixCls, "-header tr"));
      var tbodyRows = elTableScroll.querySelectorAll(".".concat(prefixCls, "-body tr"));

      var theadRowsHeightInfo = _this.getRowHeightInfo(theadRows);

      var tbodyRowsHeightInfo = _this.getRowHeightInfo(tbodyRows);

      _this.setState({
        theadRowsHeight: theadRowsHeightInfo.rowsHeight,
        tbodyRowsHeight: tbodyRowsHeightInfo.rowsHeight,
        theadHeight: theadRowsHeightInfo.totalHeight,
        tbodyHeight: tbodyRowsHeightInfo.totalHeight
      });
    };

    _this.handleCheckAll = function (e) {
      var target = e.target;
      var _this$props2 = _this.props,
          onCheck = _this$props2.onCheck,
          data = _this$props2.data,
          disabledCheckIds = _this$props2.disabledCheckIds;
      var checkedIds = _this.state.checkedIds;
      var checked = target.checked;
      var newCheckedIds = (0, _toConsumableArray2.default)(checkedIds);
      data.forEach(function (item) {
        var index = newCheckedIds.indexOf(item.id);
        var disabled = disabledCheckIds && disabledCheckIds.indexOf(item.id) > -1;

        if (!disabled) {
          if (checked) {
            if (index == -1) {
              newCheckedIds.push(item.id);
            }
          } else {
            if (index > -1) {
              newCheckedIds.splice(index, 1);
            }
          }
        }
      });

      if (!("checkedIds" in _this.props)) {
        _this.setState({
          checkedIds: newCheckedIds
        });
      }

      if (onCheck) {
        onCheck(newCheckedIds);
      }
    };

    _this.handleCheck = function (e) {
      var target = e.target;
      var onCheck = _this.props.onCheck;
      var checkedIds = _this.state.checkedIds;
      var checked = target.checked;
      var value = target.value;
      var index = checkedIds.indexOf(value);
      var newCheckedIds = (0, _toConsumableArray2.default)(checkedIds);

      if (index > -1) {
        newCheckedIds.splice(index, 1);
      } else {
        newCheckedIds.push(value);
      }

      if (!("checkedIds" in _this.props)) {
        _this.setState({
          checkedIds: newCheckedIds
        });
      }

      if (onCheck) {
        onCheck(newCheckedIds);
      }
    };

    _this.handleExpand = function (id, expanded) {
      var onExpand = _this.props.onExpand;
      var expandedRowIds = _this.state.expandedRowIds;
      var newExpandedRowIds = (0, _toConsumableArray2.default)(expandedRowIds);
      var index = newExpandedRowIds.indexOf(id);

      if (index > -1) {
        newExpandedRowIds.splice(index, 1);
      } else {
        newExpandedRowIds.push(id);
      }

      if (!("expandedRowIds" in _this.props)) {
        _this.setState({
          expandedRowIds: newExpandedRowIds
        }, function () {
          _this.setHeight();
        });
      }

      if (onExpand) {
        onExpand(newExpandedRowIds);
      }
    };

    _this.handleScroll = function (e) {
      var target = e.target;
      var delay = 300;
      var scrollLeft = target.scrollLeft;
      var scrollTop = target.scrollTop;

      if (_this.timer) {
        clearTimeout(_this.timer);
      }

      if (target === _this.elMainBody) {
        _this.scrollBind([_this.refs.elFixedLeftBody, _this.refs.elFixedRightBody], false);

        _this.elMainHeader.scrollLeft = scrollLeft;

        if (_this.refs.elFixedLeftBody) {
          _this.refs.elFixedLeftBody.scrollTop = scrollTop;
        }

        if (_this.refs.elFixedRightBody) {
          _this.refs.elFixedRightBody.scrollTop = scrollTop;
        }

        _this.timer = setTimeout(function () {
          _this.scrollBind([_this.refs.elFixedLeftBody, _this.refs.elFixedRightBody]);
        }, delay);

        if (_this.state.scrollLeft !== scrollLeft) {
          _this.setState({
            scrollLeft: scrollLeft
          });
        }
      } else if (target === _this.refs.elFixedLeftBody) {
        _this.scrollBind([_this.elMainBody, _this.refs.elFixedRightBody], false);

        _this.elMainBody.scrollTop = scrollTop;

        if (_this.refs.elFixedRightBody) {
          _this.refs.elFixedRightBody.scrollTop = scrollTop;
        }

        _this.timer = setTimeout(function () {
          _this.scrollBind([_this.elMainBody, _this.refs.elFixedRightBody]);
        }, delay);
      } else if (target === _this.refs.elFixedRightBody) {
        _this.scrollBind([_this.elMainBody, _this.refs.elFixedLeftBody], false);

        _this.elMainBody.scrollTop = scrollTop;

        if (_this.refs.elFixedLeftBody) {
          _this.refs.elFixedLeftBody.scrollTop = scrollTop;
        }

        _this.timer = setTimeout(function () {
          _this.scrollBind([_this.elMainBody, _this.refs.elFixedLeftBody]);
        }, delay);
      }
    };

    _this.handleSort = function (sorter) {
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
          pagination = _this$state.pagination,
          filter = _this$state.filter;
      var newPagination = (0, _objectSpread2.default)({}, pagination, {
        pageNumber: 1
      });

      _this.setState({
        sorter: sorter,
        pagination: newPagination
      });

      if (onChange) {
        onChange(newPagination, filter, sorter);
      }
    };

    _this.handleFilter = function (filter) {
      var onChange = _this.props.onChange;
      var _this$state2 = _this.state,
          pagination = _this$state2.pagination,
          sorter = _this$state2.sorter,
          orgFilter = _this$state2.filter;
      var newFilter = (0, _objectSpread2.default)({}, orgFilter, filter);
      var newPagination = (0, _objectSpread2.default)({}, pagination, {
        pageNumber: 1
      });

      _this.setState({
        filter: newFilter
      });

      if (onChange) {
        onChange(newPagination, newFilter, sorter);
      }
    };

    _this.handlePageChange = function (pageNumber) {
      var onChange = _this.props.onChange;
      var _this$state3 = _this.state,
          pagination = _this$state3.pagination,
          filter = _this$state3.filter,
          sorter = _this$state3.sorter;
      var newPagination = (0, _objectSpread2.default)({}, pagination, {
        pageNumber: pageNumber
      });

      if (!("pageNumber" in _this.props)) {
        _this.setState({
          pagination: newPagination
        });
      }

      if (onChange) {
        onChange(newPagination, filter, sorter);
      }
    };

    _this.scrollBind = function (els) {
      var bind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (els && els.length > 0) {
        els.forEach(function (el) {
          if (el) {
            if (bind) {
              el.addEventListener("scroll", _this.handleScroll);
            } else {
              el.removeEventListener("scroll", _this.handleScroll);
            }
          }
        });
      }
    };

    _this.state = {
      loading: props.loading,
      checkedIds: props.checkedIds || props.defaultCheckedIds,
      expandedRowIds: props.expandedRowIds || props.defaultExpandedRowIds,
      tableWidth: 0,
      tableContainerWidth: 0,
      columnsWidth: {},
      theadRowsHeight: [],
      tbodyRowsHeight: [],
      theadHeight: 0,
      tbodyHeight: 0,
      scrollLeft: 0,
      sorter: {},
      filter: {},
      pagination: {
        pageNumber: 1,
        total: props.data ? props.data.length : 0,
        pageSize: 5
      }
    };
    return _this;
  }

  (0, _createClass2.default)(Table, [{
    key: "init",
    value: function init() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var children = props.children,
          loading = props.loading,
          checkedIds = props.checkedIds,
          expandedRowIds = props.expandedRowIds,
          pagination = props.pagination;

      if (!this.columns) {
        var maxLevel = 1,
            nodes = [],
            rows = [],
            columns = [],
            fixedLeft = [],
            fixedRight = [],
            tmpWidth = 0,
            initNode = function initNode(node, parentNode) {
          node.id = (0, _utils.guid)();
          node.level = parentNode ? parentNode.level + 1 : 1;
          node.parentIds = parentNode ? parentNode.parentIds.length > 0 ? [parentNode.id].concat((0, _toConsumableArray2.default)(parentNode.parentIds)) : [parentNode.id] : [];
          node.path = parentNode ? parentNode.path + node.id + "/" : "/".concat(node.id, "/");
          node.parentId = parentNode ? parentNode.id : "";
        },
            loop = function loop(child, curNode, parentNode) {
          if (maxLevel < curNode.level) {
            maxLevel = curNode.level;
          }

          if (child.props.children) {
            var colSpan = 0;

            _react.default.Children.map(child.props.children, function (subChild) {
              var subNode = (0, _object.default)(subChild.props, ["children"]);
              initNode(subNode, curNode);
              nodes.push(subNode);
              loop(subChild, subNode, curNode);
              colSpan += subNode.colSpan;
            });

            curNode.hasChild = true;
            curNode.colSpan = colSpan;
          } else {
            var _child$props = child.props,
                width = _child$props.width,
                style = _child$props.style;
            curNode.hasChild = false;
            curNode.colSpan = 1;

            if (width != undefined) {
              curNode.width = width;
            }

            if (style && typeof style.width == "number") {
              curNode.width = style.width;
            }

            if (curNode.width) {
              tmpWidth += curNode.width;
            }

            columns.push(curNode);
          }
        };

        _react.default.Children.map(children, function (child) {
          var node = (0, _object.default)(child.props, ["children"]);
          initNode(node);
          nodes.push(node);
          loop(child, node);
        });

        for (var i = 0; i < maxLevel; i++) {
          rows.push([]);
          fixedLeft.push([]);
          fixedRight.push([]);
        }

        var fixed;
        nodes.forEach(function (node) {
          var rowIndex = node.level - 1;

          if (!node.hasChild) {
            node.rowSpan = maxLevel - node.level + 1;
          } else {
            node.rowSpan = 1;
          }

          if (!node.fixed && !node.parentId) {
            fixed = "";
          }

          if (node.fixed && !node.parentId || fixed) {
            if (!fixed || !node.parentId) {
              fixed = node.fixed;
            }

            if (fixed == "left" || fixed == true) {
              fixedLeft[rowIndex].push(node);
              node.fixed = "left";
            } else {
              fixedRight[rowIndex].push(node);
              node.fixed = "right";
            }
          } else {
            rows[rowIndex].push(node);
          }
        });
        rows.forEach(function (row, rowIndex) {
          row.push.apply(row, (0, _toConsumableArray2.default)(fixedRight[rowIndex]));
          row.unshift.apply(row, (0, _toConsumableArray2.default)(fixedLeft[rowIndex]));
        });
        this.columns = columns;
        this.fixedLeft = fixedLeft;
        this.fixedRight = fixedRight;
        this.theadRows = rows;
      }

      if ("loading" in props) {
        this.setState({
          loading: loading
        });
      }

      if ("checkedIds" in props) {
        this.setState({
          checkedIds: checkedIds
        });
      }

      if ("expandedRowIds" in props) {
        this.setState({
          expandedRowIds: expandedRowIds
        });
      }

      if ("pagination" in props) {
        this.setState({
          pagination: pagination
        });
      }
    }
  }, {
    key: "getColumns",
    value: function getColumns(rows) {
      if (!rows) {
        return [];
      }

      var columns = [];

      var loop = function loop(rows, columns) {
        var rowIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        rows[rowIndex].forEach(function (item) {
          if (!item.hasChild) {
            columns.push(item);
          } else {
            loop(rows, columns, rowIndex + 1);
          }
        });
      };

      loop(rows, columns);
      return columns;
    }
  }, {
    key: "getRowHeightInfo",
    value: function getRowHeightInfo(elRows) {
      var ret = {
        rowsHeight: [],
        totalHeight: 0
      };

      if (elRows && elRows.length > 0) {
        elRows.forEach(function (row) {
          var height = _domUtils.default.height(row);

          ret.totalHeight += height;
          ret.rowsHeight.push(height);
        });
      }

      return ret;
    }
  }, {
    key: "getColGroupInfo",
    value: function getColGroupInfo(columns) {
      var columnsWidth = this.state.columnsWidth;
      var _this$props3 = this.props,
          checkbox = _this$props3.checkbox,
          expandedRowRender = _this$props3.expandedRowRender;
      var colGroup = [];
      var key = 0;
      var totalWidth = 0;

      if (checkbox) {
        colGroup.push(_react.default.createElement("col", {
          key: key++,
          style: {
            width: columnsWidth["checkbox"]
          }
        }));
        totalWidth += columnsWidth["checkbox"];
      }

      if (expandedRowRender) {
        colGroup.push(_react.default.createElement("col", {
          key: key++,
          style: {
            width: columnsWidth["expand"]
          }
        }));
        totalWidth += columnsWidth["expand"];
      }

      columns.forEach(function (column) {
        var colStyle = {
          width: columnsWidth[column.id] || "auto"
        };
        colGroup.push(_react.default.createElement("col", {
          key: key++,
          style: colStyle
        }));
        totalWidth += columnsWidth[column.id] || 0;
      });
      return {
        colGroup: colGroup,
        totalWidth: totalWidth || "auto"
      };
    }
  }, {
    key: "getFixedWidth",
    value: function getFixedWidth(columns) {
      var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "left";
      var columnsWidth = this.state.columnsWidth;
      var _this$props4 = this.props,
          checkbox = _this$props4.checkbox,
          expandedRowRender = _this$props4.expandedRowRender;
      var totalWidth = 0;

      if (fixed == "left") {
        if (checkbox) {
          totalWidth += columnsWidth["checkbox"] || 0;
        }

        if (expandedRowRender) {
          totalWidth += columnsWidth["expand"] || 0;
        }
      }

      columns.forEach(function (column) {
        var width = 0;

        if (column.fixed && column.fixed == fixed) {
          width = columnsWidth[column.id] || 0;
          totalWidth += width;
        }
      });
      return totalWidth;
    }
  }, {
    key: "getData",
    value: function getData() {
      var _this2 = this;

      var data = this.props.data;
      var _this$state4 = this.state,
          sorter = _this$state4.sorter,
          pagination = _this$state4.pagination,
          filter = _this$state4.filter;
      var dataSource = data || [];
      dataSource = dataSource.slice(0);
      var sorterFn = this.getSorterFunc();

      if (sorterFn) {
        dataSource = dataSource.sort(sorterFn);
      }

      if (filter) {
        Object.keys(filter).forEach(function (key) {
          var column = _this2.columns.find(function (column) {
            return column.dataIndex == key;
          });

          if (!column) {
            return;
          }

          var values = filter[key] || [];

          if (values.length == 0) {
            return;
          }

          var onFilter = column.onFilter;
          dataSource = onFilter ? dataSource.filter(function (record) {
            return values.some(function (value) {
              return onFilter(value, record);
            });
          }) : dataSource;
        });
      }

      if (!("pagination" in this.props)) {
        var offset = (pagination.pageNumber - 1) * pagination.pageSize;
        dataSource = dataSource.slice(offset, offset + pagination.pageSize);
      }

      return dataSource;
    }
  }, {
    key: "getAllPage",
    value: function getAllPage() {
      var pagination = this.state.pagination;

      if (!pagination || pagination.total === 0) {
        return 1;
      }

      var allPage = parseInt(pagination.total / pagination.pageSize);
      allPage = pagination.total % pagination.pageSize !== 0 ? allPage + 1 : allPage;
      return allPage;
    }
  }, {
    key: "getSorterFunc",
    value: function getSorterFunc() {
      var sorter = this.state.sorter;

      if (!sorter || !sorter.column || typeof sorter.column.sorter !== "function") {
        return null;
      }

      return function (a, b) {
        var result = sorter.column.sorter(a, b);

        if (result !== 0) {
          return sorter.order === "desc" ? -result : result;
        }

        return 0;
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      this.init();
      setTimeout(function () {
        _this3.setWidth();

        _this3.setHeight();
      });
      window.addEventListener("resize", this.setWidth);
      window.addEventListener("resize", this.setHeight);
      this.scrollBind([this.elMainBody, this.refs.elFixedLeftBody, this.refs.elFixedRightBody]);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.setWidth);
      window.removeEventListener("resize", this.setHeight);
      this.scrollBind([this.elMainBody, this.refs.elFixedLeftBody, this.refs.elFixedRightBody], false);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.init(nextProps);
    }
  }, {
    key: "renderThead",
    value: function renderThead(data, headerRows, colGroupInfo) {
      var _this4 = this;

      var _this$props5 = this.props,
          checkbox = _this$props5.checkbox,
          expandedRowRender = _this$props5.expandedRowRender,
          disabledCheckIds = _this$props5.disabledCheckIds;
      var _this$state5 = this.state,
          checkedIds = _this$state5.checkedIds,
          expandedRowIds = _this$state5.expandedRowIds,
          sorter = _this$state5.sorter,
          filter = _this$state5.filter;
      var checkedCount = 0;
      var disabledCheckCount = 0;

      if (data && data.length > 0) {
        data.forEach(function (item) {
          if (checkedIds && checkedIds.indexOf(item.id) > -1) {
            checkedCount++;
          }

          if (disabledCheckIds && disabledCheckIds.indexOf(item.id) > -1) {
            disabledCheckCount++;
          }
        });
      }

      var theadRows = [];

      if (Array.isArray(headerRows)) {
        headerRows.forEach(function (row, rowIndex) {
          var cells = [];
          row.forEach(function (cell, cellIndex) {
            if (rowIndex == 0 && cellIndex == 0) {
              if (checkbox) {
                cells.push(_react.default.createElement("th", {
                  className: "checkbox-cell",
                  key: "thCell-checkbox-".concat(cellIndex),
                  rowSpan: headerRows.length
                }, _react.default.createElement(_Checkbox.default, {
                  indeterminate: checkedCount > 0,
                  checked: checkedCount + disabledCheckCount === data.length,
                  onChange: _this4.handleCheckAll
                })));
              }

              if (expandedRowRender) {
                cells.push(_react.default.createElement("th", {
                  className: "expand-cell",
                  key: "thCell-expand-".concat(cellIndex),
                  rowSpan: headerRows.length
                }));
              }
            }

            cells.push(_react.default.createElement("th", {
              key: "thCell-".concat(cellIndex),
              colSpan: cell.colSpan == 1 ? null : cell.colSpan,
              rowSpan: cell.rowSpan == 1 ? null : cell.rowSpan,
              style: {
                textAlign: cell.align
              }
            }, _react.default.createElement("div", {
              className: "".concat(prefixCls, "-thead-content")
            }, _react.default.createElement("div", {
              className: "".concat(prefixCls, "-thead-content__title")
            }, cell.title), _react.default.createElement(_TableSorter.default, {
              prefixCls: prefixCls,
              column: cell,
              sorter: sorter,
              onSort: _this4.handleSort
            }), _react.default.createElement(_TableFilter.default, {
              prefixCls: prefixCls,
              column: cell,
              filter: filter,
              onOK: _this4.handleFilter,
              onReset: _this4.handleFilter
            }))));
          });
          theadRows.push(_react.default.createElement("tr", {
            key: "thRow-".concat(rowIndex)
          }, cells));
        });
      }

      return _react.default.createElement("table", {
        className: "".concat(prefixCls, "-fixed"),
        style: {
          width: colGroupInfo.totalWidth
        }
      }, _react.default.createElement("colgroup", null, colGroupInfo.colGroup), _react.default.createElement("thead", {
        className: "".concat(prefixCls, "-thead")
      }, theadRows));
    }
  }, {
    key: "renderTbody",
    value: function renderTbody(data, columns, colGroupInfo) {
      var _this5 = this;

      var _this$props6 = this.props,
          checkbox = _this$props6.checkbox,
          expandedRowRender = _this$props6.expandedRowRender,
          disabledCheckIds = _this$props6.disabledCheckIds,
          rowClassName = _this$props6.rowClassName,
          stripe = _this$props6.stripe;
      var _this$state6 = this.state,
          checkedIds = _this$state6.checkedIds,
          expandedRowIds = _this$state6.expandedRowIds;
      var tbodyRows = [];

      if (data && data.length > 0) {
        data.forEach(function (item, index) {
          var cells = [],
              isEven = index % 2 == 0,
              checked = checkedIds.indexOf(item.id) > -1,
              expanded = expandedRowIds.indexOf(item.id) > -1,
              disabledCheck = disabledCheckIds && disabledCheckIds.indexOf(item.id) > -1,
              tableRowClassName = rowClassName && rowClassName(item, index);
          columns.forEach(function (column, cellIndex) {
            if (cellIndex == 0) {
              if (checkbox) {
                cells.push(_react.default.createElement("td", {
                  key: "tbCell-checkbox-".concat(cellIndex),
                  className: "checkbox-cell"
                }, _react.default.createElement(_Checkbox.default, {
                  checked: checked,
                  onChange: _this5.handleCheck,
                  value: item.id,
                  disabled: disabledCheck
                })));
              }

              if (expandedRowRender) {
                cells.push(_react.default.createElement("td", {
                  key: "tbCell-expand-".concat(cellIndex),
                  className: "expand-cell"
                }, _react.default.createElement(ExpandIcon, {
                  expanded: expanded,
                  id: item.id,
                  onClick: _this5.handleExpand
                })));
              }
            }

            cells.push(_react.default.createElement("td", {
              key: "tbCell-".concat(cellIndex)
            }, column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]));
          });
          tbodyRows.push(_react.default.createElement("tr", {
            key: "tbRow-".concat(index),
            className: (0, _classnames6.default)(tableRowClassName, {
              "stripe-row": !isEven && stripe
            })
          }, cells));

          if (expandedRowRender) {
            var _classnames3;

            cells = [];

            if (checkbox) {
              cells.push(_react.default.createElement("td", {
                key: (0, _utils.guid)()
              }));
            }

            cells.push(_react.default.createElement("td", {
              key: (0, _utils.guid)()
            }));
            cells.push(_react.default.createElement("td", {
              key: "tbCell-expand-".concat(index),
              colSpan: columns.length
            }, expandedRowRender(item)));
            tbodyRows.push(_react.default.createElement("tr", {
              className: (0, _classnames6.default)((_classnames3 = {}, (0, _defineProperty2.default)(_classnames3, "expand-row", true), (0, _defineProperty2.default)(_classnames3, "expand-row--show", expanded), _classnames3)),
              key: "tbRow-expand-".concat(index)
            }, cells));
          }
        });
      }

      return _react.default.createElement("table", {
        className: "".concat(prefixCls, "-fixed"),
        style: {
          width: colGroupInfo.totalWidth
        }
      }, _react.default.createElement("colgroup", null, colGroupInfo.colGroup), _react.default.createElement("tbody", {
        className: "".concat(prefixCls, "-tbody")
      }, tbodyRows));
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames4,
          _this6 = this;

      var _this$props7 = this.props,
          bordered = _this$props7.bordered,
          children = _this$props7.children,
          height = _this$props7.height;
      var _this$state7 = this.state,
          loading = _this$state7.loading,
          theadHeight = _this$state7.theadHeight,
          tbodyHeight = _this$state7.tbodyHeight,
          tableWidth = _this$state7.tableWidth,
          tableContainerWidth = _this$state7.tableContainerWidth,
          scrollLeft = _this$state7.scrollLeft,
          pagination = _this$state7.pagination;
      var data = this.getData();
      var classString = (0, _classnames6.default)((_classnames4 = {}, (0, _defineProperty2.default)(_classnames4, prefixCls, true), (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-bordered"), bordered), _classnames4));
      var scrollY = false;
      var scrollX = tableWidth > tableContainerWidth;
      var mainHeaderStyle = {};
      var positionClass;
      var curWidth = scrollLeft + tableContainerWidth;
      var columns = this.getColumns(this.theadRows);
      var colGropInfo = this.getColGroupInfo(columns);
      var header = this.renderThead(data, this.theadRows, colGropInfo);
      var body = this.renderTbody(data, columns, colGropInfo);
      var fixedLeftWidth = this.getFixedWidth(columns);
      var fixedRightWidth = this.getFixedWidth(columns, "right");
      var scrollbarWidth = 21;
      var fixedHeight = theadHeight + tbodyHeight;
      var allPage = this.getAllPage();

      if (height) {
        scrollY = height < tbodyHeight;
      }

      if (!scrollX) {
        mainHeaderStyle.overflowX = "hidden";
        mainHeaderStyle.marginBottom = "0";
      }

      if (scrollY) {
        curWidth -= scrollbarWidth;
        fixedHeight = theadHeight + height - scrollbarWidth;
        fixedRightWidth += scrollbarWidth;
      } else {
        mainHeaderStyle.overflowY = "hidden";
      }

      if (scrollLeft > 0 && curWidth < tableWidth) {
        positionClass = "".concat(prefixCls, "-position-middle");
      } else if (scrollLeft > 0 && curWidth == tableWidth) {
        positionClass = "".concat(prefixCls, "-position-right");
      } else {
        positionClass = "".concat(prefixCls, "-position-left");
      }

      if (scrollX) {
        classString = (0, _classnames6.default)(classString, positionClass);
      } else {
        var _classnames5;

        classString = (0, _classnames6.default)(classString, (_classnames5 = {}, (0, _defineProperty2.default)(_classnames5, "".concat(prefixCls, "-position-left"), true), (0, _defineProperty2.default)(_classnames5, "".concat(prefixCls, "-position-right"), true), _classnames5));
      }

      var main = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(HeaderContaienr, {
        style: mainHeaderStyle,
        elRef: function elRef(el) {
          return _this6.elMainHeader = el;
        }
      }, header), _react.default.createElement(BodyContainer, {
        elRef: function elRef(el) {
          return _this6.elMainBody = el;
        },
        style: {
          maxHeight: height,
          overflowY: scrollY ? "scroll" : "hidden",
          overflowX: scrollX ? "scroll" : "hidden"
        }
      }, body));

      var left = _react.default.createElement("div", {
        className: "".concat(prefixCls, "-fixed-left"),
        style: {
          width: fixedLeftWidth,
          height: fixedHeight
        }
      }, _react.default.createElement(HeaderContaienr, null, header), _react.default.createElement(BodyContainer, {
        scroll: scrollY,
        style: {
          top: bordered ? theadHeight : theadHeight + 1
        }
      }, _react.default.createElement("div", {
        ref: "elFixedLeftBody",
        className: "".concat(prefixCls, "-body-inner"),
        style: {
          maxHeight: height
        }
      }, body)));

      var right = _react.default.createElement("div", {
        className: "".concat(prefixCls, "-fixed-right"),
        style: {
          width: fixedRightWidth,
          height: fixedHeight
        }
      }, _react.default.createElement(HeaderContaienr, {
        style: {
          overflowY: scrollY ? "scroll" : null
        }
      }, header), _react.default.createElement(BodyContainer, {
        scroll: scrollY,
        style: {
          top: bordered ? theadHeight : theadHeight + 1
        }
      }, _react.default.createElement("div", {
        ref: "elFixedRightBody",
        className: "".concat(prefixCls, "-body-inner"),
        style: {
          maxHeight: height
        }
      }, body)));

      return _react.default.createElement(_Loading.default, {
        show: loading
      }, _react.default.createElement("div", {
        className: classString,
        ref: "table"
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-top")
      }), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-middle")
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-scroll"),
        ref: "elMainScroll"
      }, main), this.fixedLeft && this.fixedLeft.length > 0 && this.fixedLeft[0].length ? left : null, this.fixedRight && this.fixedRight.length > 0 && this.fixedRight[0].length > 0 ? right : null), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-bottom")
      }, pagination && allPage > 1 ? _react.default.createElement(_Pagination.default, (0, _extends2.default)({
        kStyle: "primary"
      }, pagination, {
        onChange: this.handlePageChange
      })) : null)));
    } // getFitler(filter){
    //     let ret={};
    //     if(filter){
    //         Object.keys(filter).forEach(key=>{
    //             ret[key.split()]
    //         })
    //     }
    //     return ret;
    // }

  }]);
  return Table;
}(_react.Component);

Table.propTypes = {
  bordered: _propTypes.default.bool,
  checkbox: _propTypes.default.bool,
  checkedIds: _propTypes.default.arrayOf(_propTypes.default.string),
  data: _propTypes.default.array,
  defaultCheckedIds: _propTypes.default.arrayOf(_propTypes.default.string),
  defaultExpandedRowIds: _propTypes.default.arrayOf(_propTypes.default.string),
  disabledCheckIds: _propTypes.default.arrayOf(_propTypes.default.string),
  expandedRowIds: _propTypes.default.arrayOf(_propTypes.default.string),
  expandedRowRender: _propTypes.default.func,
  // footer: PropTypes.object,
  height: _propTypes.default.number,
  // indentSize: PropTypes.number,
  loading: _propTypes.default.bool,
  pagination: _propTypes.default.object,
  rowClassName: _propTypes.default.func,
  // showHeader: PropTypes.bool,
  stripe: _propTypes.default.bool,
  // title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onCheck: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onExpand: _propTypes.default.func
};
Table.defaultProps = {
  bordered: false,
  checkbox: false,
  defaultCheckedIds: [],
  defaultExpandedRowIds: [],
  // showHeader: true,
  stripe: false
};
var _default = Table;
exports.default = _default;