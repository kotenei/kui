"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _object = _interopRequireDefault(require("object.omit"));

var _object2 = _interopRequireDefault(require("object.pick"));

var _Dragger = _interopRequireDefault(require("./Dragger"));

var _UploadList = _interopRequireDefault(require("./UploadList"));

var _UploadListItem = _interopRequireDefault(require("./UploadListItem"));

var _reactTransitionGroup = require("react-transition-group");

var _utils = require("../../utils");

var _upload = _interopRequireDefault(require("./upload"));

var _mimeType = require("./mimeType");

var prefixCls = "k-upload";

var Upload =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Upload, _Component);

  function Upload(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Upload);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Upload).call(this, props));

    _this.handleClick = function () {
      var disabled = _this.props.disabled;

      if (disabled) {
        return;
      }

      _this.refs.file.value = null;

      _this.refs.file.click();
    };

    _this.handleChange = function (e) {
      var files = e.target.files;

      _this.uploadFiles(files);
    };

    _this.handleDragOver = function (e) {};

    _this.handleDragLeave = function (e) {};

    _this.handleDrop = function (e) {
      var files = e.dataTransfer.files;

      _this.uploadFiles(files);
    };

    _this.handleRemove = function (index) {
      var _this$props = _this.props,
          onRemove = _this$props.onRemove,
          onChange = _this$props.onChange;
      var fileList = _this.state.fileList;
      var removeFile = fileList[index];
      var newFileList = (0, _toConsumableArray2.default)(fileList);
      newFileList.splice(index, 1);

      if (_this.reqs[removeFile.id]) {
        _this.reqs[removeFile.id].abort();
      }

      if (!("fileList" in _this.props)) {
        _this.setState({
          fileList: newFileList
        });
      }

      if (onRemove) {
        onRemove(removeFile);
      }

      if (onChange) {
        onChange({
          file: removeFile,
          fileList: newFileList
        });
      }
    };

    _this.reqs = {};
    _this.state = {
      fileList: props.fileList || props.defaultFileList || []
    };
    return _this;
  }

  (0, _createClass2.default)(Upload, [{
    key: "uploadFiles",

    /**
     * 上传文件
     * @param {array} files
     */
    value: function uploadFiles(files) {
      var _this2 = this;

      var _this$props2 = this.props,
          beforeUpload = _this$props2.beforeUpload,
          listType = _this$props2.listType,
          multiple = _this$props2.multiple,
          disabled = _this$props2.disabled;
      var fileList = this.state.fileList;
      files = this.getAcceptFiles(files);

      if (disabled || !files || files.length === 0) {
        return;
      }

      var postFiles = Array.prototype.slice.call(files).map(function (file) {
        return {
          id: (0, _utils.guid)(),
          name: file.name,
          lastModified: file.lastModified,
          originFileObj: file,
          size: file.size,
          type: file.type,
          percent: 0
        };
      });
      var newFileList = (0, _toConsumableArray2.default)(this.state.fileList);
      postFiles.every(function (file) {
        var before = beforeUpload ? beforeUpload(postFiles) : true;

        if (before) {
          file.status = "uploading";

          if (listType !== "text" && file.type.indexOf("image") != -1) {
            try {
              file.thumbUrl = URL.createObjectURL(file.originFileObj);
            } catch (err) {
              console.error(err);
              return;
            }
          }

          newFileList.push(file);

          _this2.onChange({
            file: file,
            fileList: newFileList
          });

          _this2.post(file);
        }

        if (!multiple) {
          return false;
        }

        return true;
      });
    }
  }, {
    key: "post",
    value: function post(uploadFile) {
      var _this3 = this;

      var _this$props3 = this.props,
          headers = _this$props3.headers,
          withCredentials = _this$props3.withCredentials,
          data = _this$props3.data,
          name = _this$props3.name,
          action = _this$props3.action;
      var options = {
        headers: headers,
        withCredentials: withCredentials,
        file: uploadFile.originFileObj,
        data: data,
        filename: name,
        action: action,
        onProgress: function onProgress(e) {
          _this3.onProgress(e, uploadFile);
        },
        onSuccess: function onSuccess(res) {
          _this3.onSuccess(res, uploadFile);
        },
        onError: function onError(err) {
          _this3.onError(err, uploadFile);
        }
      };
      var req = (0, _upload.default)(options);
      this.reqs[uploadFile.id] = req;
    }
  }, {
    key: "onChange",
    value: function onChange(info) {
      var onChange = this.props.onChange;

      if (!("fileList" in this.props)) {
        this.setState({
          fileList: info.fileList
        });
      }

      if (onChange) {
        onChange(info);
      }
    }
  }, {
    key: "onProgress",
    value: function onProgress(e, uploadFile) {
      var fileList = this.state.fileList;
      var targetFile = this.getFileItem(uploadFile, fileList); // targetFile.status = "done";

      targetFile.percent = e.percent;
      this.onChange({
        file: targetFile,
        fileList: fileList
      });
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(res, uploadFile) {
      var fileList = this.state.fileList;
      var targetFile = this.getFileItem(uploadFile, fileList);
      targetFile.status = "done";
      this.onChange({
        file: targetFile,
        fileList: fileList
      });
    }
  }, {
    key: "onError",
    value: function onError(err, uploadFile) {
      var fileList = this.state.fileList;
      var targetFile = this.getFileItem(uploadFile, fileList);
      targetFile.status = "error";
      targetFile.response = typeof err === "string" ? err : err.msg || "error";
      this.onChange({
        file: targetFile,
        fileList: fileList
      });
    }
  }, {
    key: "getFileItem",
    value: function getFileItem(file, fileList) {
      return fileList && fileList.length > 0 && fileList.find(function (item) {
        return item.id == file.id;
      });
    }
  }, {
    key: "getAcceptFiles",
    value: function getAcceptFiles(files) {
      var accept = this.props.accept;
      var acceptFiles = [].slice.call(files).filter(function (file) {
        var name = file.name;
        var ext = name.indexOf(".") > -1 ? "".concat(name.split(".").pop()) : "";

        if (accept) {
          return accept.split(",").some(function (acceptType) {
            acceptType = acceptType.toLowerCase();
            return _mimeType.mimeTypeToExtensionMap.some(function (item) {
              return item[0] === acceptType && item[1] === ext;
            });
          });
        }

        return true;
      });
      return acceptFiles;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ("fileList" in nextProps) {
        this.setState({
          fileList: nextProps.fileList || []
        });
      }
    }
  }, {
    key: "renderFileList",
    value: function renderFileList() {
      var _this4 = this;

      var showUploadList = this.props.showUploadList;
      var fileList = this.state.fileList;
      var listProps = (0, _object2.default)(this.props, ["listType", "uploadingText"]);
      var files = [];

      if (!showUploadList || !fileList) {
        return null;
      }

      fileList.forEach(function (file, index) {
        files.push(_react.default.createElement(_reactTransitionGroup.CSSTransition, {
          key: index,
          timeout: 300,
          classNames: "fade"
        }, _react.default.createElement(_UploadListItem.default, (0, _extends2.default)({
          key: index,
          index: index
        }, file, listProps, {
          onRemove: _this4.handleRemove
        }))));
      });
      return _react.default.createElement(_UploadList.default, (0, _extends2.default)({
        prefixCls: prefixCls
      }, listProps), _react.default.createElement(_reactTransitionGroup.TransitionGroup, {
        component: _react.default.Fragment
      }, files));
    }
  }, {
    key: "renderSelect",
    value: function renderSelect() {
      var _classnames;

      var _this$props4 = this.props,
          children = _this$props4.children,
          dragger = _this$props4.dragger,
          name = _this$props4.name,
          accept = _this$props4.accept,
          listType = _this$props4.listType,
          multiple = _this$props4.multiple;
      var fileList = this.state.fileList;
      var classString = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-select"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-select-").concat(listType), listType), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-select-dragger"), dragger), _classnames));
      return _react.default.createElement("div", {
        className: classString,
        onClick: this.handleClick
      }, dragger ? _react.default.createElement(_Dragger.default, {
        prefixCls: prefixCls,
        onDragOver: this.handleDragOver,
        onDragLeave: this.handleDragLeave,
        onDrop: this.handleDrop
      }, children) : _react.default.createElement("span", null, children), _react.default.createElement("input", {
        ref: "file",
        type: "file",
        className: "".concat(prefixCls, "__file"),
        name: name,
        accept: accept,
        multiple: multiple,
        onChange: this.handleChange
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          className = _this$props5.className,
          listType = _this$props5.listType,
          dragger = _this$props5.dragger;
      var classString = (0, _classnames3.default)(className, (0, _defineProperty2.default)({}, prefixCls, true));
      return _react.default.createElement("div", {
        className: classString
      }, listType != "picture-card" || dragger ? this.renderSelect() : null, this.renderFileList(), listType == "picture-card" && !dragger ? this.renderSelect() : null);
    }
  }]);
  return Upload;
}(_react.Component);

Upload.propTypes = {
  accept: _propTypes.default.string,
  action: _propTypes.default.string,
  beforeUpload: _propTypes.default.func,
  data: _propTypes.default.object,
  defaultFileList: _propTypes.default.array,
  dragger: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  fileList: _propTypes.default.array,
  headers: _propTypes.default.object,
  listType: _propTypes.default.oneOf(["text", "picture", "picture-card"]),
  multiple: _propTypes.default.bool,
  name: _propTypes.default.string,
  showUploadList: _propTypes.default.bool,
  withCredentials: _propTypes.default.bool,
  uploadingText: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onRemove: _propTypes.default.func
};
Upload.defaultProps = {
  defaultFileList: [],
  dragger: false,
  listType: "text",
  name: "file",
  showUploadList: true,
  withCredentials: false,
  uploadingText: "上传中...",
  multiple: true
};
var _default = Upload;
exports.default = _default;