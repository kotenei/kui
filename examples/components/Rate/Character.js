import React, { Component } from "react";
import { Rate } from "kui-react";

export default class Character extends Component {
    render() {
        return <Rate character="好" allowHalf style={{ fontSize: 30 }} />;
    }
}
