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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _kUtils = require("../../utils/kUtils");

var _styleMaps = require("../../utils/styleMaps");

var _classnames = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _PaginationItem = _interopRequireDefault(require("./PaginationItem"));

var Pagination =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Pagination, _Component);

  function Pagination(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Pagination);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Pagination).call(this, props));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      current: props.pageNumber || props.defaultPageNumber,
      hoverType: 0
    };
    return _this;
  }

  (0, _createClass2.default)(Pagination, [{
    key: "handleChange",
    value: function handleChange(current) {
      var onChange = this.props.onChange;

      if (current != this.state.current) {
        onChange(current);

        if (!("pageNumber" in this.props)) {
          this.setState({
            current: current
          });
        }
      }

      this.setState({
        hoverType: 0
      });
    }
  }, {
    key: "getPageInfo",
    value: function getPageInfo() {
      var start, end, pre, next, allPage;
      var _this$props = this.props,
          total = _this$props.total,
          pageSize = _this$props.pageSize;
      var current = this.state.current; //确定总页数

      allPage = parseInt(total / pageSize);
      allPage = total % pageSize !== 0 ? allPage + 1 : allPage;
      allPage = allPage === 0 ? 1 : allPage; //确定起始和结束页码

      start = current + 2 > allPage ? allPage - 4 : current - 2;
      end = current < 4 ? 5 : current + 2; //修正起始和结束页的溢出

      if (start < 1) {
        start = 1;
      }

      if (end > allPage) {
        end = allPage;
      } //确定前一页和下一页的数字


      pre = current - 1 < 1 ? 1 : current - 1;
      next = current + 1 > allPage ? allPage : current + 1;
      return {
        start: start,
        end: end,
        pre: pre,
        next: next,
        allPage: allPage
      };
    }
  }, {
    key: "init",
    value: function init() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var pageNumber = props.pageNumber,
          defaultPageNumber = props.defaultPageNumber,
          total = props.total,
          pageSize = props.pageSize;
      var current = this.state.current;

      if ("pageNumber" in props && current != pageNumber) {
        this.setState({
          current: pageNumber
        });
      } else {
        var allPage = parseInt(total / pageSize);
        var _current = this.state.current;
        allPage = total % pageSize !== 0 ? allPage + 1 : allPage;
        allPage = allPage === 0 ? 1 : allPage;

        if (_current < 1) {
          _current = 1;
        }

        if (_current > allPage) {
          _current = allPage;
        }

        this.setState({
          current: _current
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.init(nextProps);
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this2 = this;

      var _this$state = this.state,
          current = _this$state.current,
          hoverType = _this$state.hoverType;
      var jumpNumber = this.props.jumpNumber;
      var info = this.getPageInfo(),
          items = [],
          jumpPrev = current - jumpNumber,
          jumpNext = current + jumpNumber,
          key = 0,
          className;

      if (jumpPrev <= 0) {
        jumpPrev = 1;
      }

      if (jumpNext > info.allPage) {
        jumpNext = info.allPage;
      }

      className = "k-pagination-prev";

      if (current <= 1) {
        className += " disabled";
      }

      items.push(_react.default.createElement(_PaginationItem.default, {
        key: key++,
        num: info.pre,
        className: className,
        onClick: this.handleChange
      }, _react.default.createElement(_Icon.default, {
        type: "left"
      })));

      if (info.start > 1) {
        items.push(_react.default.createElement(_PaginationItem.default, {
          key: key++,
          num: 1,
          onClick: this.handleChange
        }, "1"));
        items.push(_react.default.createElement(_PaginationItem.default, {
          key: key++,
          num: jumpPrev,
          className: "k-pagination-jump-prev",
          onClick: this.handleChange,
          onMouseOver: function onMouseOver() {
            if (hoverType == 1) {
              return;
            }

            _this2.setState({
              hoverType: 1
            });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({
              hoverType: 0
            });
          }
        }, _react.default.createElement(_Icon.default, {
          type: hoverType == 1 ? "double-left" : "ellipsis"
        })));
      }

      for (var i = info.start; i <= info.end; i++) {
        className = i === current ? "active" : "";
        items.push(_react.default.createElement(_PaginationItem.default, {
          key: key++,
          num: i,
          className: className,
          onClick: this.handleChange
        }, i));
      }

      if (info.end < info.allPage) {
        items.push(_react.default.createElement(_PaginationItem.default, {
          key: key++,
          num: jumpNext,
          className: "k-pagination-jump-next",
          onClick: this.handleChange,
          onMouseOver: function onMouseOver() {
            if (hoverType == 2) {
              return;
            }

            _this2.setState({
              hoverType: 2
            });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({
              hoverType: 0
            });
          }
        }, _react.default.createElement(_Icon.default, {
          type: hoverType == 2 ? "double-right" : "ellipsis"
        })));
        items.push(_react.default.createElement(_PaginationItem.default, {
          key: key++,
          num: info.allPage,
          onClick: this.handleChange
        }, info.allPage));
      }

      className = "k-pagination-next";

      if (current === info.allPage) {
        className += " disabled";
      }

      items.push(_react.default.createElement(_PaginationItem.default, {
        key: key++,
        num: info.next,
        className: className,
        onClick: this.handleChange
      }, _react.default.createElement(_Icon.default, {
        type: "right"
      })));
      return items;
    }
  }, {
    key: "render",
    value: function render() {
      var classes = (0, _kUtils.getClassSet)(this.props);
      return _react.default.createElement("ul", {
        className: (0, _classnames.default)(classes)
      }, this.renderItems());
    }
  }]);
  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  defaultPageNumber: _propTypes.default.number,
  total: _propTypes.default.number,
  pageSize: _propTypes.default.number,
  pageNumber: _propTypes.default.number,
  jumpNumber: _propTypes.default.number,
  showTotal: _propTypes.default.bool,
  onChange: _propTypes.default.func
};
Pagination.defaultProps = {
  defaultPageNumber: 1,
  total: 0,
  pageSize: 20,
  jumpNumber: 5,
  showTotal: false,
  onChange: function onChange() {}
};

var styles = _styleMaps.State.values().concat(_styleMaps.PRIMARY);

var _default = (0, _kUtils.kStyles)(styles, (0, _kUtils.kSize)([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL, _styleMaps.Sizes.XSMALL], (0, _kUtils.kClass)("k-pagination", Pagination)));

exports.default = _default;