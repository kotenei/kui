import React, { Component } from "react";
import { Alert } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Alert
                    kStyle="info"
                    showIcon={true}
                    closable
                    title="Info Text"
                    description="Info Description Info Description Info Description Info Description Info Description Info Description Info Description"
                />
                <Alert
                    kStyle="success"
                    showIcon={true}
                    closable
                    title="Success Text"
                    closeText="OK"
                    description="Success Description Success Description Success Description Success Description Success Description Success Description Success Description"
                    onClose={() => {
                        alert("Hello World!");
                    }}
                />
                <Alert
                    kStyle="warning"
                    showIcon={true}
                    closable
                    title="Warning Text"
                    description="Warning Description Warning Description Warning Description Warning Description Warning Description Warning Description Warning Description"
                />
                <Alert
                    kStyle="danger"
                    showIcon={true}
                    closable
                    title="Danger Text"
                    description="Danger Description Danger Description Danger Description Danger Description Danger Description Danger Description Danger Description"
                />
            </React.Fragment>
        );
    }
}
