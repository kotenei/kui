import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import Input from "../Input";
import { kClass, kSize, getClassSet } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import domUtils from "../../utils/domUtils";
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
            multipleValue: [],
            inputValue: "",
            selectedIds: [],
            selectedItems: [],
            activeIds: [],
            focus: false,
            show: false
        };
        this.active = 0;
    }
    static propTypes = {
        data: PropTypes.array,
        multiple: PropTypes.bool,
        highlight: PropTypes.bool,
        max: PropTypes.number,
        placeholder: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
        defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
        onChange: PropTypes.func,
        onSearch: PropTypes.func,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        data: [],
        highlight: false,
        max: 10
    };
    handleFocus = e => {
        const { data, onSearch, onFocus } = this.props;
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
        if (onFocus) {
            onFocus();
        }
    };
    handleBlur = () => {
        const { onBlur } = this.props;
        this.setState({
            focus: false
        });
        this.hide();
        if (onBlur) {
            onBlur();
        }
    };
    handleChange = e => {
        const { multiple, onChange } = this.props;
        const { target } = e;
        if (onChange) {
            onChange(target.value);
        }
        if ("value" in this.props && !multiple) {
            return;
        }
        this.active = 0;
        this.setState({
            inputValue: target.value
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
        const { onSelect, data } = this.props;
        for (let i = 0; i < data.length; i++) {
            let item = data[i],
                formatted = this.formatItem(item);
            if (formatted.value == ids[0]) {
                this.setState({
                    selectedIds: ids
                });
                this.setValue(item);
                break;
            }
        }
    };
    //移除项
    handleItemRemove = (e, removeItem) => {
        if ("value" in this.props) {
            return;
        }
        const { selectedItems } = this.state;
        const newValue = [...selectedItems];
        let index = selectedItems.findIndex(item => {
            let formatted = this.formatItem(item);
            return formatted.value == removeItem.value;
        });
        newValue.splice(index, 1);
        this.setState({
            selectedItems: newValue
        });
    };
    //鼠标移过菜单项
    handleMenuItemMouseEnter = (e, id, parentIds) => {
        this.setState({
            selectedIds: [id]
        });
    };
    //鼠标移出菜单项
    handleMenuItemMouseLeave = (e, id, parentIds) => {};
    //显示
    show(data = this.props.data) {
        if (!data || data.length == 0) {
            return;
        }
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.tm = setTimeout(() => {
            let formatted = this.formatItem(data[0]);
            let selectedIds = [formatted.value];
            this.active = 0;
            this.setState({
                show: true,
                selectedIds
            });
        }, 100);
    }
    //隐藏
    hide() {
        this.active = 0;
        this.elmDropdownMenu = null;
        if (this.tm) {
            clearTimeout(this.tm);
        }
        this.tm = setTimeout(() => {
            this.setState({
                //selectedIds: [],
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
            this.elmDropdownMenu = ReactDOM.findDOMNode(this.refs.menu);
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
        const { data } = this.props;
        this.setValue(data[this.active]);
    }
    //设置值
    setValue(selected) {
        const { multiple, onSelect, onChange } = this.props;
        const { selectedItems } = this.state;
        let formatted = this.formatItem(selected);
        let newValue = selected;
        let hasItem = false;

        if (multiple) {
            newValue = [...selectedItems];
            for (let i = 0; i < selectedItems.length; i++) {
                let item = this.formatItem(selectedItems[i]);
                if (item.value == formatted.value) {
                    hasItem = true;
                    break;
                }
            }
            if (!hasItem) {
                newValue.push(selected);
            }
        }

        if (!("value" in this.props)) {
            if (!multiple) {
                this.setState({
                    inputValue: formatted.value,
                    selectedItems: [newValue]
                });
            } else {
                if (!hasItem) {
                    this.setState({
                        selectedItems: newValue,
                        inputValue: ""
                    });
                }
            }
        }

        if (onSelect) {
            onSelect(newValue);
        }

        if (onChange) {
            onChange(newValue);
        }

        this.hide();
    }
    //搜索
    search(val) {
        const { onSearch } = this.props;

        if (onSearch) {
            onSearch(val);
            return;
        }
    }
    //高亮
    highlight(char, str) {
        const { highlight } = this.props;
        if (highlight) {
            let reg = new RegExp(`(${char})`, "ig");
            str = str.replace(reg, `<strong>$1</strong>`);
        }
        return str;
    }
    //格式化项
    formatItem(item) {
        if (typeof item === "object") {
            return { text: item.text, value: item.value };
        } else {
            let val = String(item);
            return { text: val, value: val };
        }
    }
    //取菜单
    getMenus() {
        const { data, max, highlight } = this.props;
        const { inputValue } = this.state;
        if (!data) {
            return null;
        }
        let menus = [];
        for (let i = 0; i < data.length; i++) {
            let item = this.formatItem(data[i]);
            if (highlight && inputValue) {
                item.text = this.highlight(inputValue, item.text);
            }
            menus.push(
                <Menu.Item
                    key={i}
                    id={item.value}
                    onItemMouseEnter={this.handleMenuItemMouseEnter}
                    onItemMouseLeave={this.handleMenuItemMouseLeave}
                >
                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                </Menu.Item>
            );
            if (max && i == max - 1) {
                break;
            }
        }
        if (menus.length == 0) {
            return null;
        }
        return (
            <Menu ref="menu" className={`${prefixCls}-menu`}>
                {menus}
            </Menu>
        );
    }

    init(value, multiple) {
        let selectedItems = [];
        if (!multiple) {
            let inputValue = typeof value === "string" ? value : "";
            if (inputValue) {
                selectedItems.push(inputValue);
            }
            this.setState({
                inputValue
            });
        } else {
            if (Array.isArray(value)) {
                value.forEach(item => {
                    selectedItems.push(item);
                });
            }
        }
        this.setState({
            selectedItems
        });
    }

    componentDidMount() {
        const { defaultValue, value, multiple } = this.props;
        let tmpValue = value || defaultValue || "";
        this.init(tmpValue, multiple);
    }
    componentWillReceiveProps(nextProps) {
        const { focus } = this.state;
        const { data, value, multiple } = nextProps;

        if ("value" in nextProps) {
            this.init(value, multiple);
        }

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
        const { multiple, placeholder, kSize } = this.props;
        const { inputValue, selectedItems } = this.state;
        let multipleValue = selectedItems.map(item => {
            return this.formatItem(item);
        });
        if (!multiple) {
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
                    value={multipleValue}
                    inputValue={inputValue || ""}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    onItemRemove={this.handleItemRemove}
                />
            );
        }
    }
    render() {
        const { multiple, kSize } = this.props;
        const { selectedIds, show } = this.state;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, {
            [`${prefixCls}-${multiple ? "multiple" : "single"}`]: true,
            [`${prefixCls}-${kSize}`]: kSize != null
        });
        let menu = this.getMenus();
        return (
            <Dropdown
                fullWidth
                inline={false}
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
