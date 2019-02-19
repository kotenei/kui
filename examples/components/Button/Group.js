import React, { Component } from "react";
import { Button } from "kui-react";

const ButtonGroup = Button.Group;

export default class Example extends Component {
    render() {
        return (
            <ButtonGroup>
                <Button kStyle="primary" raised>
                    L
                </Button>
                <Button kStyle="primary" raised>
                    M
                </Button>
                <Button kStyle="primary" raised>
                    R
                </Button>
            </ButtonGroup>
        );
    }
}
