import React, { Component } from "react";
import PropTypes from "prop-types";
import { kStyles, kClass, kSize, getClassSet } from "../../utils/kUtils";
import { State, PRIMARY, Sizes } from "../../utils/styleMaps";
import classnames from "classnames";
import Icon from "../Icon";
import PaginationItem from "./PaginationItem";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            current: props.pageNumber || props.defaultPageNumber,
            hoverType: 0
        };
    }
    static propTypes = {
        defaultPageNumber: PropTypes.number,
        total: PropTypes.number,
        pageSize: PropTypes.number,
        pageNumber: PropTypes.number,
        jumpNumber: PropTypes.number,
        showTotal: PropTypes.bool,
        onChange: PropTypes.func
    };
    static defaultProps = {
        defaultPageNumber: 1,
        total: 0,
        pageSize: 20,
        jumpNumber: 5,
        showTotal: false,
        onChange: () => {}
    };

    handleChange(current) {
        const { onChange } = this.props;
        if (current != this.state.current) {
            onChange(current);
            if (!("pageNumber" in this.props)) {
                this.setState({
                    current
                });
            }
        }
        this.setState({
            hoverType: 0
        });
    }
    getPageInfo() {
        let start, end, pre, next, allPage;
        const { total, pageSize } = this.props;
        const { current } = this.state;

        //确定总页数
        allPage = parseInt(total / pageSize);
        allPage = total % pageSize !== 0 ? allPage + 1 : allPage;
        allPage = allPage === 0 ? 1 : allPage;

        //确定起始和结束页码
        start = current + 2 > allPage ? allPage - 4 : current - 2;
        end = current < 4 ? 5 : current + 2;

        //修正起始和结束页的溢出
        if (start < 1) {
            start = 1;
        }
        if (end > allPage) {
            end = allPage;
        }

        //确定前一页和下一页的数字
        pre = current - 1 < 1 ? 1 : current - 1;
        next = current + 1 > allPage ? allPage : current + 1;

        return {
            start,
            end,
            pre,
            next,
            allPage
        };
    }
    init(props = this.props) {
        const { pageNumber, defaultPageNumber, total, pageSize } = props;
        const { current } = this.state;

        if ("pageNumber" in props && current != pageNumber) {
            this.setState({
                current: pageNumber
            });
        } else {
            let allPage = parseInt(total / pageSize);
            let current = this.state.current;
            allPage = total % pageSize !== 0 ? allPage + 1 : allPage;
            allPage = allPage === 0 ? 1 : allPage;

            if (current < 1) {
                current = 1;
            }
            if (current > allPage) {
                current = allPage;
            }
            this.setState({
                current
            });
        }
    }
    componentWillMount() {
        this.init();
    }
    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }
    renderItems() {
        const { current, hoverType } = this.state;
        const { jumpNumber } = this.props;
        let info = this.getPageInfo(),
            items = [],
            jumpPrev = current - jumpNumber,
            jumpNext = current + jumpNumber,
            key = 0,
            className;

        if (jumpPrev <= 0) {
            jumpPrev = 1;
        }

        if (jumpNext > info.allPage) {
            jumpNext = info.allPage;
        }

        className = "k-pagination-prev";
        if (current <= 1) {
            className += " disabled";
        }
        items.push(
            <PaginationItem
                key={key++}
                num={info.pre}
                className={className}
                onClick={this.handleChange}
            >
                <Icon type="left" />
            </PaginationItem>
        );

        if (info.start > 1) {
            items.push(
                <PaginationItem key={key++} num={1} onClick={this.handleChange}>
                    1
                </PaginationItem>
            );
            items.push(
                <PaginationItem
                    key={key++}
                    num={jumpPrev}
                    className="k-pagination-jump-prev"
                    onClick={this.handleChange}
                    onMouseOver={() => {
                        if (hoverType == 1) {
                            return;
                        }
                        this.setState({
                            hoverType: 1
                        });
                    }}
                    onMouseLeave={() => {
                        this.setState({
                            hoverType: 0
                        });
                    }}
                >
                    <Icon type={hoverType == 1 ? "double-left" : "ellipsis"} />
                </PaginationItem>
            );
        }

        for (let i = info.start; i <= info.end; i++) {
            className = i === current ? "active" : "";
            items.push(
                <PaginationItem
                    key={key++}
                    num={i}
                    className={className}
                    onClick={this.handleChange}
                >
                    {i}
                </PaginationItem>
            );
        }

        if (info.end < info.allPage) {
            items.push(
                <PaginationItem
                    key={key++}
                    num={jumpNext}
                    className="k-pagination-jump-next"
                    onClick={this.handleChange}
                    onMouseOver={() => {
                        if (hoverType == 2) {
                            return;
                        }
                        this.setState({
                            hoverType: 2
                        });
                    }}
                    onMouseLeave={() => {
                        this.setState({
                            hoverType: 0
                        });
                    }}
                >
                    <Icon type={hoverType == 2 ? "double-right" : "ellipsis"} />
                </PaginationItem>
            );

            items.push(
                <PaginationItem
                    key={key++}
                    num={info.allPage}
                    onClick={this.handleChange}
                >
                    {info.allPage}
                </PaginationItem>
            );
        }

        className = "k-pagination-next";
        if (current === info.allPage) {
            className += " disabled";
        }

        items.push(
            <PaginationItem
                key={key++}
                num={info.next}
                className={className}
                onClick={this.handleChange}
            >
                <Icon type="right" />
            </PaginationItem>
        );

        return items;
    }
    render() {
        let classes = getClassSet(this.props);
        return <ul className={classnames(classes)}>{this.renderItems()}</ul>;
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(
    styles,
    kSize(
        [Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
        kClass("k-pagination", Pagination)
    )
);
