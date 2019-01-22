import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
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
            value: !props.multiple && value.length > 1 ? [value[0]] : value
        };
    }
    static propTypes = {
        multiple: PropTypes.bool,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        multiple: false,
        disabled: false,
        defaultValue: []
    };
    handleOptionSelect = (e, selectedIds, info) => {
        const { onSelect, multiple } = this.props;
        const { value } = this.state;
        if (multiple) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }
        if (!("value" in this.props)) {
            this.setState({
                value: selectedIds
            });
        }
        if (onSelect) {
            onSelect( selectedIds);
        }
    };
    handleItemRemove = (e, item) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const { disabled, multiple } = this.props;
        const { value } = this.state;
        if (disabled) {
            return;
        }
        let newValue = [...value];
        let index = value.indexOf(item.value);
        this.refs.dropdown.hide();
        if (!multiple) {
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
    handleMultipleListClick = e => {
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
        const { multiple } = this.props;
        if ("value" in nextProps) {
            this.setState({
                value: multiple ? nextProps.value : nextProps.value[0]
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
                    key: index,
                    index,
                    ...child.props,
                    onClick: this.handleOptionClick
                })
            );
        });

        return <Menu multiple>{items}</Menu>;
    }
    renderContainer() {
        const { multiple, placeholder, disabled, kSize } = this.props;
        const { value } = this.state;
        let valList = [];

        value.forEach(v => {
            valList.push({
                text: this.optionsMap[v].text,
                value: v
            });
        });

        if (!multiple) {
            return (
                <div>
                    <div
                        className={`${prefixCls}-${
                            multiple ? "multiple" : "single"
                        }`}
                    >
                        {value.length == 0 ? (
                            <span className={`${prefixCls}-placeholder`}>
                                {placeholder}
                            </span>
                        ) : (
                            valList[0].text
                        )}
                        <Icon type="caret-down" className="icon-caretdown" />
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
        const { placeholder, multiple, disabled } = this.props;
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
                multiple={multiple}
                disabled={disabled}
            >
                {this.renderContainer()}
            </Dropdown>
        );
    }
}

export default kSize([Sizes.LARGE, Sizes.SMALL], kClass(prefixCls, Select));
