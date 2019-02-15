import React, { Component } from "react";
import { Input } from "kui-react";

export default class Basic extends Component {
    render() {
        return (
            <React.Fragment>
                <Input type="text" kSize="sm" placeholder="small size" />
                <br />
                <Input type="text" placeholder="default size" />
                <br />
                <Input type="text" kSize="lg" placeholder="large size" />
            </React.Fragment>
        );
    }
}
