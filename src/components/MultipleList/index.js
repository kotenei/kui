import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Input from "../Input";
import { getClassSet, kClass, kSize } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import Icon from "../Icon";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const prefixCls = "k-multiple-list";

class MultipleList extends Component {
    static propTypes = {
        ref: PropTypes.string,
        value: PropTypes.array,
        showInput: PropTypes.bool,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onItemRemove: PropTypes.func
    };
    static defaultProps = {
        value: [],
        showInput: false
    };
    handleClick = e => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(e);
        }
    };
    handleFocus = e => {
        const { onFocus } = this.props;
        if (onFocus) {
            onFocus(e);
        }
    };
    handleBlur = e => {};
    handleItemRemove = (item, e) => {
        const { onItemRemove } = this.props;
        if (onItemRemove) {
            onItemRemove(e, item);
        }
    };
    renderList() {
        const { value, showInput, kSize, placeholder } = this.props;
        let items = [];
        value.forEach((v, i) => {
            let item = v;
            if (typeof v === "string") {
                item = { text: v, value: v };
            }
            items.push(
                <CSSTransition timeout={300} classNames="fade">
                    <li className="item" title={item.text}>
                        <div className={`${prefixCls}-choice-content`}>
                            {item.text}
                        </div>
                        <Icon
                            type="close"
                            onClick={this.handleItemRemove.bind(this, item)}
                        />
                    </li>
                </CSSTransition>
            );
        });

        if (showInput) {
            items.push(
                <li>
                    <Input
                        type="text"
                        kSize={kSize}
                        placeholder={placeholder}
                    />
                </li>
            );
        }

        return (
            <TransitionGroup
                component="ul"
                className={`${prefixCls}-choice-list`}
            >
                {items}
            </TransitionGroup>
        );
    }
    render() {
        const { trigger, className, showInput } = this.props;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, className);
        return (
            <div className={classString}>
                <div className={`${prefixCls}-selection`} trigger={trigger}>
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default kSize(
    [Sizes.LARGE, Sizes.SMALL],
    kClass(prefixCls, MultipleList)
);
