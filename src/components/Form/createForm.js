import React, { Component } from "react";
import validate from "./validate";

export const createForm = WrappedComponent =>
    class extends Component {
        state = { fields: {} };

        constructor(props) {
            super(props);
            this.rules = {};
        }

        // handleSubmit = callback => callback(this.state.fields);

        getFieldValue = fieldName => this.state.fields[fieldName];

        setFieldValue = (fieldName, value, callback) => {
            this.setState(state => {
                state.fields[fieldName] = value;
                return state;
            }, callback);
        };

        setRules = (fieldName, rules) => {
            if (!fieldName && !rules && rules.length == 0 && !messages) {
                return;
            }

            if (!this.rules[fieldName]) {
                this.rules[fieldName] = {};
            }

            rules.forEach(rule => {
                if (rule.required) {
                    this.rules[fieldName]["required"] = {
                        message: rule.message || validate.messages["required"],
                        params: rule.params
                    };
                } else if (rule.type) {
                    this.rules[fieldName][rule.type] = {
                        message: rule.message || validate.messages[rule.type],
                        params: rule.params
                    };
                }
            });
        };

        removeRule = (fieldName, ruleName) => {
            if (this.rules[fieldName] && this.rules[fieldName][ruleName]) {
                delete this.rules[fieldName][ruleName];
            }
        };

        validateField = (fieldName, callback) => {
            let value = this.state.fields[fieldName];
            let rules = this.rules[fieldName];

            if (!rules) {
                return;
            }

            for (let method in rules) {
                let rule = rules[method];
                let result = validate.methods[method](value, rule.params);
                if (!result) {
                    let message = this.formatMessage(rule.message, rule.params);
                    callback(message);
                    return;
                } else {
                    callback();
                }
            }
        };

        validateFields = callback => {
            callback("asdf");
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

        render() {
            const props = {
                ...this.props,
                // handleSubmit: this.handleSubmit,
                getFieldValue: this.getFieldValue,
                setFieldValue: this.setFieldValue,
                setRules: this.setRules,
                removeRule: this.removeRule,
                validateField: this.validateField,
                validateFields: this.validateFields
            };

            return (
                <WrappedComponent
                    {...props}
                    ref={ref => (this.instanceComponent = ref)}
                />
            );
        }
    };
