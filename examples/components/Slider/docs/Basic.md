```jsx
import React, { Component } from "react";
import { Slider, Switch } from "kui-react";

export default class Example extends Component {
    state = {
        disabled: false
    };
    render() {
        const { disabled } = this.state;
        return (
            <React.Fragment>
                <Slider defaultValue={10} disabled={disabled} />
                <br />
                <Slider range defaultValue={[5, 10, 30]} disabled={disabled} />
                <br />
                Disabled:{" "}
                <Switch
                    defaultChecked
                    onChange={checked => {
                        this.setState({
                            disabled: !checked
                        });
                    }}
                />
            </React.Fragment>
        );
    }
}

```
