import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getClassSet, kClass, kSize } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import Icon from "../Icon";
import Dropdown from "../Dropdown";
import Menu from "../Menu";
import Button from "../Button";
import MultipleList from "../MultipleList";

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
        mode: PropTypes.oneOf(["single", "multiple"]),
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
    handleOptionSelect = (e, selectedIds, info) => {
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
    handleItemRemove = (e, item) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { mode, disabled } = this.props;
        const { value } = this.state;
        if (disabled) {
            return;
        }
        let newValue = [...value];
        let index = value.indexOf(item.value);
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
    componentWillMount() {
        const { children } = this.props;
        this.optionsMap = {};
        React.Children.forEach(children, child => {
            if (!child) {
                return false;
            }
            this.optionsMap[child.props.value] = {
                children: child.props.chidlren,
                text: child.props.title || child.props.value,
                value: child.props.value
            };
        });
    }
    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
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
    renderContainer() {
        const { mode, placeholder,disabled,kSize } = this.props;
        const { value } = this.state;
        let valList = [];

        value.forEach(v => {
            valList.push({
                text: this.optionsMap[v].text,
                value: v
            });
        });

        if (mode == "single") {
            return (
                <div>
                    <div className={`${prefixCls}-${mode}`}>
                        {value.length == 0 ? (
                            <span className={`${prefixCls}-placeholder`}>
                                {placeholder}
                            </span>
                        ) : (
                            valList[0].text
                        )}
                        <Icon type="caretdown" />
                    </div>
                </div>
            );
        } else {
            return (
                <MultipleList
                    value={valList}
                    placeholder={placeholder}
                    onItemRemove={this.handleItemRemove}
                    disabled={disabled}
                    kSize={kSize}
                />
            );
        }
    }
    render() {
        const { placeholder, mode, disabled } = this.props;
        const { value } = this.state;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, {
            disabled: disabled
        });

        return (
            <Dropdown
                ref="dropdown"
                menu={this.renderOptions()}
                className={classString}
                trigger="click"
                onSelect={this.handleOptionSelect}
                selectedIds={value}
                multiple={mode == "multiple"}
                disabled={disabled}
            >
                {this.renderContainer()}
            </Dropdown>
        );
    }
}

export default kSize([Sizes.LARGE, Sizes.SMALL], kClass(prefixCls, Select));
