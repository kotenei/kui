import React, { Component } from "react";
import Slider from "../components/Slider";

const marks = {
    0: "0",
    10: "10"
};

class SliderView extends Component {
    render() {
        return (
            <div>
                <h1>Slider 滑动条</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Slider marks={marks} />
                </div>
            </div>
        );
    }
}

export default SliderView;
