import React, { Component } from "react";
import PropTypes from "prop-types";
import { Steps, Icon } from "kui-react";

const Step = Steps.Step;

class StepsView extends Component {
    render() {
        return (
            <div>
                <h1>Steps 步骤条</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Steps current={1} status="process">
                        <Step
                            title="第一步"
                            description="这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述"
                        />
                        <Step title="第二步" description="这里是描述" />
                        <Step title="完成" description="这里是描述" />
                    </Steps>
                </div>
                <h3>迷你版</h3>
                <div className="k-example">
                    <Steps current={1} status="process" kSize="sm">
                        <Step
                            title="第一步"
                            description="这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述"
                        />
                        <Step title="第二步" description="这里是描述" />
                        <Step title="完成" description="这里是描述" />
                    </Steps>
                </div>
                <h3>居中步骤条</h3>
                <div className="k-example">
                    <Steps current={1} status="process" alignCenter kSize="sm">
                        <Step
                            title="第一步"
                            description="这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述"
                        />
                        <Step title="第二步" description="这里是描述" />
                        <Step title="完成" description="这里是描述" />
                    </Steps>
                </div>
                <h3>自定义图标</h3>
                <div className="k-example">
                    <Steps current={1} status="process">
                        <Step
                            icon={<Icon type="user" />}
                            title="第一步"
                            description="这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述"
                        />
                        <Step
                            icon={<Icon type="idcard" />}
                            title="第二步"
                            description="这里是描述"
                        />
                        <Step
                            icon={<Icon type="smileo" />}
                            title="完成"
                            description="这里是描述"
                        />
                    </Steps>
                </div>
                <h3>垂直步骤条</h3>
                <div className="k-example">
                    <Steps direction="vertical" current={1} status="process">
                        <Step
                            title="第一步"
                            description="这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述"
                        />
                        <Step title="第二步" description="这里是描述" />
                        <Step title="完成" description="这里是描述" />
                    </Steps>
                </div>
                <h3>垂直步骤条-迷你版</h3>
                <div className="k-example">
                    <Steps
                        direction="vertical"
                        current={1}
                        status="process"
                        kSize="sm"
                    >
                        <Step
                            title="第一步"
                            description="这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述"
                        />
                        <Step title="第二步" description="这里是描述" />
                        <Step title="完成" description="这里是描述" />
                    </Steps>
                </div>
                <h3>步骤运行错误</h3>
                <div className="k-example">
                    <Steps current={1} status="error">
                        <Step
                            title="第一步"
                            description="这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述"
                        />
                        <Step title="第二步" description="这里是描述" />
                        <Step title="完成" description="这里是描述" />
                    </Steps>
                </div>
                <h1>API</h1>
                <h3>Steps</h3>
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
                            <td>current</td>
                            <td>
                                指定当前步骤，从 0 开始记数。在子 Step
                                元素中，可以通过 status 属性覆盖状态
                            </td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>alignCenter</td>
                            <td>是否居中模式，只在'horizontal'下生效</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>direction</td>
                            <td>方向，可选 'horizontal' 'vertical'</td>
                            <td>string</td>
                            <td>'horizontal'</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>
                                指定当前步骤的状态，可选 'wait' 'process'
                                'finish' 'error'
                            </td>
                            <td>string</td>
                            <td>'wait'</td>
                        </tr>
                        <tr>
                            <td>kSize</td>
                            <td>步骤条大小，可选'sm'</td>
                            <td>string</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>Steps.Step</h3>
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
                            <td>icon</td>
                            <td>自定义图标</td>
                            <td>string|ReactNode</td>
                            <td />
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>标题</td>
                            <td>string|ReactNode</td>
                            <td />
                        </tr>
                        <tr>
                            <td>description</td>
                            <td>描述</td>
                            <td>string|ReactNode</td>
                            <td />
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>
                                指定状态。当不配置该属性时，会使用 Steps 的
                                current 来自动指定状态。可选 'wait' 'process'
                                'finish' 'error'
                            </td>
                            <td>string</td>
                            <td>'wait'</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StepsView;
