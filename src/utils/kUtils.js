import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import invariant from "invariant";
import styleMaps from "./styleMaps";
import domUtils from "./domUtils";

//处理样式前缀
export function prefix(props = {}, variant) {
    invariant(
        (props.kClass || "").trim(),
        "A `kClass` prop is required for this component"
    );
    return props.kClass + (variant ? `-${variant}` : "");
}

export function kClass(defaultClass, Component) {
    let propTypes = Component.propTypes || (Component.propTypes = {});
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});
    propTypes.kClass = PropTypes.string;
    defaultProps.kClass = defaultClass;
    return Component;
}

export const kStyles = (styles, defaultStyle, Component) => {
    
    if (typeof defaultStyle !== "string") {
        Component = defaultStyle;
        defaultStyle = undefined;
    }

    let existing = Component.STYLES || [];
    let propTypes = Component.propTypes || {};

    styles.forEach(style => {
        if (existing.indexOf(style) === -1) {
            existing.push(style);
        }
    });

    //设置样式属性，唯一
    let propType = PropTypes.oneOf(existing);

    Component.STYLES = propType._values = existing;

    Component.propTypes = {
        ...propTypes,
        kStyle: propType
    };

    if (defaultStyle !== undefined) {
        let defaultProps =
            Component.defaultProps || (Component.defaultProps = {});
        defaultProps.kStyle = defaultStyle;
    }
    return Component;
};

export const kSize = (sizes, defaultSize, Component) => {
    if (typeof defaultSize !== "string") {
        Component = defaultSize;
        defaultSize = undefined;
    }
    let existing = Component.SIZES || [];
    let propTypes = Component.propTypes || {};
    sizes.forEach(size => {
        if (existing.indexOf(size) === -1) {
            existing.push(size);
        }
    });

    const values = [];
    existing.forEach(size => {
        const mappedSize = styleMaps.SIZES[size];
        if (mappedSize && mappedSize !== size) {
            values.push(mappedSize);
        }
        values.push(size);
    });

    let propType = PropTypes.oneOf(values);

    propType._values = values;

    Component.SIZES = existing;

    Component.propTypes = {
        ...propTypes,
        kSize: propType
    };

    if (defaultSize !== undefined) {
        let defaultProps =
            Component.defaultProps || (Component.defaultProps = {});
        defaultProps.kSize = defaultSize;
    }

    return Component;
};

export function getClassSet(props) {
    const classes = {
        [prefix(props)]: true
    };
    if (props.kStyle) {
        classes[prefix(props, props.kStyle)] = true;
    }
    if (props.kSize) {
        const kSize = styleMaps.SIZES[props.kSize] || props.kSize;
        classes[prefix(props, kSize)] = true;
    }
    return classes;
}

export function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
    );
}

export function FirstChild(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

export function getPosition(props) {
    let parent = ReactDOM.findDOMNode(props.trigger),
        ew = domUtils.outerWidth(parent),
        eh = domUtils.outerHeight(parent),
        tw = props.orgWidth,
        th = props.orgHeight,
        position = { left: 0, top: 0 },
        pos = { left: 0, top: 0 };

    do {
        position.left += parent.offsetLeft - parent.scrollLeft;
        position.top += parent.offsetTop - parent.scrollTop;
    } while ((parent = parent.offsetParent) && parent != document.body);

    switch (props.placement) {
        case "left":
            pos = {
                top: position.top + eh / 2 - th / 2,
                left: position.left - tw
            };
            break;
        case "leftTop":
            pos = { top: position.top, left: position.left - tw };
            break;
        case "leftBottom":
            pos = { top: position.top + eh - th, left: position.left - tw };
            break;
        case "top":
            pos = {
                top: position.top - th,
                left: position.left + ew / 2 - tw / 2
            };
            break;
        case "topLeft":
            pos = { top: position.top - th, left: position.left };
            break;
        case "topRight":
            pos = { top: position.top - th, left: position.left + ew - tw };
            break;
        case "right":
            pos = {
                top: position.top + eh / 2 - th / 2,
                left: position.left + ew
            };
            break;
        case "rightTop":
            pos = { top: position.top, left: position.left + ew };
            break;
        case "rightBottom":
            pos = { top: position.top + eh - th, left: position.left + ew };
            break;
        case "bottom":
            pos = {
                top: position.top + eh,
                left: position.left + ew / 2 - tw / 2
            };
            break;
        case "bottomLeft":
            pos = { top: position.top + eh, left: position.left };
            break;
        case "bottomRight":
            pos = { top: position.top + eh, left: position.left + ew - tw };
            break;
    }

    return pos;
}
