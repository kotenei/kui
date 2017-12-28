import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import classnames from 'classnames';
import CarouselPanel from './CarouselPanel';
import domUtils from '../../utils/domUtils';
import { Transition } from 'react-transition-group';
import Icon from '../Icon';

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
        height: PropTypes.number,
        delay: PropTypes.number,
        autoplay: PropTypes.bool,
        vertical: PropTypes.bool
    }
    static defaultProps = {
        height: 160,
        delay: 3000,
        autoplay: false,
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

        if (autoplay && !this.isStop) {
            this.tm = setTimeout(() => {
                let index = activeIndex + 1;
                this.active(index, () => {
                    this.run();
                });
            }, delay)
        }
    }
    stop() {
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.isStop = true;
    }
    active(index, callback) {
        const { vertical } = this.props;
        const { width, height, max } = this.state;
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
            y = index * height;
            this.setState({
                y
            })
        } else {
            x = index * width;
            this.setState({
                x
            })
        }

        this.setState({
            transition,
            activeIndex: tmpIndex
        }, () => {
            setTimeout(() => {
                if (index == max - 1) {
                    this.setState({
                        activeIndex: 1,
                        x: width,
                        y: height,
                        transition: ''
                    }, () => {
                        if (callback) {
                            callback.call(this);
                        }
                    })
                } else if (index == 0) {
                    let num = max - 2;
                    this.setState({
                        activeIndex: num,
                        x: num * width,
                        y: num * height,
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
    handleEnter = (e) => {
        this.stop();
    }
    handleLeave = (e) => {
        this.isStop = false;
        this.run();
    }
    handleDotClick = (index) => {
        this.stop();
        this.active(index + 1);
    }
    handlePrev = () => {
        const { activeIndex } = this.state;
        let index = activeIndex - 1;
        this.active(index);
    }
    handleNext = () => {
        const { activeIndex } = this.state;
        let index = activeIndex + 1;
        this.active(index);
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
            let props = {
                prefixCls,
                index,
                width,
                height,
                vertical
            }
            items.push(
                <CarouselPanel {...props}>{child}</CarouselPanel>
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
            style.transform = `translate3d(0px, -${y}px, 0px)`;
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
    renderDots() {
        const { children } = this.props;
        const { activeIndex, max } = this.state;
        let items = [], len = children.length;
        let index = activeIndex - 1;
        if (index >= max - 2) {
            index = 0;
        }
        if (index < 0) {
            index = len - 1;
        }
        for (let i = 0; i < len; i++) {
            items.push(
                <span className={classnames({
                    [`${prefixCls}-dot`]: true,
                    'active': index == i
                })} onClick={this.handleDotClick.bind(this, i)}></span>
            )
        }
        return items;
    }
    render() {
        const { children, height, vertical } = this.props;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-vertical`]: vertical
        })
        return (
            <div
                className={classString}
                ref="carousel"
                style={{ height }}
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
            >
                {this.renderList()}
                <div className={`${prefixCls}-dots`}>
                    {this.renderDots()}
                </div>
                <span className={classnames({
                    [`${prefixCls}-control`]: true,
                    [`${prefixCls}-control-left`]: true
                })} onClick={this.handlePrev}>
                    <Icon type="left" />
                </span>
                <span className={classnames({
                    [`${prefixCls}-control`]: true,
                    [`${prefixCls}-control-right`]: true
                })} onClick={this.handleNext}>
                    <Icon type="right" />
                </span>
            </div>
        )
    }
}

export default Carousel;