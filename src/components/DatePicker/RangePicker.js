import React, { Component } from "react";
import PropTypes from "prop-types";
import Picker from "./Picker";
import Input from "../Input";
import { format as formatter } from "date-fns";
import PopPanel from "../PopPanel";
import { prefix } from "../../utils/kUtils";
import Icon from "../Icon";
import classnames from "classnames";

const prefixCls = "k-rangePicker";

class RangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: props.defaultValue || props.value
        };
    }
    static propTypes = {
        defaultValue: PropTypes.array,
        separator: PropTypes.string,
        value: PropTypes.array
    };
    static defaultProps = {
        separator: "-"
    };
    handleClick = e => {
        this.open();
    };
    handleChange = obj => {};
    open = () => {
        this.setState({
            open: true
        });
    };
    close = () => {
        this.setState({
            open: false
        });
    };
    componentDidMount() {
        document.addEventListener("click", this.close);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.close);
    }
    render() {
        const { separator, kSize } = this.props;
        const { open } = this.state;
        let input = (
            <div
                className={classnames({
                    [prefixCls]: true,
                    "k-form-control": true,
                    [`k-form-control-${kSize}`]: kSize
                })}
                onClick={this.handleClick}
            >
                <input type="text" className={`${prefixCls}-input`} />
                <span className={`${prefixCls}-separator`}>{separator}</span>
                <input type="text" className={`${prefixCls}-input`} />
                <Icon className={`${prefixCls}-icon`} type="calendar" />
            </div>
        );
        return (
            <PopPanel input={input} open={open}>
                <div className={`${prefixCls}-range-left`}>
                    <Picker {...this.props} />
                </div>
                <div className={`${prefixCls}-range-right`}>
                    <Picker {...this.props} />
                </div>
            </PopPanel>
        );
    }
}

export default RangePicker;
