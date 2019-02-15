import React, { Component } from "react";
import { Button } from "kui-react";

export default class FlatButton extends Component {
    render() {
        return (
            <React.Fragment>
                <Button raised>default</Button>
                &nbsp;&nbsp;
                <Button kStyle="primary" raised>
                    primary
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="info" raised>
                    info
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="success" raised>
                    success
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="warning" raised>
                    warning
                </Button>
                &nbsp;&nbsp;
                <Button kStyle="danger" raised>
                    danger
                </Button>
                &nbsp;&nbsp;
                <Button raised disabled>
                    disabled
                </Button>
            </React.Fragment>
        );
    }
}
