import React, { Component } from "react";
import PropTypes from "prop-types";
import domUtils from "../../utils/domUtils";
import Icon from "../Icon";

const prefixCls = "k-lazyload";

class LazyLoad extends Component {
    constructor(props) {
        super(props);
        this.count = 0;
        this.cache = [];
        this.loading = {};
    }
    static propTypes = {
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        loading: PropTypes.string,
        error: PropTypes.string,
        onSuccess: PropTypes.func,
        onError: PropTypes.func
    };
    handleScroll = e => {
        this.load();
    };
    load() {
        if (this.count <= 0) {
            return;
        }
        const { onSuccess, onError, error } = this.props;
        let containerHeight = domUtils.height(this.refs.container),
            containerTop = domUtils.offset(this.refs.container).top;

        this.cache.forEach(img => {
            let src = img.getAttribute("data-src"),
                imgTop = domUtils.offset(img).top,
                imgHeight = domUtils.height(img),
                range = [
                    imgTop - containerTop,
                    imgTop - containerTop + imgHeight
                ];
            if (
                (range[0] >= 0 && range[0] < containerHeight) ||
                (range[1] > 0 && range[1] <= containerHeight)
            ) {
                this.loadImageAsync(
                    src,
                    ret => {
                        img.setAttribute("src", ret.src);
                        if (onSuccess) {
                            onSuccess({
                                ...ret,
                                target: img
                            });
                        }
                        this.count--;
                    },
                    e => {
                        if (error) {
                            img.setAttribute("src", error);
                        }
                        if (onError) {
                            onError({
                                target: img,
                                src: src
                            });
                        }
                        this.count--;
                    }
                );
            }
        });
    }
    loadImageAsync(src, resolve, reject) {
        if (this.loading[src]) {
            return;
        }
        this.loading[src] = true;
        let image = new Image();
        image.src = src;
        image.onload = function() {
            resolve({
                naturalHeight: image.naturalHeight,
                naturalWidth: image.naturalWidth,
                src
            });
        };
        image.onerror = function(e) {
            reject(e);
        };
    }
    componentDidMount() {
        const { loading } = this.props;
        this.elmImgs = this.refs.container.querySelectorAll("img");
        this.elmImgs.forEach(img => {
            if (!img.getAttribute("data-src")) {
                return;
            }
            if (!img.getAttribute("src") && loading) {
                img.setAttribute("src", loading);
            }
            this.cache.push(img);
            this.count++;
        });
        if (loading) {
            this.loadImageAsync(loading, ret => {
                this.load();
            });
        } else {
            this.tm = setTimeout(() => {
                this.load();
            }, 300);
        }
    }
    componentWillUnmount() {
        if (this.tm) {
            clearTimeout(this.tm);
        }
    }
    render() {
        const { children, style, width, height } = this.props;
        let elmStyle = {
            width,
            height,
            ...style
        };
        return (
            <div
                className={prefixCls}
                style={elmStyle}
                ref="container"
                onScroll={this.handleScroll}
            >
                {children}
            </div>
        );
    }
}

export default LazyLoad;
