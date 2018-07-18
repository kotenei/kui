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
    handleScrollEnd = () => {
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
                    <InfiniteScroll onScrollEnd={this.handleScrollEnd}>
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
                            <td />
                            <td />
                            <td />
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default InfiniteScrollView;
