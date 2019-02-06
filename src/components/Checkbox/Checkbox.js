import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            checked: props.checked || props.defaultChecked || false,
            value: props.value
        };
    }
    static propTypes = {
        option: PropTypes.object,
        disabled: PropTypes.bool,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        indeterminate: PropTypes.bool,
        inline: PropTypes.bool,
        mode: PropTypes.oneOf(["none", "normal", "toggle"]),
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    };
    static defaultProps = {
        inline: false,
        indeterminate: false,
        mode: "normal"
        //onChange: () => {}
    };
    static contextTypes = {
        checkboxGroup: PropTypes.any
    };

    handleClick = e => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    handleChange(e) {
        const { onChange, option } = this.props;
        if (onChange) {
            onChange(e, option);
        }
        this.setState({
            checked: e.target.checked
        });
    }
    renderMode(checked) {
        const { mode } = this.props;
        switch (mode) {
            case "normal":
                return this.renderMaterial(checked);
            case "toggle":
                return this.renderToggle();
            default:
                return null;
        }
    }
    renderMaterial(checked) {
        const { indeterminate } = this.props;
        return (
            <span
                className={classnames({
                    material: true,
                    indeterminate: indeterminate && !checked,
                    checked: checked
                })}
            >
                <span
                    className={classnames({
                        check: true
                    })}
                />
            </span>
        );
    }
    renderToggle() {
        return <span className="toggle" />;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.checked
        });
    }
    render() {
        const { checkboxGroup } = this.context;
        let checkboxProps = { ...this.props };
        if (checkboxGroup) {
            checkboxProps.name = checkboxGroup.name;
            checkboxProps.inline = checkboxGroup.inline;
            checkboxProps.disabled =
                checkboxProps.disabled || checkboxGroup.disabled;
            checkboxProps.checked =
                checkboxGroup.value.indexOf(checkboxProps.value) !== -1;

            checkboxProps.onChange = e =>
                checkboxGroup.onChange(e, {
                    text: checkboxProps.children,
                    value: checkboxProps.value
                });
        }
        const {
            disabled,
            children,
            mode,
            name,
            inline,
            checked,
            value,
            className
        } = checkboxProps;
        let prefixCls = "k-checkbox";
        let classString = classnames(className, {
            [prefixCls]: true,
            [`${prefixCls}-material`]: mode == "material",
            [`${prefixCls}-toggle`]: mode == "toggle",
            [`${prefixCls}-inline`]: checkboxProps.inline,
            disabled: disabled
        });

        return (
            <div className={classString}>
                <label>
                    <input
                        type="checkbox"
                        className={mode == "none" ? "normal" : ""}
                        name={name}
                        value={value}
                        disabled={disabled}
                        checked={checked}
                        onClick={this.handleClick}
                        onChange={checkboxProps.onChange || this.handleChange}
                    />
                    {this.renderMode(checkboxProps.checked)}
                    {children ? (
                        <span className="content">{children}</span>
                    ) : null}
                </label>
            </div>
        );
    }
}

export default Checkbox;
