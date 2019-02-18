"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _dateFns = require("date-fns");

var _dateUtils = require("../../utils/dateUtils");

var _utils = require("../../utils");

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _Popover = _interopRequireDefault(require("./Popover"));

var _PopPanel = _interopRequireDefault(require("../PopPanel"));

var Cell =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Cell, _Component);

  function Cell() {
    (0, _classCallCheck2.default)(this, Cell);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Cell).apply(this, arguments));
  }

  (0, _createClass2.default)(Cell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          value = _this$props.value,
          className = _this$props.className,
          date = _this$props.date;
      var formatStr = "YYYYMMDD",
          now = (0, _dateFns.format)(new Date(), formatStr),
          cur = (0, _dateFns.format)(date, formatStr),
          active = now == cur;
      return _react.default.createElement("div", {
        className: (0, _classnames4.default)(className, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-row-cell"), true))
      }, _react.default.createElement("span", {
        className: active ? "active" : null
      }, value));
    }
  }]);
  return Cell;
}(_react.Component);

Cell.propTypes = {
  prefixCls: _propTypes.default.string,
  value: _propTypes.default.any,
  date: _propTypes.default.object,
  data: _propTypes.default.object
};

var Event = function Event(props) {
  var style = props.style,
      data = props.data,
      progressStyle = props.progressStyle,
      prefixCls = props.prefixCls,
      onClick = props.onClick;
  return _react.default.createElement("div", {
    key: event,
    className: "".concat(prefixCls, "-event"),
    style: style,
    onClick: onClick
  }, _react.default.createElement("div", {
    className: "".concat(prefixCls, "-event-progress"),
    style: progressStyle
  }, data.title));
};

