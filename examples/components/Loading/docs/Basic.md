```jsx
import React, { Component } from "react";
import { Alert, Loading, Checkbox } from "kui-react";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }
    state = {
        show: false
    };
    handleToggle() {
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        return (
            <React.Fragment>
                <Loading show={this.state.show} tip="加载中，请稍候...">
                    <Alert
                        showIcon={true}
                        kStyle="primary"
                        title="Default Text"
                        description="Default Description Default Description Default Description Default Description Default Description Default Description Default Description"
                    />
                </Loading>
                <Checkbox mode="toggle" onChange={this.handleToggle} />
            </React.Fragment>
        );
    }
}

```
