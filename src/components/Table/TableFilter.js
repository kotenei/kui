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
        filtered: false,
        open: false
    };
    static propTypes = {
        filter: PropTypes.object,
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

    init(props = this.props) {
        const { filter, column } = props;
        let selectedItems = [];
        if (
            filter &&
            filter[column.dataIndex] &&
            filter[column.dataIndex].length > 0
        ) {
            selectedItems = filter[column.dataIndex];
            this.setState({
                filtered: true,
                selectedItems
            });
        } else {
            this.setState({
                filtered: false,
                selectedItems
            });
        }
    }

    componentDidMount() {
        this.init();
        document.addEventListener("click", this.close);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
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
        const { show, filtered } = this.state;
        const { filterIcon, filters, filterMultiple, filterDropdown } = column;
        const icon = filterIcon ? (
            filterIcon(filtered)
        ) : (
            <Icon
                type="filter"
                theme="filled"
                kStyle={filtered ? "primary" : null}
            />
        );

        const filterInput = (
            <div className={`${prefixCls}-filter`} onClick={this.handleClick}>
                {icon}
            </div>
        );

        if ((!filters || filters.length == 0) && !filterDropdown) {
            return null;
        }

        return (
            <PopPanel
                className={`${prefixCls}-filter`}
                input={filterInput}
                open={show}
                placement="bottomRight"
            >
                {this.renderMenus()}
                {!filterDropdown && (
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
                )}
            </PopPanel>
        );
    }

    open = () => {
        if (this.state.show) {
            return;
        }
        this.setState({
            show: true
        });
        this.closeOther();
    };

    close = () => {
        if (!this.state.show) {
            return;
        }
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
            [`${column.dataIndex}`]: selectedItems
        };
        if (onOK) {
            onOK(filter);
        }
        // this.setState({
        //     filtered: selectedItems.length > 0
        // });
        this.close();
    };

    handleReset = () => {
        const { onReset, column } = this.props;
        const { selectedItems } = this.state;
        let filter = {
            [`${column.dataIndex}`]: []
        };
        if (onReset) {
            onReset(filter);
        }
        this.setState({
            selectedItems: [],
            // filtered: false,
            show: false
        });
    };
}

export default TableFilter;
