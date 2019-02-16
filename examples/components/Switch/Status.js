import React, { Component } from "react";
import { Switch, Button } from "kui-react";

export default class Basic extends Component {
    state = {
        disabled: false
    };
    handleToggle = () => {
        this.setState({
            disabled: !this.state.disabled
        });
    };
    render() {
        return (
            <React.Fragment>
                <Switch disabled={this.state.disabled} />
                <br />
                <br />
                <Button raised kStyle="primary" onClick={this.handleToggle}>
                    Toggle disabled
                </Button>
            </React.Fragment>
        );
    }
}
