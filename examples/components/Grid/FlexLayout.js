import React, { Component } from "react";
import { Grid } from "kui-react";

export default class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <h4>start</h4>
                <Grid.Row justify="start">
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
                <h4>center</h4>
                <Grid.Row justify="center">
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
                <h4>end</h4>
                <Grid.Row justify="end">
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
                <h4>Space Around</h4>
                <Grid.Row justify="space-around">
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
                <h4>Space Between</h4>
                <Grid.Row justify="space-between">
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
