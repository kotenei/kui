import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { guid, FirstChild } from "../../utils/kUtils";
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
        this.state = {
            value: props.value || props.defaultValue
        };
    }
    static propTypes = {
        mode: PropTypes.oneOf[("single", "multiple")],
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        onSelect: PropTypes.func,
        onRemove: PropTypes.func
    };
    static defaultProps = {
        mode: "single",
        disabled: false,
        defaultValue: []
    };
    handleOptionClick = item => {
        const { onSelect, mode } = this.props;
        const { value } = this.state;
        let newValue = [...value];
        let index = newValue.indexOf(item.vlaue);
        if (mode == "single") {
            newValue = [].push(item.value);
        } else {
            if (newValue == -1) {
                newValue.push(item.value);
            } else {
                newValue.splice(index, 1);
            }
        }
        if (!("value" in this.props)) {
            this.setState({
                value: newValue
            });
        }
        if (onselect) {
            onSelect(newValue);
        }
    };
    handleOptionSelect = selectedIds => {
        const { onSelect, mode } = this.props;
        const { value } = this.state;
        this.setState({
            value:selectedIds
        })
    };
    handleRemoveIcon = removeValue => {
        const { mode, onRemove } = this.props;
        const { value } = this.state;
        let newValue = [...value];
        let index = value.indexOf(removeValue);
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
            if (onRemove) {
                onRemove(newValue);
            }
        }
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
        React.Children.forEach(children, (child, index) => {
            if (!child) {
                return false;
            }
            if (value.indexOf(child.props.value) != -1) {
                items.push(
                    <CSSTransition key={guid()} timeout={300} classNames="fade">
                        <li>
                            <div className={`${prefixCls}-choice-content`}>
                                {child.props.children}
                            </div>
                            {mode == "single" ? (
                                <Icon type="caretdown" />
                            ) : (
                                <Icon
                                    type="close"
                                    onClick={this.handleRemoveIcon.bind(
                                        this,
                                        child.props.value
                                    )}
                                />
                            )}
                        </li>
                    </CSSTransition>
                );
            }
        });

        return (
            <ul className={`${prefixCls}-choice-list`}>
                <TransitionGroup component={FirstChild}>
                    {items}
                </TransitionGroup>
            </ul>
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
        const { placeholder, mode } = this.props;
        const { value } = this.state;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true
        });

        return (
            <Dropdown
                menu={this.renderOptions()}
                component={SelectContainer}
                className={classString}
                trigger="click"
                onSelect={this.handleOptionSelect}
                selectedIds={value}
            >
                <div className={`${prefixCls}-selection`} trigger="dropdown">
                    {this.renderSelected()}
                </div>
                <div className={`${prefixCls}-placeholder`}>{placeholder}</div>
            </Dropdown>
        );
    }
}

export default Select;
