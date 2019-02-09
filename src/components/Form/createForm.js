import React, { Component } from "react";

export const createForm = WrappedComponent =>
    class extends Component {
        state = { fields: {} };

        onChange = fieldName => value => this.setFieldValue(fieldName, value);

        handleSubmit = callback => callback(this.state.fields);

        getFieldValue = fieldName => this.state.fields[fieldName] ;

        setFieldValue = (fieldName, value) =>
            this.setState(state => {
                state.fields[fieldName] = value;
                return state;
            });

        getFieldProps = fieldName => ({
            onChange: this.onChange(fieldName),
            value: this.state.fields[fieldName] 
        });

        render() {
            const props = {
                ...this.props,
                handleSubmit: this.handleSubmit,
                getFieldProps: this.getFieldProps,
                getFieldValue: this.getFieldValue,
                setFieldValue: this.setFieldValue
            };
            
            return (
                <WrappedComponent
                    {...props}
                    ref={ref => (this.instanceComponent = ref)}
                />
            );
        }
    };
