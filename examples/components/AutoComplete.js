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
        console.log("selected", value);
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
                        defaultValue={['Ada']}
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                    />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    <AutoComplete
                        kSize="sm"
                        data={dataSource}
                        placeholder="请输入a-z"
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                    />
                    <br />
                    <br />
                    <AutoComplete
                        data={dataSource}
                        placeholder="请输入a-z"
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                    />
                    <br />
                    <br />
                    <AutoComplete
                        kSize="lg"
                        data={dataSource}
                        placeholder="请输入a-z"
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                    />
                </div>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>data</td>
                            <td>自动完成数据源</td>
                            <td>
                                string[] | {`Array<{text:string,value:any}>`}
                            </td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>kSize</td>
                            <td>大小，可选值 'xs' 'sm' 'lg' </td>
                            <td>string</td>
                            <td>—</td>
                        </tr>

                        <tr>
                            <td>multiple</td>
                            <td>是否多选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>max</td>
                            <td>下拉项个数</td>
                            <td>number</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>highlight</td>
                            <td>是否高亮搜索关键字</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>指定默认选中的条目</td>
                            <td>string | {`Array<{text:string,value:any}>`}</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>指定当前选中的条目</td>
                            <td>string | {`Array<{text:string,value:any}>`}</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onSearch</td>
                            <td>搜索补全项的时候调用</td>
                            <td>function(value)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onSelect</td>
                            <td>被选中时调用</td>
                            <td>function(value)</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AutoCompleteView;
