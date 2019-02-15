import React, { Component } from "react";
import { Checkbox } from "kui-react";

export default class Disabled extends Component {
    render() {
        return (
            <React.Fragment>
                <Checkbox checked disabled>
                    Checkbox
                </Checkbox>
                <Checkbox disabled>Checkbox</Checkbox>
            </React.Fragment>
        );
    }
}
