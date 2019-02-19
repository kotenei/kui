import React, { Component } from "react";
import { Button } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Button kStyle="primary">default</Button>
                &nbsp;&nbsp;
                <Button kStyle="primary">primary</Button>
                &nbsp;&nbsp;
                <Button kStyle="info">info</Button>
                &nbsp;&nbsp;
                <Button kStyle="success">success</Button>
                &nbsp;&nbsp;
                <Button kStyle="warning">warning</Button>
                &nbsp;&nbsp;
                <Button kStyle="danger">danger</Button>
                &nbsp;&nbsp;
                <Button disabled>disabled</Button>
            </React.Fragment>
        );
    }
}
