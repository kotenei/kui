import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Grid from "../Grid";

const prefixCls = "k-form-item";

class FormItem extends Component {
    form = this.props.children._owner.stateNode.props;

    static displayName = "FormItem";

    static propTypes = {
        fieldName: PropTypes.string,
        defaultValue: PropTypes.any,
        getValueFromEvent: PropTypes.func,
        label: PropTypes.string,
        labelCol: PropTypes.object,
        wrapperCol: PropTypes.object,
        rules: PropTypes.array,
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
        const { fieldName, defaultValue, rules } = this.props;
        if (fieldName) {
            this.form.setFieldValue(fieldName, defaultValue);
            this.form.setRules(fieldName, rules);
        }
    }

    componentDidMount() {
        this.init();
    }

    renderError() {
        const { errorMessage } = this.state;

        return (
            <TransitionGroup component={React.Fragment}>
                {errorMessage ? (
                    <CSSTransition timeout={300} classNames="slide-down">
                        <div className={`${prefixCls}__error`}>
                            {errorMessage}
                        </div>
                    </CSSTransition>
                ) : null}
            </TransitionGroup>
        );
    }

    render() {
        const {
            label,
            className,
            children,
            fieldName,
            rules,
            labelCol,
            wrapperCol
        } = this.props;
        const { errorMessage } = this.state;
        const classString = classnames(
            {
                [prefixCls]: true,
                [`${prefixCls}--error`]: errorMessage
            },
            className
        );
        const value = this.form.getFieldValue(fieldName);

        return (
            <Grid.Row className={classString}>
                {fieldName && label ? (
                    <Grid.Col
                        className={classnames({
                            [`${prefixCls}__label`]: true,
                            [`${prefixCls}__label--required`]:
                                rules && rules.findIndex(f => f.required) > -1
                        })}
                        {...labelCol}
                    >
                        {label}
                    </Grid.Col>
                ) : null}
                <Grid.Col
                    className={`${prefixCls}__wrapper`}
                    {...wrapperCol}
                >
                    {React.cloneElement(children, {
                        onChange: this.handleChange,
                        defaultValue: value,
                        ...children.props
                    })}
                    {this.renderError()}
                </Grid.Col>
            </Grid.Row>
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

        this.form.setFieldValue(this.props.fieldName, value, () => {
            if (validator) {
                validator(rules, value, this.setError);
            } else {
                this.form.validateField(fieldName, this.setError);
            }
        });
    };

    setError = msg => {
        this.setState({
            errorMessage: msg
        });
    };
}

export default FormItem;
