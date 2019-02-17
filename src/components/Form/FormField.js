import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import validate from "./validate";
import Tooltip from "../Tooltip";
import FormContext from "./FormContext";

const prefixCls = "k-form-field";

class FormField extends Component {
    static contextType = FormContext;
    state = {
        errorMessage: "",
        value: undefined
    };
    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        focusClear: PropTypes.bool,
        initialValue: PropTypes.any,
        getValueFromEvent: PropTypes.func,
        rules: PropTypes.array,
        validator: PropTypes.func,
        tooltip: PropTypes.bool,
        tooltipPlacement: PropTypes.oneOf([
            "top",
            "left",
            "right",
            "bottom",
            "topLeft",
            "topRight",
            "bottomLeft",
            "bottomRight",
            "leftTop",
            "leftBottom",
            "rightTop",
            "rightBottom"
        ])
    };
    static defaultProps = {
        focusClear: false,
        tooltip: false,
        tooltipPlacement: "right"
    };
    init(props = this.props) {
        const { fieldName, rules } = props;
        let count = 0;
        this.rules = {};
        if (rules && rules.length > 0) {
            rules.forEach(rule => {
                if (rule.required) {
                    this.rules["required"] = {
                        message: rule.message || validate.messages["required"],
                        params: rule.params
                    };
                    count++;
                } else if (rule.type) {
                    this.rules[rule.type] = {
                        message: rule.message || validate.messages[rule.type],
                        params: rule.params
                    };
                    count++;
                }
            });
        }

        if (count === 0 && this.state.errorMessage) {
            this.setState({
                errorMessage: ""
            });
        }
    }

    componentDidMount() {
        const { form } = this.context;
        if (form) {
            form.init(this);
        }
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    componentWillUnmount() {
        const { form } = this.context;
        const { fieldName } = this.props;
        if (form) {
            form.removeField(fieldName);
        }
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
            className,
            children,
            fieldName,
            style,
            tooltip,
            tooltipPlacement
        } = this.props;
        const { errorMessage } = this.state;
        const { form } = this.context;
        const value = form ? form.getFieldValue(fieldName) : this.state.value;
        const content = React.cloneElement(children, {
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            value,
            ...children.props
        });
        const classString = classnames(
            {
                [prefixCls]: true,
                [`${prefixCls}--error`]: errorMessage
            },
            className
        );
        return (
            <div className={classString} style={style}>
                {tooltip ? (
                    <Tooltip
                        title={errorMessage}
                        kStyle="danger"
                        show={errorMessage ? true : false}
                        placement={tooltipPlacement}
                    >
                        {content}
                    </Tooltip>
                ) : (
                    content
                )}
                {!tooltip && this.renderError()}
            </div>
        );
    }

    handleChange = (...args) => {
        const { getValueFromEvent, fieldName } = this.props;
        const { form } = this.context;
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

        if (form) {
            form.setFieldValue(fieldName, value, () => {
                this.validate();
            });
        } else {
            this.setState(
                {
                    value
                },
                () => {
                    this.validate();
                }
            );
        }
    };

    handleFocus = () => {
        const { focusClear } = this.props;
        if (focusClear) {
            this.setState({
                errorMessage: ""
            });
        }
    };

    handleBlur = () => {
        const { focusClear } = this.props;
        if (focusClear) {
            this.validate();
        }
    };

    setError = msg => {
        const { errorMessage } = this.state;
        if (typeof msg === "string") {
            this.setState({
                errorMessage: msg
            });
        }
    };

    validate = callback => {
        const { validator, fieldName } = this.props;
        const { form } = this.context;
        let result = true;
        let message;
        let value = form ? form.getFieldValue(fieldName) : this.state.value;
        if (this.rules) {
            for (let method in this.rules) {
                let rule = this.rules[method];
                result = validate.methods[method](value, rule.params);
                if (!result) {
                    message = this.formatMessage(rule.message, rule.params);
                    break;
                }
            }
        }
        this.setState(
            {
                errorMessage: message
            },
            () => {
                if (validator) {
                    validator(value, msg => {
                        if (msg) {
                            result = false;
                            message = msg;
                        }
                        this.setState(
                            {
                                errorMessage: message
                            },
                            () => {
                                if (typeof callback === "function") {
                                    callback(result, message);
                                }
                            }
                        );
                    });
                } else {
                    if (typeof callback === "function") {
                        callback(result, message);
                    }
                }
            }
        );
    };

    formatMessage(message, params) {
        if (message.indexOf("{0}") != -1) {
            if (!Array.isArray(params)) {
                params = [params];
            }
            params.forEach((v, i) => {
                message = message.replace(
                    new RegExp("\\{" + i + "\\}", "g"),
                    function() {
                        return v;
                    }
                );
            });
        }
        return message;
    }

    resetField = () => {
        const { fieldName, initialValue } = this.props;
        const { form } = this.context;
        if (form) {
            form.setFieldValue(fieldName, initialValue, () => {
                this.setState({
                    errorMessage: ""
                });
            });
        }
    };
}

export default FormField;
