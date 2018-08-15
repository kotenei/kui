import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import classnames from "classnames";
import omit from "object.omit";
import { kStyles, kClass, kSize, getClassSet } from "../../utils/kUtils";
import { State, DEFAULT, PRIMARY, Sizes } from "../../utils/styleMaps";

const types = ["button", "reset", "submit"];

class Button extends Component {
    static propTypes = {
        icon: PropTypes.string,
        disabled: PropTypes.bool,
        type: PropTypes.oneOf(types),
        raised: PropTypes.bool,
        fab: PropTypes.bool,
        active: PropTypes.bool
    };
    static defaultProps = {
        disabled: false,
        type: "button"
    };
    render() {
        const {
            icon,
            raised,
            fab,
            active,
            disabled,
            type,
            className,
            children
        } = this.props;
        let classes = getClassSet(this.props);
        let otherProps = omit(this.props, [
            "kClass",
            "kStyle",
            "kSize",
            "raised",
            "fab",
            "disabled",
            "icon",
            "active"
        ]);
        classes.disabled = disabled;
        classes = classnames(classes, {
            "k-btn-raised": raised,
            "k-btn-fab": fab,
            active: active
        });
        return (
            <button
                {...otherProps}
                type={type}
                className={classnames(classes, className)}
            >
                {icon ? <Icon type={icon} /> : null}
                {children}
            </button>
        );
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(
    styles,
    DEFAULT,
    kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL], kClass("k-btn", Button))
);
