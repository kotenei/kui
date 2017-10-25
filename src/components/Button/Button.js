import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import classnames from 'classnames';
import { kStyles, kClass, kSize, getClassSet } from '../../utils/kUtils';
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
    render() {
        const { icon } = this.props;
        let classes = getClassSet(this.props);
        classes.disabled = this.props.disabled;
        classes = classnames(classes, { 'k-btn-raised': this.props.raised, 'k-btn-fab': this.props.fab });
        return (
            <button {...this.props}
                type={this.props.type}
                className={classnames(classes, this.props.className)}
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