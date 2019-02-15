import React, { Component } from "react";
import { Input, Icon } from "kui-react";

export default class PrefixStuffix extends Component {
    render() {
        return (
            <React.Fragment>
                <Input
                    type="text"
                    addonBefore={<Icon type="user" />}
                    addonAfter={<Icon type="search" />}
                />
            </React.Fragment>
        );
    }
}
