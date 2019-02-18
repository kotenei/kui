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

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Button = _interopRequireDefault(require("../Button"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _utils = require("../../utils");

var _reactTransitionGroup = require("react-transition-group");

var seed = 1;
var zIndex = 1000;
var prefixCls = 'k-modal';

var Modal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Modal, _Component);

  function Modal(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Modal);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Modal).call(this, props));

    _this.handleCancel = function (e) {
      var onCancel = _this.props.onCancel;
      onCancel.call((0, _assertThisInitialized2.default)(_this), e);
    };

    _this.handleOK = function (e) {
      var onOK = _this.props.onOK;
      onOK.call((0, _assertThisInitialized2.default)(_this), e);
    };

    _this.handleBackdropClick = function (e) {
      var _this$props = _this.props,
          backdropClose = _this$props.backdropClose,
          onCancel = _this$props.onCancel;

      if (backdropClose) {
        onCancel.call((0, _assertThisInitialized2.default)(_this), e);
      }
    };

    _this.layout = function () {
      var _this$props2 = _this.props,
          height = _this$props2.height,
          space = _this$props2.space; //屏幕高度

      var screenHeight = document.documentElement.clientHeight; //最大弹窗高度

      var maxHeight = screenHeight - space; //头部高度

      var headHeight = _domUtils.default.outerHeight(_this.refs.head); //底部高度


      var footHeight = _domUtils.default.outerHeight(_this.refs.foot); //最大容器高度


      var maxBodyHeight = maxHeight - headHeight - footHeight;
      var newHeight, bodyHeight;

      if (height) {
        // 最大弹窗高度小于设置的高度
        if (maxHeight < height) {
          newHeight = maxHeight;
          bodyHeight = maxBodyHeight;
        } else {
          newHeight = height;
          bodyHeight = newHeight - headHeight - footHeight;
        }
      } else {
        // 最大弹窗高度小于当前窗体高度
        if (maxHeight < screenHeight) {
          newHeight = maxHeight;
          bodyHeight = maxBodyHeight;
        } else {
          newHeight = screenHeight;
          bodyHeight = screenHeight - headHeight - footHeight;
        }
      }

      if (newHeight <= _this.minHeight) {
        newHeight = _this.minHeight;
        bodyHeight = newHeight - headHeight - footHeight;
      }

      _this.setState({
        bodyHeight: bodyHeight,
        modalHeight: newHeight
      });
    };

    _this.state = {
      modalWidth: props.width || 600,
      modalHeight: props.height || 500,
      bodyHeight: 400,
      show: false
    };
    _this.minHeight = 200;
    _this.key = "modal_".concat(seed++);
    return _this;
  }

  (0, _createClass2.default)(Modal, [{
    key: "hide",
    value: function hide() {
      this.setState({
        show: false
      });
      zIndex -= 2;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.layout();
      window.addEventListener('resize', this.layout);

      if (this.props.show) {
        zIndex += 2;
        setTimeout(function () {
          _this2.setState({
            show: _this2.props.show
          });
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.show) {
        zIndex += 2;
      } else {
        zIndex -= 2;
      }

      if (this.state.show != nextProps.show) {
        this.setState({
          show: nextProps.show
        });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.show == nextState.show) {
        return false;
      }

      return true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        show: false
      });
      window.removeEventListener('resize', this.layout);
      seed--;
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var _this$props3 = this.props,
          title = _this$props3.title,
          showHeader = _this$props3.showHeader,
          showCloseIcon = _this$props3.showCloseIcon;

      if (!showHeader) {
        return null;
      }

      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-head"),
        ref: "head"
      }, title, showCloseIcon ? _react.default.createElement(_Icon.default, {
        className: "close",
        type: "close",
        onClick: this.handleCancel
      }) : null);
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this$props4 = this.props,
          showFooter = _this$props4.showFooter,
          footer = _this$props4.footer,
          okText = _this$props4.okText,
          okStyle = _this$props4.okStyle,
          cancelText = _this$props4.cancelText,
          cancelStyle = _this$props4.cancelStyle;

      if (!showFooter) {
        return null;
      }

      var items = [];

      if (footer) {
        return _react.default.createElement("div", {
          className: "".concat(prefixCls, "-foot"),
          ref: "foot"
        }, footer);
      } else {
        items.push(_react.default.createElement(_Button.default, {
          key: "modal_cancel",
          raised: true,
          kStyle: cancelStyle,
          onClick: this.handleCancel
        }, cancelText));
        items.push(_react.default.createElement(_Button.default, {
          key: "modal_ok",
          raised: true,
          kStyle: okStyle,
          onClick: this.handleOK
        }, okText));
      }

      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-foot"),
        ref: "foot"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames, _classnames2;

      var _this$props5 = this.props,
          className = _this$props5.className,
          title = _this$props5.title,
          content = _this$props5.content,
          backdrop = _this$props5.backdrop;
      var _this$state = this.state,
          modalWidth = _this$state.modalWidth,
          modalHeight = _this$state.modalHeight,
          bodyHeight = _this$state.bodyHeight,
          show = _this$state.show;
      var classString = (0, _classnames3.default)(className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, prefixCls, true), (0, _defineProperty2.default)(_classnames, 'in', show), _classnames));
      var maskClassString = (0, _classnames3.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "".concat(prefixCls, "-mask"), true), (0, _defineProperty2.default)(_classnames2, "in", backdrop && show), _classnames2));
      return _reactDom.default.createPortal(_react.default.createElement("div", {
        id: this.key
      }, _react.default.createElement("div", {
        className: classString,
        ref: "modal",
        style: {
          width: modalWidth,
          height: modalHeight,
          zIndex: zIndex
        }
      }, this.renderHeader(), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-body"),
        ref: "body",
        style: {
          height: bodyHeight
        }
      }, content), this.renderFooter()), _react.default.createElement("div", {
        className: maskClassString,
        onClick: this.handleBackdropClick,
        style: {
          zIndex: zIndex - 1
        }
      })), document.body);
    }
  }]);
  return Modal;
}(_react.Component);

Modal.propTypes = {
  title: _propTypes.default.node,
  content: _propTypes.default.node,
  footer: _propTypes.default.node,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  backdrop: _propTypes.default.bool,
  backdropClose: _propTypes.default.bool,
  showCloseIcon: _propTypes.default.bool,
  showHeader: _propTypes.default.bool,
  showFooter: _propTypes.default.bool,
  space: _propTypes.default.number,
  show: _propTypes.default.bool,
  okText: _propTypes.default.string,
  okStyle: _propTypes.default.string,
  cancelText: _propTypes.default.string,
  cancelStyle: _propTypes.default.string,
  onOK: _propTypes.default.func,
  onCancel: _propTypes.default.func
};
Modal.defaultProps = {
  title: '对话框',
  width: 720,
  height: 480,
  showHeader: true,
  showFooter: true,
  backdrop: true,
  backdropClose: false,
  showCloseIcon: true,
  show: false,
  okText: '确认',
  okStyle: 'primary',
  cancelText: '取消',
  space: 50,
  onOK: function onOK(e) {},
  onCancel: function onCancel(e) {}
};
var _default = Modal;
exports.default = _default;