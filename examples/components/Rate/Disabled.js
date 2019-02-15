import React, { Component } from "react";
import { Rate } from "kui-react";

export default class Disabled extends Component {
    render() {
        return <Rate disabled defaultValue={2} />;
    }
}
