import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import domUtils from "../../utils/domUtils";

class Item extends Component {
    static propTypes = {
        value: PropTypes.string,
        index: PropTypes.number,
        onClick: PropTypes.func
    };
    handleClick = e => {
        const { value, index, onClick } = this.props;
        if (onClick) {
            onClick(value, index);
        }
    };
    render() {
        const { value, className } = this.props;
        return (
            <li className={className} onClick={value ? this.handleClick : null}>
                {value}
            </li>
        );
    }
}

class TimePickerSelect extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        activeIndex: 0
    };
    static propTypes = {
        data: PropTypes.array,
        value: PropTypes.string,
        onItemClick: PropTypes.func
    };
    handleItemClick = (value, index) => {
        const { type, onItemClick, disabled } = this.props;
        if (disabled) return;
        if (onItemClick) {
            onItemClick(type, value, index);
        }
        this.setState(
            {
                activeIndex: index
            },
            () => {
                this.scrollTo(index);
            }
        );
    };
    handleScroll = e => {
        const { onScroll, type, data } = this.props;
        let scrollTop = this.refs.select.scrollTop;
        let activeIndex = 0;
        let half = this.itemHeight / 2;
        for (let i = 0; i < this.arrHeight.length; i++) {
            const height = this.arrHeight[i];
            if (height - scrollTop >= half) {
                activeIndex = i;
                break;
            }
        }
        if (onScroll) {
            onScroll(type, data[activeIndex], activeIndex);
        }
        this.setState({
            activeIndex
        });
    };
    getScrollTop(index) {
        const { data, value } = this.props;
        if (index == undefined) {
            index = data.findIndex(item => {
                return item == value;
            });
        }
        if (index == -1) {
            return 0;
        }
        return index * this.itemHeight;
    }
    scrollTo(index) {
        let scrollTop = this.getScrollTop(index);
        this.refs.select.scrollTop = scrollTop;
    }
    init() {
        const { data } = this.props;
        if (!this.itemHeight) {
            let li = this.refs.select.querySelector("li");
            this.itemHeight = domUtils.height(li);
        }
        this.scrollTo();
        this.arrHeight = [];
        data.forEach((item, index) => {
            this.arrHeight.push((index + 1) * this.itemHeight);
        });
    }
    componentWillMount() {
        const { value, data } = this.props;
        let activeIndex = data.findIndex(item => {
            return value && item.toLowerCase() == value.toLowerCase();
        });
        if (activeIndex == -1) {
            activeIndex = 0;
        }
        this.setState({
            activeIndex
        });
    }
    componentDidMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {}
    renderList() {
        const { data, value, type } = this.props;
        const { activeIndex } = this.state;
        let items = [];
        items.push(<Item key="-2" />);
        items.push(<Item key="-1" />);
        data.forEach((item, index) => {
            items.push(
                <Item
                    key={index}
                    className={classnames({
                        active: index == activeIndex
                    })}
                    index={index}
                    value={item}
                    onClick={this.handleItemClick}
                >
                    {item}
                </Item>
            );
        });
        items.push(<Item key="99" />);
        items.push(<Item key="100" />);
        return items;
    }
    render() {
        const { prefixCls, data, value } = this.props;
        return data && data.length > 0 ? (
            <div
                className={`${prefixCls}-select`}
                ref="select"
                onScroll={this.handleScroll}
            >
                <ul>{this.renderList()}</ul>
            </div>
        ) : null;
    }
}

export default TimePickerSelect;
