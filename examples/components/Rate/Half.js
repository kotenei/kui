import React, { Component } from "react";
import { Rate } from "kui-react";

export default class Half extends Component {
    render() {
        return <Rate allowHalf defaultValue={1.5} />;
    }
}
