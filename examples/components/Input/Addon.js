import React, { Component } from "react";
import { Input, Icon } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <Input
                type="text"
                addonBefore={<Icon type="user" />}
                addonAfter={<Icon type="search" />}
            />
        );
    }
}
