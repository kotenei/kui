import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const prefixCls = "k-row";

class Row extends Component {
    static propTypes = {
        align: PropTypes.oneOf(["top", "middle", "bottom"]),
        gutter: PropTypes.number,
        justify: PropTypes.oneOf([
            "start",
            "end",
            "center",
            "space-around",
            "space-between"
        ])
    };
    static defaultProps = {
        align: "top",
        gutter: 0,
        justify: "start"
    };
    render() {
        const {
            align,
            gutter,
            justify,
            style,
            className,
            children
        } = this.props;
        const gutterStyle = gutter
            ? {
                  marginLeft: -gutter / 2,
                  marginRight: -gutter / 2
              }
            : null;
        const _style = { ...gutterStyle, ...style };
        const classes = classNames(prefixCls, className, {
            [`${prefixCls}--${justify}`]: !!justify,
            [`${prefixCls}--${align}`]: !!align
        });

        const cols = React.Children.map(children, child => {
            if (child.type && child.type.displayName == "Col") {
                if (child.props && gutter > 0) {
                    return React.cloneElement(child, {
                        style: {
                            paddingLeft: gutter / 2,
                            paddingRight: gutter / 2,
                            ...child.props.style
                        }
                    });
                }
                return child;
            }
            return null;
        });

        return (
            <div className={classes} {...others} style={_style}>
                {cols}
            </div>
        );
    }
}

export default Row;
