import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import classnames from 'classnames';
import { kStyles, kClass, kSize, prefix, getClassSet } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY, Sizes } from '../../utils/styleMaps';

const types = ['button', 'reset', 'submit'];

class Button extends Component {
    static propTypes = {
        icon: PropTypes.string,
        disabled: PropTypes.bool,
        type: PropTypes.oneOf(types),
        raised: PropTypes.bool,
        fab: PropTypes.bool
    }
    static defaultProps = {
        disabled: false,
        type: 'button'
    }
    renderIcon() {
        //const
    }
    render() {
        const { icon } = this.props;
        let classString = getClassSet(this.props);
        classString.disabled = this.props.disabled;
        classString = classnames(classString, { 'k-btn-raised': this.props.raised, 'k-btn-fab': this.props.fab });
        return (
            <button {...this.props}
                type={this.props.type}
                className={classnames(classString, this.props.className)}
            >
                {icon ? <Icon type={icon} /> : null}
                {this.props.children}
            </button>
        )
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(styles, DEFAULT,
    kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
        kClass('k-btn', Button)
    )
);