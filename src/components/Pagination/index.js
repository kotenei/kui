import React, { Component, PropTypes } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        }
    }
    static propTypes = {
        total: PropTypes.number,
        pageSize: PropTypes.number,
        defaultCurrent: PropTypes.number,
        onChange: PropTypes.func
    }
    static defaultProps = {
        total: 0,
        pageSize: 20,
        defaultCurrent: 1,
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
        let info = this.getPageInfo(),
            className;
        var items = [];
        className = current > 1 ? '' : 'disabled';
        items.push(<li className={`${className}`}><a href="javascript:void(0);" onClick={this.handleChange.bind(this, info.pre)}>«</a></li>);

        for (let i = info.start; i <= info.end; i++) {
            className = (i === current) ? 'active' : '';
            items.push(<li className={`${className}`} ><a href="javascript:void(0);" onClick={this.handleChange.bind(this, i)}>{i}</a></li>);
        }

        className = current !== info.allPage ? '' : 'disabled';
        items.push(<li className={`${className}`}><a href="javascript:void(0);" onClick={this.handleChange.bind(this, info.next)}>»</a></li>);

        return items;
    }
    render() {
        return (
            <ul className="k-pagination">
                {this.renderItems()}
            </ul>
        )
    }
}

export default Pagination;