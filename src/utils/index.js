import React from "react";
import ReactDOM from "react-dom";
import domUtils from './domUtils';

export const guid = () => {
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
};

export const FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export const Empty = props => {
    return props.children;
};

export const getPosition = props => {
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
};

export const getMouseCoord = e => {
    return {
        x:
            e.pageX ||
            e.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:
            e.pageY ||
            e.clientY + document.body.scrollTop - document.body.clientTop
    };
};
