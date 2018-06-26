import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Loading, Checkbox } from "main";

class LoadingView extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }
    state = {
        show: false
    };
    handleToggle() {
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        return (
            <div>
                <h1>Loading 加载中</h1>
                <div className="k-example">
                    <Loading show={this.state.show} tip="加载中，请稍候...">
                        <Alert
                            showIcon={true}
                            kStyle="primary"
                            title="Default Text"
                            description="Default Description Default Description Default Description Default Description Default Description Default Description Default Description"
                        />
                    </Loading>
                    <Checkbox mode="toggle" onChange={this.handleToggle} />
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
                            <td>show</td>
                            <td>是否显示</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>tip</td>
                            <td>提示内容</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LoadingView;
