import React, { Component } from "react";
import { Slider } from "main";

const marks = {
    0: "0",
    22: "22",
    40: "40",
    100: {
        style: {
            color: "#f50"
        },
        label: <strong>100</strong>
    }
};

class SliderView extends Component {
    render() {
        return (
            <div>
                <h1>Select 选择器</h1>
                <h3>基本用法</h3>
                <div
                    className="k-example"
                    style={{ paddingLeft: 30, paddingRight: 30,  }}
                >
                    <Slider />
                    <br />
                    <Slider range defaultValue={[22, 30]}  />
                </div>
            </div>
        );
    }
}

export default SliderView;
