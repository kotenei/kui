```jsx
import React, { Component } from "react";
import { Slider } from "kui-react";

const marks = {
    22: "22",
    40: "40",
    100: {
        style: {
            color: "#f50"
        },
        label: <strong>100</strong>
    }
};

export default class Example extends Component {
    render() {
        return (
            <Slider defaultValue={10} marks={marks} vertical />
        );
    }
}

```
