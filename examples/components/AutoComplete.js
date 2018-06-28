import React, { Component } from "react";
import PropTypes from "prop-types";
import { AutoComplete } from "main";
import { data } from "../data";

class AutoCompleteView extends Component {
    state = {
        value: ["Ada"],
        dataSource: data
    };
    handleSelect = value => {
        console.log(value);
    };
    handleChange = e => {
        setTimeout(() => {
            this.setState({
                dataSource: []
            });
        }, 2000);
    };
    handleSearch = val => {
        let result = [];
        data.forEach(item => {
            if (item.toLowerCase().indexOf(val.toLowerCase()) != -1) {
                result.push(item);
            }
        });
        if (result.length == 0) {
            result = data;
        }
        this.setState({
            dataSource: result
        });
    };
    render() {
        const { value, dataSource } = this.state;
        return (
            <div>
                <h1>AutoComplete 自动完成</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <AutoComplete
                        data={dataSource}
                        placeholder="请输入a-z"
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                    />
                </div>
                <h3>多选</h3>
                <div className="k-example">
                    <AutoComplete
                        multiple
                        data={dataSource}
                        placeholder="请输入a-z"
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                    />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    {/* <AutoComplete
                        kSize="sm"
                        data={dataSource}
                        placeholder="请输入a-z"
                    />
                    <br />
                    <br />
                    <AutoComplete data={data} placeholder="请输入a-z" />
                    <br />
                    <br />
                    <AutoComplete
                        kSize="lg"
                        data={dataSource}
                        placeholder="请输入a-z"
                    /> */}
                </div>
            </div>
        );
    }
}

export default AutoCompleteView;
