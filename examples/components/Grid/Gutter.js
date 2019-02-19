import React, { Component } from "react";
import { Grid } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <Grid.Row gutter={16}>
                <Grid.Col span={6}>
                    <div className="gutter-box">col-6</div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <div className="gutter-box">col-6</div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <div className="gutter-box">col-6</div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <div className="gutter-box">col-6</div>
                </Grid.Col>
            </Grid.Row>
        );
    }
}
