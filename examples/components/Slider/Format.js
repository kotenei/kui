import React, { Component } from "react";
import { Slider } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Slider
                    tipFormatter={value => {
                        return `${value}%`;
                    }}
                />
                <br />
                <Slider tipFormatter={null} />
            </React.Fragment>
        );
    }
}
