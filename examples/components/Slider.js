import React, { Component } from "react";
import { Slider } from "main";

class SliderView extends Component {
    render() {
        return (
            <div>
                <h1>Select 选择器</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Slider />
                </div>
            </div>
        );
    }
}

export default SliderView;
