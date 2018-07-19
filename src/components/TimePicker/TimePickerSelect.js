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
        scrollTop: 0,
        activeIndex: -1
    };
    static propTypes = {
        data: PropTypes.array,
        value: PropTypes.string,
        onItemClick: PropTypes.func
    };
    handleItemClick = (value, index) => {
        const { type, onItemClick, disabled } = this.props;
        if (disabled) return;
        //this.setScrollTop(index);
        if (onItemClick) {
            onItemClick(type, value, index);
        }
        // this.setState({
        //     activeIndex: index
        // });
    };
    handleScroll = e => {
        
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
        if (!this.itemHeight) {
            let li = this.refs.select.querySelector("li");
            this.itemHeight = domUtils.height(li);
        }
        return index * this.itemHeight;
    }
    setScrollTop(index) {
        let scrollTop = this.getScrollTop(index);
        this.refs.select.scrollTop = scrollTop;
    }
    componentDidMount() {
        this.setScrollTop();
    }
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
                        active: (value && value == item) || index == activeIndex
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
