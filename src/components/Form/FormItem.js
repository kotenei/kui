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
        label: PropTypes.string,
        rules: PropTypes.object
    };

    static defaultProps = {
        defaultValue: ""
    };

    init() {
        const { fieldName, defaultValue } = this.props;
        let fieldValue = this.form.getFieldValue(fieldName);
        if (!fieldValue || fieldValue != defaultValue) {
            this.form.setFieldValue(fieldName, defaultValue);
        }
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {}
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
                        value,
                        ...children.props
                    })}
                </div>
            </div>
        );
    }

    handleChange = e => {
        console.log(e.target.checked);
        this.form.setFieldValue(this.props.fieldName, e.target.value);
    };
}

export default FormItem;
