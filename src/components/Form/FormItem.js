import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-form-item";

class FormItem extends Component {
    form = this.props.children._owner.stateNode.props;

    static displayName = "FormItem";

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        defaultValue: PropTypes.any,
        getValueFromEvent: PropTypes.func,
        label: PropTypes.string,
        rules: PropTypes.object
    };

    static defaultProps = {};

    init() {
        const { fieldName, defaultValue } = this.props;
        this.form.setFieldValue(fieldName, defaultValue);
    }

    componentDidMount() {
        this.init();
    }

    render() {
        const { label, className, children, fieldName } = this.props;
        const classString = classnames(
            {
                [prefixCls]: true
            },
            className
        );
        const fieldProps = this.form.getFieldProps(fieldName);
        const value = this.form.getFieldValue(fieldName);
        return (
            <div className={classString}>
                <label className={`${prefixCls}__label`}>{label}</label>
                <div className={`${prefixCls}__content`}>
                    {React.cloneElement(children, {
                        onChange: this.handleChange,
                        defaultValue: value,
                        ...children.props
                    })}
                </div>
            </div>
        );
    }

    handleChange = (...args) => {
        const { getValueFromEvent } = this.props;
        let value;
        if (getValueFromEvent) {
            value = getValueFromEvent(...args);
        } else {
            let e = args[0];
            if (e && e.target) {
                const { target } = e;
                value =
                    target.type === "checkbox" || target.type === "radio"
                        ? target.checked
                        : target.value;
            } else {
                value = e;
            }
        }
        this.form.setFieldValue(this.props.fieldName, value);
    };
}

export default FormItem;
