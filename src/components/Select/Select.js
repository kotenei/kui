import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
    guid,
    FirstChild,
    getClassSet,
    kClass,
    kSize
} from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import Icon from "../Icon";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import Button from "../Button";

const prefixCls = "k-select";

class SelectContainer extends Component {
    render() {
        return (
            <div className={this.props.className}>{this.props.children}</div>
        );
    }
}

class Select extends Component {
    constructor(props) {
        super(props);
        const value = props.value || props.defaultValue;
        this.state = {
            value:
                props.mode == "single" && value.length > 1 ? [value[0]] : value
        };
    }
    static propTypes = {
        mode: PropTypes.oneOf[("single", "multiple")],
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        mode: "single",
        disabled: false,
        defaultValue: []
    };
    handleOptionSelect = (e, selectedIds) => {
        const { onSelect, mode } = this.props;
        const { value } = this.state;
        if (mode == "multiple") {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }
        if (!("value" in this.props)) {
            this.setState({
                value: selectedIds
            });
        }

        if (onSelect) {
            onSelect(selectedIds);
        }
    };
    handleRemoveItem = (removeValue, e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { mode, disabled } = this.props;
        const { value } = this.state;
        if (disabled) {
            return;
        }
        let newValue = [...value];
        let index = value.indexOf(removeValue);
        this.refs.dropdown.hide();
        if (mode == "single") {
            return;
        }
        if (index != -1) {
            newValue.splice(index, 1);
            if (!("value" in this.props)) {
                this.setState({
                    value: newValue
                });
            }
        }
    };
    handlePlaceholderClick = e => {
        const { disabled } = this.props;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (disabled) {
            return;
        }
        this.refs.dropdown.show();
    };
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    }
    renderSelected() {
        const { value } = this.state;
        const { children, mode } = this.props;
        let items = [];
        value.forEach((v, i) => {
            items.push(
                <CSSTransition timeout={300} classNames="fade">
                    <li>
                        <div className={`${prefixCls}-choice-content`}>{v}</div>
                        {mode == "single" ? (
                            <Icon type="caretdown" />
                        ) : (
                            <Icon
                                type="close"
                                onClick={this.handleRemoveItem.bind(this, v)}
                            />
                        )}
                    </li>
                </CSSTransition>
            );
        });

        if (mode == "single" && items.length == 0) {
            items.push(
                <CSSTransition timeout={300} classNames="fade">
                    <li>
                        <div className={`${prefixCls}-choice-content`} />
                        <Icon type="caretdown" />
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
    renderOptions() {
        const { children } = this.props;
        let items = [];
        React.Children.forEach(children, (child, index) => {
            if (!child) {
                return false;
            }
            items.push(
                React.cloneElement(child, {
                    index,
                    ...child.props,
                    onClick: this.handleOptionClick
                })
            );
        });

        return <Menu multiple>{items}</Menu>;
    }
    render() {
        const { placeholder, mode, disabled } = this.props;
        const { value } = this.state;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, {
            [`${prefixCls}-${mode}`]: true,
            disabled: disabled
        });

        return (
            <Dropdown
                ref="dropdown"
                menu={this.renderOptions()}
                component={SelectContainer}
                className={classString}
                trigger="click"
                onSelect={this.handleOptionSelect}
                selectedIds={value}
                multiple={mode == "multiple"}
                disabled={disabled}
            >
                <div className={`${prefixCls}-selection`} trigger="dropdown">
                    {this.renderSelected()}
                </div>
                {value.length == 0 ? (
                    <div
                        className={`${prefixCls}-placeholder`}
                        onClick={this.handlePlaceholderClick}
                    >
                        {placeholder}
                    </div>
                ) : null}
            </Dropdown>
        );
    }
}

export default kSize([Sizes.LARGE, Sizes.SMALL], kClass(prefixCls, Select));
