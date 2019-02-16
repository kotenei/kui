import React, { Component } from "react";
import { TimePicker } from "kui-react";

export default class Disabled extends Component {
    render() {
        return <TimePicker disabled value="12:00:00" />;
    }
}
