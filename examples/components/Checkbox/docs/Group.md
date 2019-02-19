```jsx
import React, { Component } from "react";
import { Checkbox } from "kui-react";

const CheckboxGroup = Checkbox.CheckboxGroup;
const options = ["one", "two", "three", "four"];

export default class Example extends Component {
    render() {
        return <CheckboxGroup options={options} defaultValue={["one"]} />;
    }
}

```
