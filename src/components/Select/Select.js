import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Icon from "../Icon";

const prefixCls = "k-select";

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
                );
            }
        });
        return items.length > 0 ? (
            <ul className={`${prefixCls}-choice-list`}>{items}</ul>
        ) : null;
    }
    renderOptions() {
        const { children } = this.props;
        let items = [];
        React.Children.forEach(children, (child, index) => {
            items.push(
                React.cloneElement(child, {
                    ...child.props,
                    onClick: this.handleOptionClick
                })
            );
        });
    }
    render() {
        const { placeholder, mode } = this.props;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-${mode}`]: true
        });
        return (
            <div className={classString}>
                <div className={`${prefixCls}-selection`}>
                    {this.renderSelected()}
                </div>
                <div className={`${prefixCls}-placeholder`}>{placeholder}</div>
                {this.renderOptions()}
            </div>
        );
    }
}

export default Select;
