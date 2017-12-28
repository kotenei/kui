import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const prefixCls = 'k-switch';

class Switch extends Component {
    constructor(props) {
        super(props);
        let checked = props.defaultChecked;
        if ('checked' in props) {
            checked = props.checked;
        }
        this.state = {
            checked
        }
    }
    static propTypes = {
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        checkedContent: PropTypes.node,
        unCheckedContent: PropTypes.node,
        onChange: PropTypes.func
    }
    static defaultProps = {
        defaultChecked: false,
        disabled: false,
        loading: false
    }
    handleChange = (e) => {
        const { checked } = this.state;
        const { onChange } = this.props;
        let newChecked = !checked;
        if (!('checked' in this.props)) {
            this.setState({
                checked: newChecked
            })
        }
        if (onChange) {
            onChange(newChecked);
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('checked' in nextProps) {
            this.setState({
                checked: nextProps.checked
            });
        }
    }
    renderInner() {
        const { checkedContent, unCheckedContent } = this.props;
        const { checked } = this.state;
        if (checked) {
            return checkedContent;
        } else {
            return unCheckedContent;
        }
    }
    render() {
        const { disabled } = this.props;
        const { checked } = this.state;
        let classString = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-checked`]: checked,
            'disabled': disabled
        })
        return (
            <div className={classString} onClick={this.handleChange}>
                <span className={`${prefixCls}-inner`}>
                    {this.renderInner()}
                </span>
            </div>
        )
    }
}

export default Switch;