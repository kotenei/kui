import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { kClass, kSize, getClassSet } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import Step from "./Step";

const prefixCls = "k-steps";

class Steps extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        current: PropTypes.number,
        alignCenter: PropTypes.bool,
        direction: PropTypes.oneOf(["horizontal", "vertical"]),
        status: PropTypes.oneOf(["wait", "process", "finish", "error"])
    };
    static defaultProps = {
        current: 0,
        alignCenter: false,
        direction: "horizontal"
    };
    renderSteps() {
        const { children, status, current } = this.props;
        let items = [],
            nextErrs = [];

        React.Children.forEach(children, (child, index) => {
            if (!child || !child.type || child.type.displayName != "Step") {
                return;
            }
            const childStatus = child.props.status;
            let newStatus = "wait";
            if (index < current) {
                newStatus = "finish";
            }
            if (index == current) {
                newStatus = "process";
            }
            if (status && index == current) {
                newStatus = status;
            }
            if (status == "error" && current == index && index > 0) {
                nextErrs.push(index - 1);
            }
            newStatus = childStatus ? childStatus : newStatus;
            items.push(
                React.cloneElement(child, {
                    key: index,
                    prefixCls,
                    current,
                    index,
                    ...child.props,
                    status: newStatus
                })
            );
        });

        if (nextErrs.length > 0) {
            nextErrs.forEach(index => {
                let child = items[index];
                items[index] = React.cloneElement(child, {
                    ...child.props,
                    isNextError: true
                });
            });
        }

        return items;
    }
    render() {
        const { direction, alignCenter } = this.props;
        let classString = getClassSet(this.props);
        classString = classnames(classString, {
            [`${prefixCls}-${direction}`]: true,
            [`${prefixCls}-center`]: alignCenter && direction != "vertical"
        });
        return <div className={classString}>{this.renderSteps()}</div>;
    }
}

export default kSize([Sizes.SMALL], kClass(prefixCls, Steps));
