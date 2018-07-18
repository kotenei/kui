import React, { Component } from "react";
import { InfiniteScroll } from "main";

const liStyle = {
    width: 230,
    height: 230,
    float: "left",
    display: "inline",
    textAlign: "center",
    background: "#ccc",
    color: "white",
    fontSize: 70,
    margin: 5,
    lineHeight: "230px"
};

class InfiniteScrollView extends Component {
    state = {
        data: []
    };
    handleScrollBottom = () => {
        const { data } = this.state;
        let last = data.length > 0 ? data[data.length - 1] : 0;
        let html = [];
        for (let i = 1; i <= 10; i++) {
            data.push(last + i);
        }
        this.setState({
            data
        });
    };
    renderItems() {
        const { data } = this.state;
        let items = [];
        data.forEach(item => {
            items.push(
                <div key={item} style={liStyle}>
                    {item}
                </div>
            );
        });
        return items;
    }
    render() {
        return (
            <div>
                <h1>InfiniteScroll 无限滚动</h1>
                <div className="k-example">
                    <InfiniteScroll onScrollBottom={this.handleScrollBottom}>
                        {this.renderItems()}
                    </InfiniteScroll>
                </div>
                <h1>API</h1>
                <table className="k-table k-table-hover k-table-striped">
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
                            <td>width</td>
                            <td>容器宽度</td>
                            <td>number|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>容器高度</td>
                            <td>number|string</td>
                            <td>400</td>
                        </tr>
                        <tr>
                            <td>distance</td>
                            <td>滚动系数</td>
                            <td>number</td>
                            <td>0.3</td>
                        </tr>
                        <tr>
                            <td>onScrollBottom</td>
                            <td>滚动到底部回调函数</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default InfiniteScrollView;
