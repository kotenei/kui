import React from "react";

export default props => {
    return props.children ? (
        <div className={`${props.prefixCls}-footer`}>{props.children}</div>
    ) : null;
};
