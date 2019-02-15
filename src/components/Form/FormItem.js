import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Grid from "../Grid";


const prefixCls = "k-form-item";

class FormItem extends Component {
    static displayName = "FormItem";

    static propTypes = {
        colon: PropTypes.bool,
        label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        labelCol: PropTypes.object,
        required: PropTypes.bool,
        wrapperCol: PropTypes.object
    };

    static defaultProps = {
        colon: true,
        required: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            colon,
            label,
            labelCol,
            wrapperCol,
            className,
            children,
            required,
            style
        } = this.props;
        const classString = classnames(
            {
                [prefixCls]: true
            },
            className
        );

        return (
            <Grid.Row className={classString} style={style}>
                {label ? (
                    <Grid.Col
                        className={classnames({
                            [`${prefixCls}__label`]: true,
                            [`${prefixCls}__label--colon`]: colon,
                            [`${prefixCls}__label--required`]: required
                        })}
                        {...labelCol}
                    >
                        {label}
                    </Grid.Col>
                ) : null}
                <Grid.Col className={`${prefixCls}__wrapper`} {...wrapperCol}>
                    {children}
                </Grid.Col>
            </Grid.Row>
        );
    }
}

export default FormItem;
