import React, { Component } from "react";
import { Progress } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Progress
                    percent={10}
                    kStyle="primary"
                    strokeWidth={20}
                    textInside={true}
                />
                <Progress
                    percent={40}
                    kStyle="warning"
                    strokeWidth={20}
                    textInside={true}
                />
                <Progress
                    percent={100}
                    kStyle="success"
                    strokeWidth={20}
                    textInside={true}
                />
                <Progress
                    percent={80}
                    kStyle="danger"
                    strokeWidth={20}
                    textInside={true}
                />
            </React.Fragment>
        );
    }
}
