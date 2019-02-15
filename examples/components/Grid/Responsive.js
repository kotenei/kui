import React, { Component } from "react";
import { Grid } from "kui-react";

export default class Responsive extends Component {
    render() {
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Col xs={5} lg={6}>
                        <div className="gutter-box">col</div>
                    </Grid.Col>
                    <Grid.Col xs={11} lg={6}>
                        <div className="gutter-box">col</div>
                    </Grid.Col>
                    <Grid.Col xs={5} lg={6}>
                        <div className="gutter-box">col</div>
                    </Grid.Col>
                </Grid.Row>
            </React.Fragment>
        );
    }
}
