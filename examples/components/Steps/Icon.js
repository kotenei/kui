import React, { Component } from "react";
import { Steps, Icon } from "kui-react";

const Step = Steps.Step;

export default class IconSteps extends Component {
    render() {
        return (
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
        );
    }
}
