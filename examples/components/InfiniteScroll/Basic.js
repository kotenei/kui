import React, { Component } from "react";
import { InfiniteScroll } from "kui-react";

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

export default class Example extends Component {
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
            <InfiniteScroll onScrollBottom={this.handleScrollBottom}>
                {this.renderItems()}
            </InfiniteScroll>
        );
    }
}
