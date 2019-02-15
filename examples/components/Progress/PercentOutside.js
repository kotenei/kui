import React, { Component } from "react";
import { Progress } from "kui-react";

export default class PercentOutside extends Component {
    render() {
        return (
            <React.Fragment>
                <Progress percent={10} kStyle="primary" showText={false} />
                <Progress percent={40} kStyle="warning" />
                <Progress percent={100} kStyle="success" status="success" />
                <Progress percent={80} kStyle="danger" status="error" />
            </React.Fragment>
        );
    }
}
