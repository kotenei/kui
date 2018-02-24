import React, { Component } from "react";
import PropTypes from "prop-types";
import AutoComplete from "../components/AutoComplete";
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
                dataSource:[]
            })
        }, 2000);
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
                        //onSelect={this.handleSelect}
                        //onChange={this.handleChange}
                    />
                </div>
                <h3>多选</h3>
                <div className="k-example">
                    <AutoComplete
                        mode="multiple"
                        data={dataSource}
                        //value={["Ada"]}
                        placeholder="请输入a-z"
                    />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    <AutoComplete
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
                    />
                </div>
            </div>
        );
    }
}

export default AutoCompleteView;
