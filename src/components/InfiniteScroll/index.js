import React, { Component } from "react";
import PropTypes from "prop-types";
import domUtils from "../../utils/domUtils";

const prefixCls = "k-infinitescroll";

class InfiniteScroll extends Component {
    constructor(props) {
        super(props);
        this.top = 0;
    }
    static propTypes = {
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        distance: PropTypes.number,
        onScrollEnd: PropTypes.func
    };
    static defaultProps = {
        height: 500,
        distance: 0.3
    };
    handleScroll = e => {
        const { distance, onScrollEnd } = this.props;
        let height = domUtils.height(this.refs.container),
            scrollBottom = height + this.refs.container.scrollTop,
            watchElmBottom = this.top + domUtils.height(this.refs.watch),
            remaining = watchElmBottom - scrollBottom,
            canScroll = remaining <= height * distance;
        if (canScroll) {
            if (onScrollEnd) {
                onScrollEnd();
            }
        }
    };
    componentDidMount() {
        this.top = domUtils.position(this.refs.watch).top;
        this.handleScroll();
    }
    render() {
        const { children, style, width, height } = this.props;
        return (
            <div
                className={prefixCls}
                style={{ width, height, style }}
                onScroll={this.handleScroll}
                ref="container"
            >
                <div className={`${prefixCls}-watch`} ref="watch">
                    {children}
                </div>
            </div>
        );
    }
}

export default InfiniteScroll;
