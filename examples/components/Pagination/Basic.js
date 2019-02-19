import React, { Component } from "react";
import { Pagination } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Pagination total={200} kSize="xs" />
                <br />
                <Pagination total={200} kSize="sm" kStyle="primary" />
                <br />
                <Pagination total={200} kStyle="warning" />
                <br />
                <Pagination total={200} kSize="lg" kStyle="danger" />
            </React.Fragment>
        );
    }
}
