import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import classnames from 'classnames';
import CarouselPanel from './CarouselPanel';
import domUtils from '../../utils/domUtils';
import { Transition } from 'react-transition-group';

const prefixCls = 'k-carousel';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1,
            width: 0,
            height: 0,
            totalWidth: 0,
            totalHeight: 0,
            transition: ''
        }
    }
    static propTypes = {
        effect: PropTypes.oneOf(['scroll', 'fade']),
        height: PropTypes.number,
        delay: PropTypes.number,
        autoplay: PropTypes.bool,
        vertical: PropTypes.bool
    }
    static defaultProps = {
        effect: 'scroll',
        height: 160,
        delay: 1000,
        autoplay: true,
        vertical: false
    }
    init() {
        const { children } = this.props;
        const { activeIndex } = this.state;
        let len = children.length,
            max = len + 2,
            width = domUtils.outerWidth(this.refs.carousel),
            height = domUtils.outerHeight(this.refs.carousel),
            totalWidth = max * width,
            totalHeight = max * height,
            x = activeIndex * width,
            y = activeIndex * height;

        this.setState({
            max,
            width,
            height,
            totalWidth,
            totalHeight,
            x,
            y,
            transition: ''
        });
    }
    run() {
        const { delay, autoplay } = this.props;
        const { activeIndex } = this.state;
        if (autoplay) {
            this.tm = setTimeout(() => {
                let index = activeIndex - 1;
                this.active(index, () => {
                    this.run();
                });
            }, delay)
        }
    }
    active(index, callback) {
        const { width, height, max, vertical } = this.state;
        let transition = 'all .3s ease',
            style,
            x, y;

        let tmpIndex = index;

        if (index == max) {
            index = 1;
            transition = '';
        }
        if (index < 0) {
            index = max - 2;
            transition = '';
        }
        if (vertical) {

        } else {
            x = index * width;
            this.setState({
                x,
                transition
            })
        }

        this.setState({
            activeIndex: tmpIndex
        }, () => {
            setTimeout(() => {

                if (index == max - 1) {
                    this.setState({
                        activeIndex: 1,
                        x: width,
                        transition: ''
                    }, () => {
                        if (callback) {
                            callback.call(this);
                        }
                    })
                } else if (index == 0) {
                    this.setState({
                        activeIndex: max - 2,
                        x: (max - 2) * width,
                        transition: ''
                    }, () => {
                        if (callback) {
                            callback.call(this);
                        }
                    })
                } else {
                    if (callback) {
                        callback.call(this);
                    }
                }

            }, 300);
        })



    }
    componentDidMount() {
        const { delay, max } = this.props;
        this.init();
        this.tm = setTimeout(() => {
            this.run();
        }, delay);
    }
    renderList() {
        const { children, vertical } = this.props;
        const { totalWidth, totalHeight, width, height, x, y, transition } = this.state;
        let items = [];

        React.Children.forEach(children, (child, index) => {
            if (!child || child.type != CarouselPanel) {
                return null;
            }
            items.push(
                React.cloneElement(child, {
                    ...child.props,
                    prefixCls,
                    index,
                    width,
                    height,
                    vertical
                })
            )
        });

        if (items.length > 1) {
            items.splice(0, 0, React.cloneElement(items[items.length - 1]))
            items.push(
                React.cloneElement(items[1])
            )
        }

        let style = { transition };

        if (vertical) {
            style.height = totalHeight;
        } else {
            style.width = totalWidth;
            style.transform = `translate3d(-${x}px, 0px, 0px)`;
        }

        return (
            <div className={`${prefixCls}-list`} style={style}>
                {items}
            </div>
        )
    }
    render() {
        const { children, height, vertical } = this.props;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-vertical`]: vertical
        })
        return (
            <div className={classString} ref="carousel" style={{ height }}>
                {this.renderList()}
            </div>
        )
    }
}

export default Carousel;