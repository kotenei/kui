import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Steps from '../components/Steps';

const Step = Steps.Step;

class StepsView extends Component {

    render() {
        return (
            <div>
                <h1>Steps 步骤</h1>
                <div className="k-example">
                    <Steps  >
                        <Step title="第一步" description="这里是描述" />
                        <Step title="第二步"  description="这里是描述"/>
                        <Step title="第三步" description="这里是描述"/>
                    </Steps>
                </div>
            </div>
        )
    }
}

export default StepsView;