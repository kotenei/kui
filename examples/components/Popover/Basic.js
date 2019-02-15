import React, { Component } from "react";
import { Popover, Button } from "kui-react";

export default class Basic extends Component {
    render() {
        return (
            <React.Fragment>
                <Popover title="弹出框" content="这里是内容">
                    <Button raised>Hover</Button>
                </Popover>
                &nbsp;&nbsp;
                <Popover
                    title="弹出框"
                    content="这里是内容"
                    placement="right"
                    trigger="click"
                >
                    <Button kStyle="primary" raised>
                        Click
                    </Button>
                </Popover>
            </React.Fragment>
        );
    }
}
