import React from "react";

export default props => {
    let hasChildren = false;
    React.Children.map(props.children, child => {
        if (child) {
            hasChildren = true;
        }
    });
    return hasChildren ? (
        <div className={`${props.prefixCls}-footer`}>{props.children}</div>
    ) : null;
};
