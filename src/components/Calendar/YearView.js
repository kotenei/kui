import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { dates } from "../../utils/dateUtils";
import { format as formatter } from "date-fns";

class YearView extends Component {
    static propsTypes = {
        prefixCls: PropTypes.string,
        date: PropTypes.object,
        data: PropTypes.array,
        lang: PropTypes.string,
        onClick: PropTypes.func
    };
    static defaultProps = {
        prefixCls: "k-calendar",
        date: new Date(),
        lang: "zh-cn"
    };
    handleClick = date => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(date);
        }
    };
    renderBody() {
        const { date, data, lang, prefixCls } = this.props;
        let formatStr = "YYYYMMDD",
            rows = [],
            flag = 0,
            now = new Date();
        for (let i = 0; i < 3; i++) {
            let cells = [];
            for (let j = flag; j < dates[lang].months.length; j++) {
                let monthText = dates[lang].months[j],
                    start = formatter(
                        new Date(date.getFullYear(), j, 1),
                        formatStr
                    ),
                    end = formatter(
                        new Date(date.getFullYear(), j + 1, 0),
                        formatStr
                    ),
                    number = 0;
                if (data && data.length > 0) {
                    data.forEach(item => {
                        item.datesNumber.forEach(num => {
                            if (num >= start && num <= end) {
                                number++;
                            }
                        });
                    });
                }
                cells.push(
                    <div
                        className={`${prefixCls}-year-row-cell`}
                        key={j}
                        onClick={this.handleClick.bind(
                            this,
                            new Date(date.getFullYear(), j, 1)
                        )}
                    >
                        <div
                            className={classnames({
                                month: true,
                                active:
                                    date.getFullYear() + date.getMonth() ==
                                        now.getFullYear() + now.getMonth() &&
                                    date.getMonth() == j
                            })}
                        >
                            {monthText}
                        </div>
                        <div className="number">{number || ""}</div>
                    </div>
                );
                flag++;
                if (flag % 4 == 0) {
                    break;
                }
            }
            rows.push(
                <div className={`${prefixCls}-year-row`} key={i}>
                    {cells}
                </div>
            );
        }
        return rows;
    }
    render() {
        const { prefixCls } = this.props;
        return <div className={`${prefixCls}-year`}>{this.renderBody()}</div>;
    }
}

export default YearView;
