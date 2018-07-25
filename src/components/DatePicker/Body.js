import React from "react";

export default props => {
    return <div className={`${props.prefixCls}-body`}>{props.children}</div>;
};
