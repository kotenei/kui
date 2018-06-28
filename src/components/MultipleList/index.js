import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Input from "../Input";
import { getClassSet, kClass, kSize, guid } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import Icon from "../Icon";
import { CSSTransition, TransitionGroup } from "react-transition-group";

let seed = 1;
const prefixCls = "k-multiple-list";

class MultipleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: props.inputValue
        };
        this.id = `multiplelist_${seed++}`;
    }
    static propTypes = {
        ref: PropTypes.string,
        value: PropTypes.array,
        inputValue: PropTypes.string,
        disabled: PropTypes.bool,
        showInput: PropTypes.bool,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onKeyUp: PropTypes.func,
        onItemRemove: PropTypes.func
    };
    static defaultProps = {
        value: [],
        disabled: false,
        showInput: false
    };
    handleClick = e => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(e);
        }
    };
    handleFocus = e => {
        const { onFocus } = this.props;
        if (onFocus) {
            onFocus(e);
        }
    };
    handleBlur = e => {
        const { onBlur } = this.props;
        if (onBlur) {
            onBlur(e);
        }
    };
    handleKeyUp = e => {
        const { onKeyUp } = this.props;
        if (onKeyUp) {
            onKeyUp(e);
        }
    };
    handleChange = e => {
        const { target } = e;
        const { onChange } = this.props;
        if (onChange) {
            onChange(e);
        }
    };
    handleItemRemove = (item, e) => {
        const { onItemRemove } = this.props;
        if (onItemRemove) {
            onItemRemove(e, item);
        }
    };
    componentWillReceiveProps(nextProps) {
        if ("inputValue" in nextProps) {
            this.setState({
                inputValue: nextProps.inputValue
            });
        }
    }
    renderList() {
        const { value, showInput, kSize, placeholder } = this.props;
        const { inputValue } = this.state;
        let items = [];
        value.forEach((v, i) => {
            let item = v;
            if (typeof v === "string") {
                item = { text: v, value: v };
            }
            items.push(
                <CSSTransition key={i} timeout={300} classNames="fade">
                    <li className="item" title={item.text}>
                        <div className={`${prefixCls}-choice-content`}>
                            {item.text}
                        </div>
                        <Icon
                            type="close"
                            onClick={this.handleItemRemove.bind(this, item)}
                        />
                    </li>
                </CSSTransition>
            );
        });

        if (showInput) {
            items.push(
                <CSSTransition
                    key={`input_${this.id}`}
                    timeout={300}
                    classNames="fade"
                >
                    <li
                        key={`li-${this.id}`}
                        style={{ width: "100%", flex: 1 }}
                    >
                        <Input
                            className={`${prefixCls}-input`}
                            type="text"
                            kSize={kSize}
                            placeholder={placeholder}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            onKeyUp={this.handleKeyUp}
                            onChange={this.handleChange}
                            value={inputValue}
                            autoFocus={this.props.autoFocus}
                        />
                    </li>
                </CSSTransition>
            );
        }

        return (
            <TransitionGroup
                component="ul"
                className={`${prefixCls}-choice-list`}
            >
                {items}
            </TransitionGroup>
        );
    }
    render() {
        const {
            trigger,
            className,
            showInput,
            value,
            placeholder,
            disabled
        } = this.props;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, className, {
            disabled: disabled
        });
        return (
            <div className={classString} onClick={this.handleClick}>
                <div className={`${prefixCls}-selection`} trigger={trigger}>
                    {this.renderList()}
                </div>
                {value.length == 0 && !showInput && placeholder ? (
                    <div
                        title={placeholder}
                        className={`${prefixCls}-placeholder`}
                    >
                        {placeholder}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default kSize(
    [Sizes.LARGE, Sizes.SMALL],
    kClass(prefixCls, MultipleList)
);
