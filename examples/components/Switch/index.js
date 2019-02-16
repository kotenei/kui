import React, { Component } from "react";
import Basic from "./Basic";
import Status from "./Status";
import WordIcon from "./WordIcon";
import Loading from "./Loading";

class SwitchView extends Component {
    state = {
        disabled: false
    };
    handleToggle = () => {
        this.setState({
            disabled: !this.state.disabled
        });
    };
    render() {
        return (
            <div>
                <h1>Switch 开关</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                </div>
                <h3>状态</h3>
                <div className="k-example">
                    <Status />
                </div>
                <h3>文字和图标</h3>
                <div className="k-example">
                    <WordIcon />
                </div>
                <h3>加载中</h3>
                <div className="k-example">
                    <Loading />
                </div>
                <h1>API</h1>
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
                            <td>defaultChecked</td>
                            <td>初始是否选中</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>checked</td>
                            <td>指定当前是否选中</td>
                            <td>boolean</td>
                            <td />
                        </tr>
                        <tr>
                            <td>checkedContent</td>
                            <td>选中时的内容</td>
                            <td>string|ReactNode</td>
                            <td />
                        </tr>
                        <tr>
                            <td>unCheckedContent</td>
                            <td>非选中时的内容</td>
                            <td>string|ReactNode</td>
                            <td />
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>loading</td>
                            <td>是否加载中</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>切换时回调函数</td>
                            <td>Function(checked:boolean)</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SwitchView;
