import React, { Component } from "react";
import { List } from "kui-react";

const data = ["List Item", "List Item", "List Item"];

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <h3>Default Size</h3>
                <List bordered data={data} header="Header" footer="Footer" />
                <br />
                <h3>Small Size</h3>
                <List
                    bordered
                    data={data}
                    kSize="sm"
                    header="Header"
                    footer="Footer"
                />
                <br />
                <h3>Large Size</h3>
                <List
                    bordered
                    data={data}
                    kSize="lg"
                    header="Header"
                    footer="Footer"
                />
            </React.Fragment>
        );
    }
}
