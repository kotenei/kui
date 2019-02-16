import React, { Component } from "react";
import { Steps } from "kui-react";

const Step = Steps.Step;

export default class Align extends Component {
    render() {
        return (
            <Steps current={1} status="process" alignCenter kSize="sm">
                <Step
                    title="第一步"
                    description="这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述"
                />
                <Step title="第二步" description="这里是描述" />
                <Step title="完成" description="这里是描述" />
            </Steps>
        );
    }
}
