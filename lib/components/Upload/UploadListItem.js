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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _reactTransitionGroup = require("react-transition-group");

var _utils = require("../../utils");

var _Progress = _interopRequireDefault(require("../Progress"));

var UploadListItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(UploadListItem, _Component);

  function UploadListItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, UploadListItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(UploadListItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleRemove = function () {
      var _this$props = _this.props,
          onRemove = _this$props.onRemove,
          index = _this$props.index;

      if (onRemove) {
        onRemove(index);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(UploadListItem, [{
    key: "renderPicture",
    value: function renderPicture() {
      var _this$props2 = this.props,
          listType = _this$props2.listType,
          url = _this$props2.url,
          name = _this$props2.name,
          thumbUrl = _this$props2.thumbUrl,
          prefixCls = _this$props2.prefixCls,
          previewTitle = _this$props2.previewTitle,
          removeTitle = _this$props2.removeTitle,
          status = _this$props2.status;
      var imgUrl = thumbUrl;

      switch (listType) {
        case "picture":
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("a", {
            className: "".concat(prefixCls, "__thumb"),
            href: url,
            target: "_blank"
          }, imgUrl ? _react.default.createElement("img", {
            src: imgUrl
          }) : _react.default.createElement(_Icon.default, {
            type: "file"
          })));

        case "picture-card":
          return status !== "uploading" && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("a", {
            className: "".concat(prefixCls, "__thumb"),
            href: url,
            target: "_blank"
          }, imgUrl ? _react.default.createElement("img", {
            src: imgUrl
          }) : _react.default.createElement(_Icon.default, {
            type: "file"
          })), _react.default.createElement("span", {
            className: "".concat(prefixCls, "__action")
          }, _react.default.createElement("a", {
            href: url,
            target: "_blank",
            title: previewTitle
          }, _react.default.createElement(_Icon.default, {
            type: "eye"
          })), _react.default.createElement("a", {
            title: removeTitle,
            onClick: this.handleRemove
          }, _react.default.createElement(_Icon.default, {
            type: "delete"
          }))));

        default:
          return null;
      }
    }
  }, {
    key: "renderProgress",
    value: function renderProgress() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          status = _this$props3.status,
          percent = _this$props3.percent,
          uploadingText = _this$props3.uploadingText;
      return status === "uploading" && percent < 100 && _react.default.createElement("div", {
        className: "".concat(prefixCls, "__progress")
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "__progressText")
      }, uploadingText), _react.default.createElement(_Progress.default, {
        percent: percent,
        showText: false,
        strokeWidth: 2
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          listType = _this$props4.listType,
          status = _this$props4.status,
          url = _this$props4.url,
          name = _this$props4.name,
          id = _this$props4.id,
          percent = _this$props4.percent;
      var classString = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "__item"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "__item--").concat(status), status), _classnames));
      return _react.default.createElement("div", {
        className: classString
      }, _react.default.createElement("span", {
        className: "".concat(prefixCls, "__info")
      }, listType == "text" ? _react.default.createElement(_Icon.default, {
        type: status === "uploading" ? "loading" : "file"
      }) : null, this.renderPicture(), _react.default.createElement("a", {
        className: "".concat(prefixCls, "__text"),
        href: url,
        target: "_brank"
      }, name)), _react.default.createElement("span", {
        className: "".concat(prefixCls, "__icon"),
        onClick: this.handleRemove
      }, _react.default.createElement(_Icon.default, {
        className: "".concat(prefixCls, "__close"),
        type: "close"
      })), this.renderProgress());
    }
  }]);
  return UploadListItem;
}(_react.Component);

UploadListItem.displayName = "UploadListItem";
UploadListItem.propTypes = {
  index: _propTypes.default.number,
  listType: _propTypes.default.oneOf(["text", "picture", "picture-card"]),
  name: _propTypes.default.string,
  percent: _propTypes.default.number,
  prefixCls: _propTypes.default.string,
  response: _propTypes.default.string,
  status: _propTypes.default.oneOf(["done", "error", "uploading"]),
  thumbUrl: _propTypes.default.string,
  url: _propTypes.default.string,
  previewTitle: _propTypes.default.string,
  removeTitle: _propTypes.default.string,
  onRemove: _propTypes.default.func
};
UploadListItem.defaultProps = {
  listType: "text",
  percent: 0,
  prefixCls: "k-upload-list",
  previewTitle: "预览文件",
  removeTitle: "删除文件"
};
var _default = UploadListItem;
exports.default = _default;