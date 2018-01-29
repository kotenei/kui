import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Input from "../Input";
import { kClass, kSize, getClassSet } from "../../utils/kUtils";
import { Sizes } from "../../utils/styleMaps";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const prefixCls = "k-autocomplete";

const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    TAB: 9,
    ENTER: 13
};

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue
        };
    }
    static propTypes = {
        url: PropTypes.string,
        data: PropTypes.array,
        mode: PropTypes.oneOf(["single", "multiple"]),
        highlight: PropTypes.bool,
        max: PropTypes.number,
        placeholder: PropTypes.string,
        value: PropTypes.array,
        defaultValue: PropTypes.array,
        formatItem: PropTypes.func,
        formatResult: PropTypes.func,
        onSelected: PropTypes.func
    };
    static defaultProps = {
        data: [],
        mode: "single",
        highlight: false,
        max: 10,
        defaultValue: [],
        formatItem: item => {
            return item;
        },
        formatResult: item => {
            if (typeof item === "object") {
                return { text: item.text, value: item.value };
            }
            return item;
        }
    };
    getSelectedList() {
        let items = [];

        return items;
    }
    renderContainer() {
        const { mode, placeholder, kSize } = this.props;
        const { value } = this.state;
        if (mode == "single") {
            return (
                <Input type="text" kSize={kSize} placeholder={placeholder} />
            );
        } else {
            let style;
            if (value.length == 0) {
                style={padding:0}
            }
            return (
                <TransitionGroup
                    component="ul"
                    className={`${prefixCls}-choice-list`}
                    style={style}
                >
                    {this.getSelectedList()}
                    <li>
                        <Input
                            type="text"
                            kSize={kSize}
                            className={`${prefixCls}-input`}
                            placeholder={placeholder}
                        />
                    </li>
                </TransitionGroup>
            );
        }
    }
    render() {
        const { mode } = this.props;
        let classes = getClassSet(this.props);
        let classString = classnames(classes, {
            [`${prefixCls}-${mode}`]: true
        });
        return <div className={classString}>{this.renderContainer()}</div>;
    }
}

export default kSize(
    [Sizes.LARGE, Sizes.SMALL],
    kClass(prefixCls, AutoComplete)
);
