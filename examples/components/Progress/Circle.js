import React, { Component } from "react";
import { Progress } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Progress percent={30} type="circle" strokeWidth={10} />
                <Progress
                    percent={100}
                    type="circle"
                    status="success"
                    strokeWidth={10}
                />
                <Progress
                    percent={70}
                    type="circle"
                    status="error"
                    strokeWidth={10}
                />
            </React.Fragment>
        );
    }
}
