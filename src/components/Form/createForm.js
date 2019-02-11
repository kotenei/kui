import React, { Component } from "react";
import validate from "./validate";

export const createForm = WrappedComponent =>
    class extends Component {
        state = { fields: {} };

        constructor(props) {
            super(props);
            this.rules = {};
            this.messages = {};
        }

        handleSubmit = callback => callback(this.state.fields);

        getFieldValue = fieldName => this.state.fields[fieldName];

        setFieldValue = (fieldName, value) => {
            this.setState(state => {
                state.fields[fieldName] = value;
                return state;
            });
        };

        setRules = (fieldName, rules, messages) => {
            if (!fieldName && !rules && !messages) {
                return;
            }

            if (!this.rules[fieldName]) {
                this.rules[fieldName] = rules;
            } else {
                this.rules[fieldName] = Object.assign(
                    this.rules[fieldName],
                    rules
                );
            }

            if (!this.messages[fieldName]) {
                this.messages[fieldName] = messages;
            } else {
                this.messages[fieldName] = Object.assign(
                    this.messages[fieldName],
                    messages
                );
            }
        };

        removeRule = (fieldName, ruleName) => {
            if (this.rules[fieldName] && this.rules[fieldName][ruleName]) {
                delete this.rules[fieldName][ruleName];
            }

            if (
                this.messages[fieldName] &&
                this.messages[fieldName][ruleName]
            ) {
                delete this.messages[fieldName][ruleName];
            }
        };

        validateField = (fieldName, callback) => {
            let value = this.state.fields[fieldName];
            let rules = this.rules[fieldName];
            let messages = this.messages[fieldName];
            if (!rules || value == undefined || value == null) {
                return;
            }
            
        };

        render() {
            const props = {
                ...this.props,
                handleSubmit: this.handleSubmit,
                getFieldValue: this.getFieldValue,
                setFieldValue: this.setFieldValue,
                setRules: this.setRules,
                removeRule: this.removeRule,
                validateField: this.validateField
            };

            return (
                <WrappedComponent
                    {...props}
                    ref={ref => (this.instanceComponent = ref)}
                />
            );
        }
    };
