import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "./DatePicker";
import omit from "object.omit";

export default props => {
    const pickerProps = omit(props, ["view", "showTime"]);
    return <DatePicker format="YYYY-MM" view={1} {...pickerProps}   />;
};
