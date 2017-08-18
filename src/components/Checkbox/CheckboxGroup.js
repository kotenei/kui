import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Checkbox from './Checkbox';
import shallowEqual from 'shallowequal';

class CheckboxGroup extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            value: props.value || props.defaultValue || [],
        };
    }
    static propTypes = {
        name: PropTypes.string,           //选项name
        inline: PropTypes.bool,             //行内模式
        options: PropTypes.array,         //可选项
        value: PropTypes.array,            //选中的选项
        defaultValue: PropTypes.array,       //默认选中项
        onChange: PropTypes.func
    }
    static defaultProps = {
        inline: true,
        options: [],
        onChange: () => { }
    }
    handleToggle(e, option) {
        const { onChange } = this.props;
        const optionIndex = this.state.value.indexOf(option.value);
        const value = [...this.state.value];
        if (optionIndex === - 1) {
            value.push(option.value);
        } else {
            value.splice(optionIndex, 1);
        }
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        onChange(value);
    }
    getOptions() {
        let self = this;
        let ret = [];
        const { options, name, inline } = this.props;
        const { value } = this.state;
        options.forEach((option, index) => {
            if (typeof option === 'string') {
                ret.push({
                    name,
                    text: option,
                    value: option,
                    inline,
                    checked: value.indexOf(option) != -1
                })
            } else {
                ret.push(option);
            }
        });

        return ret;
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value || [],
            });
        }
    }
    render() {
        const { options } = this.props;
        let children = this.props.children;
        if (options && options.length > 0) {
            children = this.getOptions().map(option => (
                <Checkbox
                    key={option.value}
                    disabled={option.disabled}
                    checked={option.checked}
                    value={option.value}
                    inline={option.inline}
                    option={option}
                    onChange={this.handleToggle}>
                    {option.text}
                </Checkbox>
            ));
        }
        return (
            <div className="k-checkbox-group">
                {children}
            </div>
        )
    }
}

export default CheckboxGroup;