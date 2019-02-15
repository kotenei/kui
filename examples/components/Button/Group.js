import React, { Component } from "react";
import { Button } from "main";

const ButtonGroup = Button.Group;

export default class GroupButton extends Component {
    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}
