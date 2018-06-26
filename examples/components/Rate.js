import React, { Component } from "react";
import { Rate } from "main";

class RateView extends Component {
    render() {
        return (
            <div>
                <h1>Rate 评分</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Rate />
                </div>
                <h3>半星</h3>
                <div className="k-example">
                    <Rate allowHalf defaultValue={1.5} />
                </div>
                <h3>禁用</h3>
                <div className="k-example">
                    <Rate disabled defaultValue={2} />
                </div>
                <h3>其它字符</h3>
                <div className="k-example">
                    <Rate character="好" allowHalf style={{ fontSize: 30 }} />
                </div>
                <h1>API</h1>
                <table className="k-table k-table-hover k-table-striped">
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
                            <td>allowHalf</td>
                            <td>是否允许半选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>count</td>
                            <td>star总数</td>
                            <td>number</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>defaultValue</td>
                            <td>默认值</td>
                            <td>number</td>
                            <td />
                        </tr>
                        <tr>
                            <td>value</td>
                            <td>当前值</td>
                            <td>number</td>
                            <td />
                        </tr>
                        <tr>
                            <td>character</td>
                            <td>自定义字符</td>
                            <td>ReactNode</td>
                            <td>&lt;Icon type="star" /&gt;</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onHoverChange</td>
                            <td>鼠标经过时数值变化的回调</td>
                            <td>function(value:number)</td>
                            <td />
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>选择时回调</td>
                            <td>function(value:number)</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RateView;
