import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Radio from './Radio';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        let value;
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            value = this.getCheckedValue(props.children);
        }
        this.state = {
            value
        };
    }
    static propTypes = {
        name: PropTypes.string,
        inline: PropTypes.bool,
        options: PropTypes.array,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func
    }
    static defaultProps = {
        inline: true,
        options: [],
        onChange: () => { }
    }
    static childContextTypes = {
        radioGroup: PropTypes.any,
    }
    getChildContext() {
        return {
            radioGroup: {
                name: this.props.name,
                value: this.state.value,
                disabled: this.props.disabled,
                inline: this.props.inline,
                onChange: this.handleChange
            }
        };
    }
    handleChange(e, option) {
        const { onChange } = this.props;
        const { value } = e.target;
        if (!('value' in this.props)) {
            this.setState({
                value,
            });
        }
        onChange(value);
    }
    getCheckedValue(children) {
        let value = null;
        let matched = false;
        React.Children.forEach(children, (radio = any) => {
            if (radio && radio.props && radio.props.checked) {
                value = radio.props.value;
                matched = true;
            }
        });
        return matched ? value : undefined;
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
                    checked: value == option
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
                value: nextProps.value,
            });
        } else {
            const checkedValue = getCheckedValue(nextProps.children);
            if (checkedValue) {
                this.setState({
                    value: checkedValue
                });
            }
        }
    }
    render() {
        const { options } = this.props;
        let children = this.props.children;
        if (options && options.length > 0) {
            children = this.getOptions().map(option => (
                <Radio
                    name={option.name}
                    key={option.value}
                    disabled={option.disabled}
                    checked={option.checked}
                    value={option.value}
                    inline={option.inline}
                    option={option}
                    onChange={this.handleChange}>
                    {option.text}
                </Radio>
            ));
        }
        return (
            <div className="k-checkbox-group">
                {children}
            </div>
        )
    }
}

export default RadioGroup;