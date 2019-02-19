import React, { Component } from "react";
import { Breadcrumb } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <Breadcrumb kStyle="primary">
                <Breadcrumb.Item to="/" icon="home">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item to="/Breadcrumb">Breadcrumb</Breadcrumb.Item>
                <Breadcrumb.Item>Page</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}
