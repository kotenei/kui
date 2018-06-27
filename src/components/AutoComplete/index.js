import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import Input from "../Input";
import { kClass, kSize, getClassSet } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import domUtils from "../../utils/domUtils";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MultipleList from "../MultipleList";
import Dropdown from "../Dropdown";
import Menu from "../Menu";

const prefixCls = "k-autocomplete";

const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    TAB: 9,
    ENTER: 13
};

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue,
            inputValue: "",
            dropdownData: [],
            selectedIds: [],
            focus: false,
            show: false
        };
        this.active = -1;
    }
    static propTypes = {
        data: PropTypes.array,
        mode: PropTypes.oneOf(["single", "multiple"]),
        highlight: PropTypes.bool,
        max: PropTypes.number,
        placeholder: PropTypes.string,
        value: PropTypes.array,
        defaultValue: PropTypes.array,
        formatItem: PropTypes.func,
        formatResult: PropTypes.func,
        onChange: PropTypes.func,
        onSearch: PropTypes.func,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        data: [],
        mode: "single",
        highlight: false,
        max: 10,
        defaultValue: [],
        formatItem: item => {
            return item;
        },
        formatResult: item => {
            if (typeof item === "object") {
                return { text: item.text, value: item.value };
            }
            return { text: item, value: item };
        }
    };
    handleFocus = e => {
        const { data, onSearch } = this.props;
        const { inputValue } = this.state;
        this.setState(
            {
                focus: true
            },
            () => {
                if (onSearch && inputValue) {
                    onSearch(inputValue);
                } else {
                    this.show();
                }
            }
        );
    };
    handleBlur = () => {
        this.setState({
            focus: false
        });
        this.hide();
    };
    handleChange = e => {
        const { mode, onChange } = this.props;
        const { target } = e;
        if (onChange) {
            onChange(e);
        }
        if ("value" in this.props && mode == "single") {
            return;
        }
        this.active = -1;
        this.setState({
            inputValue: target.value,
            selectedIds: []
        });
    };
    handleKeyUp = e => {
        const { target, keyCode } = e;
        let val = target.value.trim();
        switch (keyCode) {
            case KEY.UP:
            case KEY.LEFT:
                this.move(-1);
                break;
            case KEY.DOWN:
            case KEY.RIGHT:
                this.move(1);
                break;
            case KEY.ENTER:
            case KEY.TAB:
                this.select();
                break;
            default:
                this.search(val);
                break;
        }
    };
    //选择项
    handleSelect = (e, ids) => {
        const { onSelect, formatResult, mode, data } = this.props;
        for (let i = 0; i < data.length; i++) {
            let item = data[i],
                result = formatResult(item);
            if (result.value == ids[0]) {
                if (onSelect) {
                    onSelect(item);
                }
                this.setValue(result);
                break;
            }
        }
    };
    //移除项
    handleItemRemove = (e, removeItem) => {
        const { value } = this.state;
        let index = value.findIndex(item => {
            return item.value == removeItem.value;
        });
        value.splice(index, 1);
        this.setState({
            value
        });
    };
    //显示
    show(data = this.props.data) {
        if (!data || data.length == 0) {
            return;
        }
        this.elmDropdown = ReactDOM.findDOMNode(this.refs.dropdown);
        this.tm = setTimeout(() => {
            this.setState({
                show: true
            });
        }, 100);
    }
    //隐藏
    hide() {
        this.active = -1;
        this.elmDropdownMenu = null;
        this.tm = setTimeout(() => {
            this.setState({
                selectedIds: [],
                show: false
            });
        }, 300);
    }
    //移动
    move(step) {
        const { data, max } = this.props;
        const { show } = this.state;
        if (!data || data.length == 0 || !show) {
            return;
        }
        let len = data.length - 1;
        if (max && max <= len) {
            len = max - 1;
        }
        if (!this.elmDropdownMenu) {
            this.elmDropdownMenu = this.elmDropdown.querySelector(
                ".k-dropdown-menu"
            );
            this.elmMenuItems = this.elmDropdownMenu.querySelectorAll("li");
        }
        this.active += step;
        if (this.active < 0) {
            this.active = len;
        } else if (this.active > len) {
            this.active = 0;
        }

        let curDataItem = this.formatItem(data[this.active]),
            selectedIds = [curDataItem.value],
            curMenuItem = this.elmMenuItems[this.active],
            scrollTop = this.elmDropdownMenu.scrollTop,
            clientHeight = this.elmDropdownMenu.clientHeight,
            itemHeight = domUtils.height(curMenuItem),
            itemTop = domUtils.position(curMenuItem).top;

        this.setState(
            {
                selectedIds
            },
            () => {
                if (itemTop >= clientHeight) {
                    this.elmDropdownMenu.scrollTop =
                        itemTop + itemHeight - clientHeight + scrollTop;
                } else if (itemTop < 0) {
                    this.elmDropdownMenu.scrollTop = scrollTop + itemTop;
                }
            }
        );
    }
    //选中
    select() {
        const { onSelect, formatResult, data } = this.props;
        let selected = data[this.active];
        let result = formatResult(selected);
        if (onSelect) {
            onSelect(selected);
        }
        this.setValue(result);
    }
    //设置值
    setValue(selected) {
        const { mode } = this.props;
        const { value } = this.state;
        if (!("value" in this.props)) {
            if (mode == "single") {
                this.setState({
                    value: [selected],
                    inputValue: selected.value
                });
            } else {
                let newValue = [...value];
                let hasItem = false;
                for (let i = 0; i < value.length; i++) {
                    const item = value[i];
                    if (item.value == selected.value) {
                        hasItem = true;
                        break;
                    }
                }
                if (!hasItem) {
                    newValue.push(selected);
                    this.setState({
                        value: newValue,
                        inputValue: ""
                    });
                }
            }
        }
        this.hide();
    }
    //搜索
    search(val) {
        const { onSearch } = this.props;
        if (onSearch) {
            onSearch(val);
        }
    }
    //高亮
    highlight(char, str) {
        const { highlight } = this.props;
        if (highlight) {
            let ret = new RegExp(`(${char})`, "ig");
            str = str.replace(reg, `<strong>$1</strong>`);
        }
        return str;
    }
    //格式化项
    formatItem(item) {
        if (typeof item === "object") {
            return item;
        }
        return { text: item, value: item };
    }
    //取菜单
    getMenus() {
        const { data, max } = this.props;
        if (!data) {
            return null;
        }
        let menus = [];
        for (let i = 0; i < data.length; i++) {
            let item = this.formatItem(data[i]);
            menus.push(
                <Menu.Item key={i} id={item.value}>
                    {item.text}
                </Menu.Item>
            );
            if (max && i == max - 1) {
                break;
            }
        }
        if (menus.length == 0) {
            return null;
        }
        return <Menu>{menus}</Menu>;
    }
    componentWillMount() {
        const { defaultValue, value, formatItem, mode } = this.props;
        let tmpValue = value || defaultValue || [];
        let newValue = [],
            inputValue;
        tmpValue.forEach(item => {
            if (typeof item === "object") {
                newValue.push(item);
            } else {
                newValue.push({
                    text: item,
                    value: item
                });
            }
        });

        if (newValue.length > 0) {
            inputValue = newValue[0].text;
        }

        if (mode == "single") {
            this.setState({
                inputValue
            });
        }

        this.setState({
            value: newValue
        });
    }
    componentWillReceiveProps(nextProps) {
        const { focus } = this.state;
        const { data } = nextProps;
        if (data && data.length > 0 && focus) {
            this.show(data);
        } else {
            this.hide();
        }
    }
    componentWillUnmount() {
        if (this.tm) {
            clearTimeout(this.tm);
        }
    }
    renderContainer() {
        const { mode, placeholder, kSize } = this.props;
        const { value, inputValue } = this.state;

        if (mode == "single") {
            return (
                <Input
                    trigger="dropdown"
                    type="text"
                    kSize={kSize}
                    placeholder={placeholder}
                    value={inputValue || ""}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                />
            );
        } else {
            return (
                <MultipleList
                    kSize={kSize}
                    showInput={true}
                    placeholder={placeholder}
                    value={value}
                    //inputValue={inputValue}
                    onFocus={this.handleFocus}
                    onKeyUp={this.handleKeyUp}
                    //onChange={this.handleChange}
                    //onItemRemove={this.handleItemRemove}
                />
            );
        }
    }
    render() {
        const { mode, kSize } = this.props;
        const { selectedIds, show } = this.state;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, {
            [`${prefixCls}-${mode}`]: true,
            [`${prefixCls}-${kSize}`]: kSize != null
        });
        let menu = this.getMenus();
        return (
            <Dropdown
                menu={menu}
                className={classString}
                ref="dropdown"
                trigger="manual"
                selectedIds={selectedIds}
                onSelect={this.handleSelect}
                show={show}
            >
                {this.renderContainer()}
            </Dropdown>
        );
    }
}

export default kSize(
    [Sizes.LARGE, Sizes.SMALL],
    kClass(prefixCls, AutoComplete)
);