var MonthView =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(MonthView, _Component2);

  function MonthView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MonthView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MonthView).call(this, props));

    _this.handleMoreClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      var target = e.target;

      _this.setState({
        active: target.getAttribute("data-key")
      });
    };

    _this.handleClose = function () {
      if (_this.state.active) {
        _this.setState({
          active: null
        });
      }
    };

    _this.handleEventClick = function (event) {
      var onEventClick = _this.props.onEventClick;

      if (onEventClick) {
        onEventClick(event);
      }
    };

    _this.setPosition = function () {
      if (!_this.refs.month) return;

      var elmCell = _this.refs.month.querySelector(".grid-cell"),
          height = _domUtils.default.height(elmCell),
          count = Math.floor(height / _this.eventHeight + 0.25),
          maxTop = (count - 1) * _this.eventHeight;

      _this.setState({
        maxTop: maxTop
      });
    };

    _this.state = {
      mapData: null,
      maxTop: 0,
      position: {
        top: 0,
        left: 0
      },
      active: null
    };
    _this.eventHeight = 20;
    _this.nextEvents = [];
    return _this;
  }

  (0, _createClass2.default)(MonthView, [{
    key: "init",
    value: function init(props) {
      var _ref = props || this.props,
          data = _ref.data,
          date = _ref.date;

      var firstDate = (0, _dateUtils.getFirstDay)(date),
          dayOfWeek = firstDate.getDay(),
          formatStr = "YYYYMMDD",
          startDate,
          endDate;
      this.nextEvents = [];

      if (dayOfWeek == 0) {
        startDate = (0, _dateFns.addDays)(firstDate, -7);
      } else {
        startDate = (0, _dateFns.addDays)(firstDate, -dayOfWeek);
      }

      endDate = (0, _dateFns.addDays)(startDate, 41);

      if (data && data.length > 0) {
        var tmpData = (0, _utils.deepClone)(data);
        var mapData = {},
            key;
        tmpData.forEach(function (item) {
          if (item.tmpStartDate.getTime() < startDate.getTime() && item.tmpEndDate.getTime() >= startDate.getTime()) {
            item.tmpStartDate = startDate;

            if (item.tmpEndDate.getTime() > endDate.getTime()) {
              item.tmpEndDate = endDate;
            }
          }

          key = (0, _dateFns.format)(item.tmpStartDate, formatStr);

          if (!mapData[key]) {
            mapData[key] = [item];
          } else {
            mapData[key].push(item);
          }
        });
        this.setState({
          mapData: mapData
        });
      }

      this.setState({
        startDate: startDate
      });
    }
  }, {
    key: "getWidth",
    value: function getWidth(startDate, endDate) {
      var days = (0, _dateUtils.getDiffDay)(startDate, endDate);
      return (days + 1) / 7 * 100 + "%";
    }
  }, {
    key: "setProgress",
    value: function setProgress(params) {
      var _this2 = this;

      var endDate = params.endDate,
          progressItems = params.progressItems,
          rows = params.rows,
          events = params.events,
          nextEvents = params.nextEvents,
          tmpEvents = params.tmpEvents,
          mapHidden = params.mapHidden;
      var prefixCls = this.props.prefixCls;
      var maxTop = this.state.maxTop;

      if (events) {
        var formatStr = "YYYYMMDD",
            height = this.eventHeight,
            key,
            style;
        events.forEach(function (event, index) {
          key = "".concat(event.id, "-").concat(index);
          style = {
            width: _this2.getWidth(event.tmpStartDate, event.tmpEndDate),
            top: index * height
          };

          if (rows.length == 0) {
            rows.push((0, _toConsumableArray2.default)(event.dates));
          } else {
            var rIndex = -1;

            for (var i = 0; i < rows.length; i++) {
              var row = rows[i];
              rIndex = row.findIndex(function (item) {
                return event.tmpStartDate.getFullYear() + event.tmpStartDate.getMonth() + event.tmpStartDate.getDate() == item.getFullYear() + item.getMonth() + item.getDate();
              });

              if (rIndex == -1) {
                row.push.apply(row, (0, _toConsumableArray2.default)(event.dates));
                style.top = i * height;
                break;
              }
            }

            if (rIndex >= 0) {
              rows.push((0, _toConsumableArray2.default)(event.dates));
              style.top = (rows.length - 1) * height;
            }
          }

          if ((0, _dateFns.format)(event.tmpEndDate, formatStr) > (0, _dateFns.format)(endDate, formatStr)) {
            var newEvent = (0, _objectSpread2.default)({}, event, {
              tmpEndDate: endDate
            });
            nextEvents.push((0, _objectSpread2.default)({}, event, {
              tmpStartDate: (0, _dateFns.addDays)(endDate, 1)
            }));
            style.width = _this2.getWidth(newEvent.tmpStartDate, newEvent.tmpEndDate);

            if (style.top >= maxTop) {
              newEvent.position = style;

              _this2.setHidden(newEvent, tmpEvents, mapHidden);

              tmpEvents.push(newEvent);
            } else {
              progressItems.push(_react.default.createElement(Event, {
                key: key,
                prefixCls: prefixCls,
                style: style,
                progressStyle: event.style,
                data: newEvent,
                onClick: _this2.handleEventClick.bind(_this2, event)
              }));
            }
          } else {
            if (style.top >= maxTop) {
              event.position = style;

              _this2.setHidden(event, tmpEvents, mapHidden);

              tmpEvents.push(event);
            } else {
              progressItems.push(_react.default.createElement(Event, {
                key: key,
                prefixCls: prefixCls,
                style: style,
                progressStyle: event.style,
                data: event,
                onClick: _this2.handleEventClick.bind(_this2, event)
              }));
            }
          }
        });
      }
    }
  }, {
    key: "setHidden",
    value: function setHidden(event, events, mapHidden) {
      var _this3 = this;

      var maxTop = this.state.maxTop;

      if (event.position.top >= maxTop) {
        var formatStr = "YYYYMMDD",
            key;
        event.hidden = true;
        events.forEach(function (item) {
          if (item.position.top >= maxTop - _this3.eventHeight && !item.hidden && event.tmpStartDate.getTime() >= item.tmpStartDate.getTime() && event.tmpStartDate.getTime() <= item.tmpEndDate.getTime()) {
            item.hidden = true;
            item.dates.forEach(function (date) {
              key = (0, _dateFns.format)(date, formatStr);

              if (!mapHidden[key]) {
                mapHidden[key] = [item];
              } else {
                mapHidden[key].push(item);
              }
            });
          }
        });
        event.dates.forEach(function (date) {
          key = (0, _dateFns.format)(date, formatStr);

          if (!mapHidden[key]) {
            mapHidden[key] = [event];
          } else {
            mapHidden[key].push(event);
          }
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
      this.setPosition();
      window.addEventListener("resize", this.setPosition);
      document.addEventListener("click", this.handleClose);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.init(nextProps);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.setPosition);
      document.removeEventListener("click", this.handleClose);
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(prefixCls) {
      var lang = this.props.lang;
      return _react.default.createElement("div", {
        className: (0, _classnames4.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-header"), true))
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-row"),
        style: {
          borderBottom: 0,
          borderTop: 0
        }
      }, _dateUtils.dates[lang].daysShort.map(function (item) {
        var _classnames3;

        return _react.default.createElement("div", {
          key: item,
          className: (0, _classnames4.default)((_classnames3 = {}, (0, _defineProperty2.default)(_classnames3, "".concat(prefixCls, "-row-cell"), true), (0, _defineProperty2.default)(_classnames3, "head-cell", true), _classnames3))
        }, item);
      })));
    }
  }, {
    key: "renderBody",
    value: function renderBody(prefixCls) {
      var date = this.props.date;
      var _this$state = this.state,
          startDate = _this$state.startDate,
          mapData = _this$state.mapData,
          tmpData = _this$state.tmpData;
      var tmpDate = startDate,
          cells = [],
          rows = [],
          arrDate = [];
      this.nextEvents = [];

      for (var i = 1, className; i <= 42; i++) {
        className = (0, _classnames4.default)({
          "body-cell": true,
          gray: !(tmpDate.getFullYear() == date.getFullYear() && tmpDate.getMonth() == date.getMonth())
        });
        cells.push(_react.default.createElement(Cell, {
          key: "cell_".concat(i),
          className: className,
          value: tmpDate.getDate(),
          date: tmpDate,
          prefixCls: prefixCls
        }));
        arrDate.push(tmpDate);
        tmpDate = (0, _dateFns.addDays)(startDate, i);
      }

      for (var _i = 0; _i < 6; _i++) {
        rows.push(_react.default.createElement("div", {
          key: "row-".concat(_i),
          className: "".concat(prefixCls, "-row")
        }, _react.default.createElement("div", {
          className: "".concat(prefixCls, "-row-cell-container")
        }, cells.splice(0, 7)), _react.default.createElement("div", {
          className: "".concat(prefixCls, "-row-event-container")
        }, this.renderGridCells(arrDate.splice(0, 7), _i))));
      }

      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-body")
      }, rows);
    }
  }, {
    key: "renderGridCells",
    value: function renderGridCells(arrDate, index) {
      var _this4 = this;

      var _this$state2 = this.state,
          mapData = _this$state2.mapData,
          active = _this$state2.active;
      var prefixCls = this.props.prefixCls;
      var formatStr = "YYYYMMDD",
          startDate = arrDate[0],
          endDate = arrDate[arrDate.length - 1],
          gridCells = [],
          progressItems = [],
          nextEvents = [],
          rows = [],
          tmpEvents = [],
          flag = false,
          mapHidden = {},
          events,
          key,
          style;
      arrDate.forEach(function (date) {
        key = (0, _dateFns.format)(date, formatStr);
        progressItems = [];

        if (mapData) {
          if (_this4.nextEvents && _this4.nextEvents.length > 0 && !flag) {
            _this4.setProgress({
              endDate: endDate,
              progressItems: progressItems,
              rows: rows,
              events: _this4.nextEvents,
              nextEvents: nextEvents,
              tmpEvents: tmpEvents,
              mapHidden: mapHidden
            });

            flag = true;
          }

          events = mapData[key];

          _this4.setProgress({
            endDate: endDate,
            progressItems: progressItems,
            rows: rows,
            events: events,
            nextEvents: nextEvents,
            tmpEvents: tmpEvents,
            mapHidden: mapHidden
          });
        }

        if (mapHidden[key]) {
          var popTitle = (0, _dateFns.format)(date, "YYYY-MM-DD");
          progressItems.push(_react.default.createElement(_PopPanel.default, {
            transitionName: "scale",
            open: active == key,
            input: _react.default.createElement("div", {
              "data-key": key,
              className: "grid-cell-more",
              onClick: _this4.handleMoreClick
            }, "\u8FD8\u6709", mapHidden[key].length, "\u9879"),
            key: "popPanel_".concat(key)
          }, _react.default.createElement(_Popover.default, {
            title: popTitle,
            prefixCls: prefixCls,
            onClose: _this4.handleClose
          }, mapHidden[key].map(function (hidden, index) {
            return _react.default.createElement(Event, {
              key: "hiddenEvent_".concat(hidden.id, "_").concat(index),
              data: hidden,
              prefixCls: prefixCls,
              style: {
                padding: 0,
                position: "static",
                width: "100%"
              },
              progressStyle: hidden.style,
              onClick: _this4.handleEventClick.bind(_this4, hidden)
            });
          }))));
        }

        gridCells.push(_react.default.createElement("div", {
          key: "gridCell_".concat(key),
          className: "grid-cell"
        }, progressItems));
      });
      this.nextEvents = nextEvents;
      return gridCells;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          date = _this$props2.date,
          lang = _this$props2.lang;
      var prefixCls = "".concat(this.props.prefixCls, "-month");
      return _react.default.createElement("div", {
        className: prefixCls,
        ref: "month"
      }, this.renderHeader(prefixCls), this.renderBody(prefixCls));
    }
  }]);
  return MonthView;
}(_react.Component);

MonthView.propTypes = {
  date: _propTypes.default.object,
  data: _propTypes.default.array,
  lang: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  onEventClick: _propTypes.default.func
};
MonthView.defaultProps = {
  date: new Date(),
  lang: "zh-cn",
  prefixCls: "k-calendar"
};
var _default = MonthView;
exports.default = _default;