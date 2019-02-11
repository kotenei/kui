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
        rules: PropTypes.object,
        messages: PropTypes.object,
        validator: PropTypes.func
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ""
        };
    }

    init() {
        const { fieldName, defaultValue, rules, messages } = this.props;
        this.form.setFieldValue(fieldName, defaultValue);
        this.form.setRules(fieldName, rules, messages);
    }

    componentDidMount() {
        this.init();
    }

    renderError() {
        const { errorMessage } = this.state;
    }

    render() {
        const { label, className, children, fieldName } = this.props;
        const classString = classnames(
            {
                [prefixCls]: true
            },
            className
        );
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
                    {this.renderError()}
                </div>
            </div>
        );
    }

    handleChange = (...args) => {
        const { getValueFromEvent, validator, rules, fieldName } = this.props;
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

        if (validator) {
            validator(rules, value, this.setError);
        } else {
            this.form.validateField(fieldName, this.setError);
        }
    };

    setError = msg => {
        this.setState({
            errorMessage: msg
        });
    };
}

export default FormItem;
