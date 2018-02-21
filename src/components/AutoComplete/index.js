import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Input from "../Input";
import { kClass, kSize, getClassSet } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MultipleList from "../MultipleList";

const prefixCls = "k-autocomplete";

const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    TAB: 9,
    ENTER: 13
};

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue
        };
    }
    static propTypes = {
        url: PropTypes.string,
        data: PropTypes.array,
        mode: PropTypes.oneOf(["single", "multiple"]),
        highlight: PropTypes.bool,
        max: PropTypes.number,
        placeholder: PropTypes.string,
        value: PropTypes.array,
        defaultValue: PropTypes.array,
        formatItem: PropTypes.func,
        formatResult: PropTypes.func,
        onSelected: PropTypes.func
    };
    static defaultProps = {
        data: [],
        mode: "single",
        highlight: false,
        max: 10,
        defaultValue: [],
        formatItem: item => {
            return item;
        },
        formatResult: item => {
            if (typeof item === "object") {
                return { text: item.text, value: item.value };
            }
            return item;
        }
    };
    handleKeyUp = e => {
        const { target, keyCode } = e;
        const { url, data } = this.props;
        let val = target.value.trim();

        if (!this.cache || this.cache != val) {
            this.cache = val;
            this.active = 0;
            this.search(val);
        }

        switch (keyCode) {
            case KEY.UP:
            case KEY.LEFT:
                break;
            case KEY.DOWN:
            case KEY.RIGHT:
                break;
            case KEY.ENTER:
            case KEY.TAB:
                this.select();
                break;
            default:
                break;
        }
    };
    //上一条
    prev() {}
    //下一条
    next() {}
    //选中
    select() {}
    //查询
    search(val) {
        const { url } = this.props;
        if (val.length == 0) {
            return;
        }
        if (url) {
        } else {
            let data = this.getData(val);
            
        }
    }
    //取数据
    getData(val) {
        this.cacheData = [];
        const { data, formatItem, max } = this.props;
        let flag = 0,
            ret = [];
        if (val.length == 0) {
            return ret;
        }
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            let formatted = formatItem(item),
                text;
            if (typeof formatted !== "object") {
                text = formatted.toString().toLowerCase();
            } else {
                text = formatted.text.toLowerCase();
            }
            if (text.indexOf(val.toLowerCase()) >= 0) {
                this.cacheData.push(item);
                ret.push(item);
                if (flag == max - 1) {
                    break;
                }
                flag++;
            }
        }
        return ret;
    }
    //高亮
    highlight(char, str) {
        const { highlight } = this.props;
        if (highlight) {
            let ret = new RegExp(`(${char})`, "ig");
            str = str.replace(reg, `<strong>$1</strong>`);
        }
        return str;
    }
    //显示
    show() {}
    //隐藏
    hide() {}
    renderContainer() {
        const { mode, placeholder, kSize } = this.props;
        const { value } = this.state;
        if (mode == "single") {
            return (
                <Input
                    type="text"
                    kSize={kSize}
                    placeholder={placeholder}
                    onKeyUp={this.handleKeyUp}
                />
            );
        } else {
            return (
                <MultipleList
                    kSize={kSize}
                    showInput={true}
                    placeholder={placeholder}
                    value={value}
                />
            );
        }
    }
    render() {
        const { mode } = this.props;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, {
            [`${prefixCls}-${mode}`]: true
        });
        return <div className={classString}>{this.renderContainer()}</div>;
    }
}

export default kSize(
    [Sizes.LARGE, Sizes.SMALL],
    kClass(prefixCls, AutoComplete)
);
