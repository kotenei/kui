"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirm;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Modal = _interopRequireDefault(require("./Modal"));

var _ActionButton = _interopRequireDefault(require("./ActionButton"));

function confirm(config) {
  var instance;
  var props = (0, _objectSpread2.default)({
    iconType: 'question-circle',
    okCancel: true,
    cancelText: '取消',
    okText: '确定',
    width: 420,
    height: 210
  }, config);
  var prefixCls = 'k-confirm';
  var div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    instance.hide();
    instance = null;
    setTimeout(function () {
      var unmountResult = _reactDom.default.unmountComponentAtNode(div);

      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }, 300);
  }

  var body = _react.default.createElement("div", {
    className: "".concat(prefixCls, "-body")
  }, _react.default.createElement(_Icon.default, {
    type: props.iconType,
    className: "text-".concat(props.type),
    theme: "filled"
  }), _react.default.createElement("span", {
    className: "".concat(prefixCls, "-title")
  }, props.title), _react.default.createElement("div", {
    className: "".concat(prefixCls, "-content")
  }, props.content));

  var footer;

  if (props.okCancel) {
    footer = _react.default.createElement("div", {
      className: "".concat(prefixCls, "-btns")
    }, _react.default.createElement(_ActionButton.default, {
      kStyle: props.cancelStyle,
      onClick: props.onCancel,
      closeModal: close
    }, props.cancelText), _react.default.createElement(_ActionButton.default, {
      kStyle: props.okStyle || 'primary',
      onClick: props.onOK,
      closeModal: close
    }, props.okText));
  } else {
    footer = _react.default.createElement("div", {
      className: "".concat(prefixCls, "-btns")
    }, _react.default.createElement(_ActionButton.default, {
      kStyle: props.okStyle || 'primary',
      onClick: props.onOK,
      closeModal: close
    }, props.okText));
  }

  body = _react.default.createElement("div", {
    className: "".concat(prefixCls)
  }, body, footer);
  instance = _reactDom.default.render(_react.default.createElement(_Modal.default, {
    content: body,
    showHeader: false,
    showFooter: false,
    width: props.width,
    height: props.height,
    show: true
  }), div);
  return {
    destory: close
  };
}