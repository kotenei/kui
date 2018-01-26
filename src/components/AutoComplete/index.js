import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Input from "../Input";

const prefixCls = "k-autocomplete";

class AutoComplete extends Component {
    static propTypes = {
        url: PropTypes.string,
        data: PropTypes.array,
        mode: PropTypes.oneOf(["single", "multiple"]),
        highlight: PropTypes.bool,
        max: PropTypes.number,
        placeholder: PropTypes.string,
        formatItem: PropTypes.func,
        formatResult: PropTypes.func,
        setValue: PropTypes.func
    };
    static defaultProps = {
        data: [],
        mode: "single",
        highlight: false,
        max: 10,
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
    renderContainer() {
        const { mode, placeholder } = this.props;
        if (mode == "single") {
        } else {
        }
    }
    render() {
        const { mode } = this.props;
        let classString = classnames({
            [`${prefixCls}-${mode}`]: true
        });
        return <div className={classString}>{this.renderContainer()}</div>;
    }
}

export default AutoComplete;
