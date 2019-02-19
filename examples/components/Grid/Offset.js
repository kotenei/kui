import React, { Component } from "react";
import { Grid } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Col span={8}>
                        <div className="gutter-box">col-8</div>
                    </Grid.Col>
                    <Grid.Col span={8} offset={8}>
                        <div className="gutter-box">col-8</div>
                    </Grid.Col>
                </Grid.Row>
                <br />
                <Grid.Row>
                    <Grid.Col span={6} offset={6}>
                        <div className="gutter-box">col-6</div>
                    </Grid.Col>
                    <Grid.Col span={6} offset={6}>
                        <div className="gutter-box">col-6</div>
                    </Grid.Col>
                </Grid.Row>
                <br />
                <Grid.Row>
                    <Grid.Col span={12} offset={8}>
                        <div className="gutter-box">col-12</div>
                    </Grid.Col>
                </Grid.Row>
            </React.Fragment>
        );
    }
}
