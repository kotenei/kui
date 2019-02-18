"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _domUtils = _interopRequireDefault(require("../../utils/domUtils"));

var _Icon = _interopRequireDefault(require("../Icon"));

var prefixCls = "k-lazyload";

var LazyLoad =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LazyLoad, _Component);

  function LazyLoad(props) {
    var _this;

    (0, _classCallCheck2.default)(this, LazyLoad);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LazyLoad).call(this, props));

    _this.handleScroll = function (e) {
      _this.load();
    };

    _this.count = 0;
    _this.cache = [];
    _this.loading = {};
    return _this;
  }

  (0, _createClass2.default)(LazyLoad, [{
    key: "load",
    value: function load() {
      var _this2 = this;

      if (this.count <= 0) {
        return;
      }

      var _this$props = this.props,
          onSuccess = _this$props.onSuccess,
          onError = _this$props.onError,
          error = _this$props.error;

      var containerHeight = _domUtils.default.height(this.refs.container),
          containerTop = _domUtils.default.offset(this.refs.container).top;

      this.cache.forEach(function (img) {
        var src = img.getAttribute("data-src"),
            imgTop = _domUtils.default.offset(img).top,
            imgHeight = _domUtils.default.height(img),
            range = [imgTop - containerTop, imgTop - containerTop + imgHeight];

        if (range[0] >= 0 && range[0] < containerHeight || range[1] > 0 && range[1] <= containerHeight) {
          _this2.loadImageAsync(src, function (ret) {
            img.setAttribute("src", ret.src);

            if (onSuccess) {
              onSuccess((0, _objectSpread2.default)({}, ret, {
                target: img
              }));
            }

            _this2.count--;
          }, function (e) {
            if (error) {
              img.setAttribute("src", error);
            }

            if (onError) {
              onError({
                target: img,
                src: src
              });
            }

            _this2.count--;
          });
        }
      });
    }
  }, {
    key: "loadImageAsync",
    value: function loadImageAsync(src, resolve, reject) {
      if (this.loading[src]) {
        return;
      }

      this.loading[src] = true;
      var image = new Image();
      image.src = src;

      image.onload = function () {
        resolve({
          naturalHeight: image.naturalHeight,
          naturalWidth: image.naturalWidth,
          src: src
        });
      };

      image.onerror = function (e) {
        reject(e);
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var loading = this.props.loading;
      this.elmImgs = this.refs.container.querySelectorAll("img");
      this.elmImgs.forEach(function (img) {
        if (!img.getAttribute("data-src")) {
          return;
        }

        if (!img.getAttribute("src") && loading) {
          img.setAttribute("src", loading);
        }

        _this3.cache.push(img);

        _this3.count++;
      });

      if (loading) {
        this.loadImageAsync(loading, function (ret) {
          _this3.load();
        });
      } else {
        this.tm = setTimeout(function () {
          _this3.load();
        }, 300);
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
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          style = _this$props2.style,
          width = _this$props2.width,
          height = _this$props2.height;
      var elmStyle = (0, _objectSpread2.default)({
        width: width,
        height: height
      }, style);
      return _react.default.createElement("div", {
        className: prefixCls,
        style: elmStyle,
        ref: "container",
        onScroll: this.handleScroll
      }, children);
    }
  }]);
  return LazyLoad;
}(_react.Component);

LazyLoad.propTypes = {
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  loading: _propTypes.default.string,
  error: _propTypes.default.string,
  onSuccess: _propTypes.default.func,
  onError: _propTypes.default.func
};
var _default = LazyLoad;
exports.default = _default;