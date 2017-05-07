import React from 'react';
import classnames from 'classnames';
import { kStyles, kClass, kSize, prefix, getClassSet } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY, Sizes } from '../../utils/styleMaps';

const types = ['button', 'reset', 'submit'];

class Button extends React.Component {
    static propTypes = {
        disabled: React.PropTypes.bool,
        type: React.PropTypes.oneOf(types)
    }
    static defaultProps = {
        disabled: false,
        type: 'button'
    }
    render() {
        let classes = getClassSet(this.props);
        classes.disabled = this.props.disabled;
        return (
            <button {...this.props}
                type={this.props.type}
                className={classnames(classes, this.props.className)}
            >{this.props.children}</button>
        )
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(styles, DEFAULT,
    kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
        kClass('k-btn', Button)
    )
);