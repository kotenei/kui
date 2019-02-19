import React, { Component } from "react";
import { Carousel } from "kui-react";

const style = {
    background: "#364D79",
    height: 160,
    color: "white",
    textAlign: "center",
    lineHeight: "160px",
    fontSize: 24
};

export default class Example extends Component {
    render() {
        return (
            <Carousel vertical>
                <div style={style}>1</div>
                <div style={style}>2</div>
                <div style={style}>3</div>
            </Carousel>
        );
    }
}
