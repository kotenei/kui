import React, { Component } from "react";
import { Collapse } from "kui-react";

const Panel = Collapse.Panel;
const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;

export default class Example extends Component {
    render() {
        return (
            <Collapse>
                <Panel header="This is panel header 1" id="1">
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 2" id="2">
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" id="3" disabled>
                    <p>{text}</p>
                </Panel>
            </Collapse>
        );
    }
}
