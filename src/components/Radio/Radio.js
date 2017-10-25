import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Radio extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
    }
    static propTypes = {
        option: PropTypes.object,
        inline: PropTypes.bool,
        disabled: PropTypes.bool,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        mode: PropTypes.oneOf(['none', 'normal']),
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    }
    static defaultProps = {
        inline: false,
        mode: 'normal',
        onChange: () => { }
    }
    static contextTypes = {
        radioGroup: PropTypes.any
    }
    handleChange(e) {
        const { onChange, option } = this.props;
        onChange(e, option);
    }
    renderMaterinal() {
        return (
            <span className="material">
                <span className="check"></span>
            </span>
        )
    }
    render() {
        const { radioGroup } = this.context;
        let radioProps = { ...this.props };
        if (radioGroup) {
            radioProps.name = radioGroup.name;
            radioProps.inline = radioGroup.inline;
            radioProps.checked = this.props.value == radioGroup.value;
            radioProps.disabled = this.props.disabled || radioGroup.disabled;
            radioProps.onChange = (e) => radioGroup.onChange(e, { text: radioProps.children, value: radioProps.value });
        }
        const { children, inline, mode, disabled, name, checked, value } = radioProps;
       
        let prefixCls = 'k-radio';
        let classString = classnames({
            [prefixCls]: true,
            [`${prefixCls}-material`]: mode == 'material',
            [`${prefixCls}-inline`]: inline,
            'disabled': disabled
        });
        return (
            <div className={classString}>
                <label>
                    <input
                        type="radio"
                        name={name}
                        disabled={disabled}
                        defaultChecked={checked}
                        checked={checked}
                        value={value}
                        onChange={radioProps.onChange || this.handleChange} />
                    {mode == 'normal' ? this.renderMaterinal() : null}
                    <span>{children}</span>
                </label>
            </div>
        )
    }
}

export default Radio;