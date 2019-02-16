import React, { Component } from "react";
import { Tag } from "kui-react";

export default class Basic extends Component {
    render() {
        return (
            <React.Fragment>
                <Tag>default</Tag>
                <Tag closable={true}>closable</Tag>
                <Tag closable={true} kStyle="primary">
                    primary
                </Tag>
                <Tag closable={true} kStyle="info">
                    info
                </Tag>
                <Tag
                    closable={true}
                    kStyle="success"
                    onClose={() => {
                        alert("ok");
                        return true;
                    }}
                >
                    success
                </Tag>
                <Tag closable={true} kStyle="warning">
                    warning
                </Tag>
                <Tag closable={true} kStyle="danger">
                    danger
                </Tag>
                <Tag closable={true} color="#87d068" iconColor={"#fff"}>
                    #87d068
                </Tag>
                <Tag closable={true} color="green" iconColor={"#fff"}>
                    green
                </Tag>
            </React.Fragment>
        );
    }
}
