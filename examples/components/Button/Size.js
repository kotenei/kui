import React, { Component } from "react";
import { Button } from "kui-react";

export default class SizeButton extends Component {
    render() {
        return (
            <React.Fragment>
                <Button kStyle="primary" raised kSize="xs">
                    xs button
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="primary" raised kSize="sm">
                    sm button
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="primary" raised>
                    default
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="primary" raised kSize="lg">
                    lg button
                </Button>
                &nbsp;&nbsp;
            </React.Fragment>
        );
    }
}
