import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-form-item";

class FormItem extends Component {
    static displayName = "FormItem";
    static propTypes = {
        label: PropTypes.string,
        rules: PropTypes.object
    };
    static defaultProps = {};
    render() {
        const { label, className } = this.props;
        const classString = classnames(
            {
                [prefixCls]: true
            },
            className
        );
        return (
            <div className={classString}>
                <label className={`${prefixCls}__label`}>{label}</label>
                <div className={`${prefixCls}__content`} />
            </div>
        );
    }
}

export default FormItem;
