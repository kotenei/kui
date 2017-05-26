import React, { Component, PropTypes } from 'react';
import { kStyles, kClass, kSize, getClassSet } from '../../utils/kUtils';
import { State, PRIMARY, Sizes } from '../../utils/styleMaps';
import classnames from 'classnames';
import Icon from '../Icon';
import PaginationItem from './PaginationItem';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            current: 1
        }
    }
    static propTypes = {
        total: PropTypes.number,
        pageSize: PropTypes.number,
        defaultCurrent: PropTypes.number,
        jumpNum: PropTypes.number,
        showTotal: PropTypes.bool,
        onChange: PropTypes.func
    }
    static defaultProps = {
        total: 0,
        pageSize: 20,
        defaultCurrent: 1,
        jumpNum: 5,
        showTotal: false,
        onChange: () => { }
    }
    componentWillMount() {
        const { total, pageSize } = this.props;
        let current = this.props.defaultCurrent;
        if (current != this.state.current) {
            let allPage = parseInt(total / pageSize);
            allPage = ((total % pageSize) !== 0 ? allPage + 1 : allPage);
            allPage = (allPage === 0 ? 1 : allPage);
            if (current < 1) { current = 1; }
            if (current > allPage) { current = allPage; }
            this.setState({
                current: current
            });
        }
    }
    handleChange(current) {
        const { onChange } = this.props;
        if (current != this.state.current) {
            onchange(current);
            this.setState({
                current
            });
        }
    }
    getPageInfo() {
        let start, end, pre, next, allPage;
        const { total, pageSize } = this.props;
        const { current } = this.state;

        //确定总页数
        allPage = parseInt(total / pageSize);
        allPage = ((total % pageSize) !== 0 ? allPage + 1 : allPage);
        allPage = (allPage === 0 ? 1 : allPage);

        //确定起始和结束页码
        start = (current + 2) > allPage ? (allPage - 4) : (current - 2);
        end = current < 4 ? 5 : current + 2;

        //修正起始和结束页的溢出
        if (start < 1) { start = 1; }
        if (end > allPage) { end = allPage; }

        //确定前一页和下一页的数字
        pre = (current - 1) < 1 ? 1 : (current - 1);
        next = (current + 1) > allPage ? allPage : (current + 1);

        return {
            start,
            end,
            pre,
            next,
            allPage
        }
    }
    renderItems() {
        const { current } = this.state;
        const { jumpNum } = this.props;
        let info = this.getPageInfo(),
            items = [],
            jumpPrev = current - jumpNum,
            jumpNext = current + jumpNum,
            className;

        if (jumpPrev <= 0) {
            jumpPrev = 1;
        }

        if (jumpNext > info.allPage) {
            jumpNext = info.allPage;
        }

        className = "k-pagination-prev";
        if (current <= 1) {
            className += ' disabled';
        }
        items.push(
            <PaginationItem num={info.pre} className={className} onClick={this.handleChange}>
                <Icon type="left" />
            </PaginationItem>
        );

        if (info.start > 1) {
            items.push(
                <PaginationItem num={1} onClick={this.handleChange}>
                    1
                </PaginationItem>
            );
            items.push(
                <PaginationItem num={jumpPrev} className="k-pagination-jump-prev" onClick={this.handleChange}>
                    <i className="k-icon icon anticon" ></i>
                </PaginationItem>
            );
        }

        for (let i = info.start; i <= info.end; i++) {
            className = (i === current) ? 'active' : '';
            items.push(
                <PaginationItem num={i} className={className} onClick={this.handleChange}>
                    {i}
                </PaginationItem>
            );
        }

        if (info.end < info.allPage) {
            items.push(
                <PaginationItem num={jumpNext} className="k-pagination-jump-next" onClick={this.handleChange}>
                    <i className="k-icon icon anticon" ></i>
                </PaginationItem>
            );

            items.push(
                <PaginationItem num={info.allPage} onClick={this.handleChange}>
                    {info.allPage}
                </PaginationItem>
            );
        }

        className = 'k-pagination-next';
        if (current === info.allPage) {
            className += ' disabled';
        }

        items.push(
            <PaginationItem num={info.next} className={className} onClick={this.handleChange}>
                <Icon type="right" />
            </PaginationItem>
        );

        return items;
    }
    render() {
        let classString = getClassSet(this.props);
        return (
            <ul className={classnames(classString)}>
                {this.renderItems()}
            </ul>
        )
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(styles, kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
    kClass('k-pagination', Pagination)
));
