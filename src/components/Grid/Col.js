import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-col";

class Col extends Component {
    static displayName = "Col";
    static propTypes = {
        offset: PropTypes.number,
        span: PropTypes.number,
        xs: PropTypes.number,
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number,
        xl: PropTypes.number,
        xxl: PropTypes.number
    };
    static defaultProps = {
        offset: 0
    };
    render() {
        const { className, children, offset, span, ...others } = this.props;
        let responsiveClasses = {};
        ["xs", "sm", "md", "lg", "xl", "xxl"].forEach(size => {
            let sizeSpan;
            if (typeof this.props[size] === "number") {
                sizeSpan = this.props[size];
            }
            delete others[size];
            responsiveClasses = {
                ...responsiveClasses,
                [`${prefixCls}-${size}-${sizeSpan}`]: sizeSpan !== undefined
            };
        });
        const classes = classNames(
            {
                [`${prefixCls}-${span}`]: span !== undefined,
                [`${prefixCls}-offset-${offset}`]: offset !== undefined
            },
            className,
            responsiveClasses
        );

        return (
            <div className={classes} {...others}>
                {children}
            </div>
        );
    }
}

export default Col;
