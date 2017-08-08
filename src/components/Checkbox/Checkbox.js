import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shallowEqual from 'shallowequal';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            checked: props.checked,
            value: props.value
        }
    }
    static propTypes = {
        disabled: PropTypes.bool,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        inline: PropTypes.bool,
        mode: PropTypes.oneOf(['normal', 'material', 'toggle']),
        name: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func
    }
    static defaultProps = {
        inline: false,
        mode: 'material',
        onChange: () => { }
    }
    handleChange(e) {
        const { onChange } = this.props;
        onChange(e);
    }
    renderMode() {
        const { mode } = this.props;
        switch (mode) {
            case 'material':
                return this.renderMaterial();
            case 'toggle':
                return this.renderToggle();
            default:
                return null;
        }
    }
    renderMaterial() {
        return (
            <span className="material">
                <span className="check"></span>
            </span>
        )
    }
    renderToggle() {
        return (
            <span className="toggle"></span>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.checked
        });
    }
    render() {
        const { defaultChecked, disabled, children, mode, name, inline } = this.props;
        const { checked, value } = this.state;
        let prefixCls = 'k-checkbox';
        let classString = classnames({
            [prefixCls]: true,
            [`${prefixCls}-material`]: mode == 'material',
            [`${prefixCls}-toggle`]: mode == 'toggle',
            [`${prefixCls}-inline`]: inline,
            'disabled': disabled
        });
        return (
            <div className={classString}>
                <label>
                    <input type="checkbox"
                        name={name}
                        value={value}
                        disabled={disabled}
                        defaultChecked={checked}
                        checked={checked}
                        onChange={this.handleChange} />
                    {this.renderMode()}
                    <span>{children}</span>
                </label>
            </div>
        )
    }
}

export default Checkbox;