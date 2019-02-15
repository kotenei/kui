import React, { Component } from "react";
import Basic from "./Basic";
import Multiple from "./Multiple";
import Size from "./Size";

class AutoCompleteView extends Component {
    state = {
        value: ["Ada"],
        dataSource: []
    };
    handleSelect = value => {
        console.log("selected", value);
        this.setState({
            dataSource: []
        });
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
            if (val && item.toLowerCase().indexOf(val.toLowerCase()) != -1) {
                result.push(item);
            }
        });
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
                    <Basic />
                </div>
                <h3>多选</h3>
                <div className="k-example">
                    <Multiple />
                </div>
                <h3>尺寸</h3>
                <div className="k-example">
                    <Size />
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
                            <td>onChange</td>
                            <td>
                                选中 option，或 input 的 value
                                变化时，调用此函数
                            </td>
                            <td>function(value)</td>
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
