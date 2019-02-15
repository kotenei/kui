import React, { Component } from "react";
import { Breadcrumb } from "main";

export default class Basic extends Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumb kStyle="primary">
                    <Breadcrumb.Item to="/" icon="home">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item to="/Breadcrumb">
                        Breadcrumb
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Page</Breadcrumb.Item>
                </Breadcrumb>
            </React.Fragment>
        );
    }
}
