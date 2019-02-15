import React, { Component } from "react";
import { Grid } from "main";

export default class FlexAlign extends Component {
    render() {
        return (
            <React.Fragment>
                <h4>top</h4>
                <Grid.Row
                    align="top"
                    justify="center"
                    style={{ height: 100, background: "#f5f5f5" }}
                >
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                </Grid.Row>
                <h4>middle</h4>
                <Grid.Row
                    align="middle"
                    justify="space-around"
                    style={{ height: 100, background: "#f5f5f5" }}
                >
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                </Grid.Row>
                <h4>bottom</h4>
                <Grid.Row
                    align="bottom"
                    justify="space-between"
                    style={{ height: 100, background: "#f5f5f5" }}
                >
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div className="gutter-box">col-4</div>
                    </Grid.Col>
                </Grid.Row>
            </React.Fragment>
        );
    }
}
