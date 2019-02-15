import React, { Component } from "react";
import { Button } from "kui-react";

export default class FabButton extends Component {
    render() {
        return (
            <React.Fragment>
                <Button fab>+</Button>
                &nbsp;&nbsp;
                <Button kStyle="primary" fab>
                    +
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="info" fab>
                    +
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="success" fab>
                    +
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="warning" fab>
                    +
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="danger" fab>
                    +
                </Button>
                &nbsp;&nbsp;
                <Button disabled fab>
                    +
                </Button>
            </React.Fragment>
        );
    }
}
