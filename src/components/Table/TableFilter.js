import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import Icon from "../Icon";
import Menu from "../Menu";
import PopPanel from "../PopPanel";
import Button from "../Button";

class TableFilter extends Component {
    state = {
        selectedItems: []
    };
    static propTypes = {
        column: PropTypes.object,
        prefixCls: PropTypes.string,
        onOK: PropTypes.func,
        onReset: PropTypes.func
    };
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
                            <Checkbox
                                option={item}
                                checked={checked}
                                //onChange={this.handleCheckboxChange}
                            />
                        ) : (
                            <Radio
                                option={item}
                                checked={checked}
                                // onChange={this.handleRadioChange}
                            />
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
        const { filterIcon, filters, filterMultiple } = column;
        const filterInput = (
            <div className={`${prefixCls}-filter`}>
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
                open={true}
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

    handleCheckboxChange = (e, option) => {
        const { selectedItems } = this.state;
        const { target } = e;
        console.log(option);
    };

    handleRadioChange = e => {};

    handleSelect = (e, ids) => {
        console.log(e.target, ids, "fff");
        
        this.setState({
            selectedItems: ids
        });
    };

    handleOK = () => {};

    handleReset = () => {
        this.setState({
            selectedItems: []
        });
    };
}

export default TableFilter;
