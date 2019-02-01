import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-form";

class Form extends Component {
    static propTypes = {
        mode: PropTypes.oneOf(["horizontal", "vertical", "inline"])
    };
    static defaultProps = {
        mode: "horizontal"
    };
    renderChildren() {
        const { children } = this.props;
        return React.Children.map(children, child => {
            if (child && child.type && child.type.displayName == "FormItem") {
                return child;
            }
            return null;
        });
    }
    render() {
        const { className, style, mode } = this.props;
        const classString = classnames(
            {
                [prefixCls]: true,
                [`${prefixCls}-${mode}`]: mode
            },
            className
        );

        return (
            <form className={classString} style={style}>
                {this.renderChildren()}
            </form>
        );
    }
}

export default Form;
