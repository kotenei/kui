import React, { Component } from "react";
import { Grid } from "main";

class GridView extends Component {
    render() {
        return (
            <div>
                <h1>Grid 栅格</h1>
                <h3>基础栅格</h3>
                <div className="k-example">
                    <Grid.Row>
                        <Grid.Col span={12}>
                            <div className="gutter-box">col-12</div>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <div className="gutter-box">col-12</div>
                        </Grid.Col>
                    </Grid.Row>
                    <br />
                    <Grid.Row>
                        <Grid.Col span={8}>
                            <div className="gutter-box">col-8</div>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <div className="gutter-box">col-8</div>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <div className="gutter-box">col-8</div>
                        </Grid.Col>
                    </Grid.Row>
                    <br />
                    <Grid.Row>
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
                </div>
                <h3>区块间隔</h3>
                <div className="k-example">
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
                </div>
                <h3>偏移</h3>
                <div className="k-example">
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
                </div>
                <h3>flex布局</h3>
                <div className="k-example">
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
                </div>
                <h3>flex对齐</h3>
                <div className="k-example">
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
                </div>
                <h3>响应式</h3>
                <div className="k-example">
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
                </div>
                <h1>API</h1>
                <h2>Row</h2>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>align</td>
                            <td>
                                flex 布局下的垂直对齐方式：top middle bottom
                            </td>
                            <td>string</td>
                            <td>'top'</td>
                        </tr>
                        <tr>
                            <td>gutter</td>
                            <td>栅格间隔</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>justify</td>
                            <td>
                                flex 布局下的水平排列方式：start end center
                                space-around space-between
                            </td>
                            <td>string</td>
                            <td>'start'</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h2>Col</h2>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>offset</td>
                            <td>栅格左侧的间隔格数，间隔内不可以有栅格</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>span</td>
                            <td>栅格占位格数，为 0 时相当于 display: none</td>
                            <td>number</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>xs</td>
                            <td>{'<'}576px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>sm</td>
                            <td>{'>'}576px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>md</td>
                            <td>{'>'}768px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>lg</td>
                            <td>{'>'}992px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>xl</td>
                            <td>{'>'}1200px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>xxl</td>
                            <td>{'>'}1600px 响应式栅格，设置为栅格数</td>
                            <td>number</td>
                            <td>无</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GridView;
