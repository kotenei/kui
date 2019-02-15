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

export default class Basic extends Component {
    render() {
        return (
            <React.Fragment>
                <Carousel>
                    <div style={style}>1</div>
                    <div style={style}>2</div>
                    <div style={style}>3</div>
                </Carousel>
            </React.Fragment>
        );
    }
}
