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
            autoFocus: false
        };
        this.active = 0;
    }
    static propTypes = {
        url: PropTypes.string,
        data: PropTypes.array,
        mode: PropTypes.oneOf(["single", "multiple"]),
        highlight: PropTypes.bool,
        max: PropTypes.number,
        placeholder: PropTypes.string,
        value: PropTypes.array,
        defaultValue: PropTypes.array,
        formatItem: PropTypes.func,
        formatResult: PropTypes.func,
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
            return item;
        }
    };
    handleChange = e => {
        const { target, keyCode } = e;
        this.setState({
            inputValue: target.value
        });
    };
    handleKeyUp = e => {
        const { target, keyCode } = e;
        const { url, data } = this.props;
        let val = target.value.trim();

        if (!this.cache || this.cache != val) {
            this.cache = val;
            this.active = 0;
            this.search(val);
        }

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
                break;
        }
    };
    //选择项
    handleSelect = (e, ids) => {
        const { onSelect, formatResult, mode } = this.props;
        const { dropdownData } = this.state;
        for (let i = 0; i < dropdownData.length; i++) {
            const item = dropdownData[i];
            if (item.value == ids[0]) {
                let result = formatResult(item);
                if (onSelect) {
                    onSelect(result);
                }
                this.setValue(item);
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
    //移动
    move(step) {
        const { dropdownData } = this.state;
        if (dropdownData.length == 0) {
            return;
        }
        if (!this.elmDropdownMenu) {
            this.elmDropdownMenu = this.elmDropdown.querySelector(
                ".k-dropdown-menu"
            );
            this.elmMenuItems = this.elmDropdownMenu.querySelectorAll("li");
        }
        this.active += step;
        if (this.active < 0) {
            this.active = dropdownData.length - 1;
        } else if (this.active > dropdownData.length - 1) {
            this.active = 0;
        }
        let selectedIds = [dropdownData[this.active].value],
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
        const { onSelect, formatResult } = this.props;
        const { dropdownData } = this.state;
        let selected = dropdownData[this.active];
        let result = formatResult(selected);
        if (onSelect) {
            onSelect(result);
        }
        this.refs.dropdown.hide();
        this.setValue(selected);
    }
    //设置值
    setValue(selected) {
        const { mode } = this.props;
        const { value } = this.state;
        let inputValue = "";
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
            this.cache = null;
        }
    }
    //搜索
    search(val) {
        const { url } = this.props;
        if (val.length == 0) {
            this.refs.dropdown.hide();
            return;
        }
        if (url) {
            //远程取数
        } else {
            //从已有数据匹配
            let data = this.getData(val);
            let selectedIds = [];
            if (data.length > 0) {
                selectedIds = [data[this.active].value];
            }
            this.setState(
                {
                    dropdownData: data,
                    selectedIds
                },
                () => {
                    if (data.length > 0) {
                        this.refs.dropdown.show();
                        this.elmDropdown = ReactDOM.findDOMNode(
                            this.refs.dropdown
                        );
                        this.elmDropdownMenu=null;
                    } else {
                        this.refs.dropdown.hide();
                    }
                }
            );
        }
    }
    //取数据
    getData(val) {
        this.cacheData = [];
        const { data, formatItem, max } = this.props;
        let flag = 0,
            ret = [];
        if (val.length == 0) {
            return ret;
        }
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            let formatted = formatItem(item),
                text,
                value;
            if (typeof formatted !== "object") {
                text = value = formatted;
            } else {
                text = formatted.text;
                value = formatted.value;
            }
            if (
                text
                    .toString()
                    .toLowerCase()
                    .indexOf(val.toLowerCase()) >= 0
            ) {
                this.cacheData.push(item);
                ret.push({
                    text,
                    value
                });
                if (flag == max - 1) {
                    break;
                }
                flag++;
            }
        }
        return ret;
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
    //取菜单
    getMenus() {
        const { dropdownData } = this.state;
        let menus = [];
        for (let i = 0; i < dropdownData.length; i++) {
            const item = dropdownData[i];
            menus.push(<Menu.Item id={item.value}>{item.text}</Menu.Item>);
        }
        if (menus.length == 0) {
            return null;
        }
        return <Menu>{menus}</Menu>;
    }
    renderContainer() {
        const { mode, placeholder, kSize } = this.props;
        const { value, inputValue, autoFocus } = this.state;

        if (mode == "single") {
            return (
                <Input
                    trigger="dropdown"
                    type="text"
                    kSize={kSize}
                    placeholder={placeholder}
                    value={inputValue}
                    autoFocus={autoFocus}
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
                    inputValue={inputValue}
                    autoFocus={autoFocus}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    onItemRemove={this.handleItemRemove}
                />
            );
        }
    }
    render() {
        const { mode } = this.props;
        const { selectedIds } = this.state;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, {
            [`${prefixCls}-${mode}`]: true
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
