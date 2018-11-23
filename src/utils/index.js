import React from "react";
import ReactDOM from "react-dom";
import domUtils from "./domUtils";

export const getPosition = props => {
    let parent = ReactDOM.findDOMNode(props.trigger),
        ew = domUtils.outerWidth(parent),
        eh = domUtils.outerHeight(parent),
        tw = props.width || 0,
        th = props.height || 0,
        position = { left: 0, top: 0 },
        pos = { left: 0, top: 0 },
        offset = 4;

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
                top: position.top - th - offset,
                left: position.left + ew / 2 - tw / 2
            };
            break;
        case "topLeft":
            pos = { top: position.top - th - offset, left: position.left };
            break;
        case "topRight":
            pos = {
                top: position.top - th - offset,
                left: position.left + ew - tw
            };
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
                top: position.top + eh + offset,
                left: position.left + ew / 2 - tw / 2
            };
            break;
        case "bottomLeft":
            pos = { top: position.top + eh + offset, left: position.left };
            break;
        case "bottomRight":
            pos = {
                top: position.top + eh + offset,
                left: position.left + ew - tw
            };
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

export const deepClone = obj => {
    if (!obj || typeof obj !== "object" || obj instanceof Date) {
        return obj;
    }

    let newObj = {};
    if (Array.isArray(obj)) {
        newObj = obj.map(item => {
            return deepClone(item);
        });
    } else {
        Object.keys(obj).forEach(key => {
            return (newObj[key] = deepClone(obj[key]));
        });
    }
    return newObj;
};

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

export const random = (min, max) => {
    var Range = max - min;
    var Rand = Math.random();
    var num = min + Math.round(Rand * Range); //四舍五入
    return num;
};
