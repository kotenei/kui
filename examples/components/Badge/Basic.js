import React, { Component } from "react";
import { Badge } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Badge count={11} overflowCount={10} />
                <Badge kStyle="primary" count={101} overflowCount={99} />
                <Badge kStyle="info" count={10} />
                <Badge kStyle="success" count={10} />
                <Badge kStyle="warning" count={10} />
                <Badge kStyle="danger" count={10} />
            </React.Fragment>
        );
    }
}
