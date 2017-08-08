import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Checkbox from './Checkbox';

class CheckboxGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || [],
        };
    }
    static propTypes = {
        name: PropTypes.string,           //选项name
        inline: PropTypes.bool,             //行内模式
        options: PropTypes.array,         //可选项
        value: PropTypes.array,            //选中的选项
        onChange: PropTypes.func
    }
    static defaultProps = {
        inline: true,
        options: [],
        value: [],
        onChange: () => { }
    }
    toggle(option) {
        const { onChange } = this.props;
        const optionIndex = this.state.value.indexOf(option.value);
        const value = [...this.state.value];
        if (optionIndex === - 1) {
            value.push(option.value);
        } else {
            value.splice(optionIndex, 1);
        }
        this.setState({
            value
        })
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
                    onChange={() => { this.toggle(option) }}>
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