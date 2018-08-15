import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "./DatePicker";
import omit from "object.omit";
import pick from 'object.pick';

export default props => {
    const pickerProps = pick(props, [
        "defaultValue",
        "value",
        "disabled",
        "format",
        "placeholder",
        "onPrev",
        "onNext",
        "onChange",
        "onClear"
    ]);
    return <DatePicker format="YYYY-MM" view={1} {...pickerProps}   />;
};
