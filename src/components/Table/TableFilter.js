import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import Icon from "../Icon";
import Menu from "../Menu";
import PopPanel from "../PopPanel";
import Button from "../Button";

let seed = 1;
let instances = {};

class TableFilter extends Component {
    state = {
        selectedItems: [],
        open: false
    };
    static propTypes = {
        column: PropTypes.object,
        prefixCls: PropTypes.string,
        onOK: PropTypes.func,
        onReset: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.id = `poppanel_${seed++}`;
        instances[this.id] = this;
    }

    componentDidMount() {
        document.addEventListener("click", this.close);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.close);
    }

    renderMenus() {
        const { selectedItems } = this.state;
        const { column, prefixCls } = this.props;
        const { filters, filterMultiple } = column;
        let menus = [];

        if (filters && filters.length > 0) {
            filters.forEach((item, index) => {
                let checked = selectedItems
                    ? selectedItems.indexOf(item.value) > -1
                    : false;
                menus.push(
                    <Menu.Item key={index} id={item.value}>
                        {filterMultiple ? (
                            <Checkbox checked={checked}>{item.text}</Checkbox>
                        ) : (
                            <Radio checked={checked}>{item.text}</Radio>
                        )}
                    </Menu.Item>
                );
            });
        }

        return (
            menus.length > 0 && (
                <Menu
                    multiple={filterMultiple}
                    selectedIds={selectedItems}
                    className={`${prefixCls}-filter-dropdown`}
                    onSelect={this.handleSelect}
                >
                    {menus}
                </Menu>
            )
        );
    }
    render() {
        const { column, prefixCls } = this.props;
        const { show } = this.state;
        const { filterIcon, filters, filterMultiple } = column;
        const filterInput = (
            <div className={`${prefixCls}-filter`} onClick={this.handleClick}>
                {filterIcon ? (
                    filterIcon
                ) : (
                    <Icon type="filter" theme="filled" />
                )}
            </div>
        );

        return (
            <PopPanel
                className={`${prefixCls}-filter`}
                input={filterInput}
                open={show}
                placement="bottomRight"
            >
                {this.renderMenus()}
                <div className={`${prefixCls}-filter__btns`}>
                    <Button raised kSize="sm" onClick={this.handleOK}>
                        确定
                    </Button>
                    <Button
                        raised
                        kStyle="default"
                        kSize="sm"
                        onClick={this.handleReset}
                    >
                        重置
                    </Button>
                </div>
            </PopPanel>
        );
    }

    open = () => {
        this.setState({
            show: true
        });
        this.closeOther();
    };

    close = () => {
        this.setState({
            show: false
        });
    };

    closeOther() {
        for (var k in instances) {
            if (k == this.id) {
                continue;
            }
            instances[k].close();
        }
    }

    handleClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            show: !this.state.show
        });
        this.closeOther();
    };

    handleSelect = (e, ids) => {
        this.setState({
            selectedItems: ids
        });
    };

    handleOK = () => {
        const { onOK, column } = this.props;
        const { selectedItems } = this.state;
        let filter = {
            [`${column.dataIndex}|${column.id}`]: selectedItems
        };
        if (onOK) {
            onOK(filter);
        }
        this.close();
    };

    handleReset = () => {
        const { onReset, column } = this.props;
        const { selectedItems } = this.state;
        let filter = {
            [`${column.dataIndex}|${column.id}`]: []
        };
        if (onReset) {
            onReset(filter);
        }
        this.setState({
            selectedItems: [],
            show: false
        });
    };
}

export default TableFilter;
