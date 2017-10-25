import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { kStyles, kClass, kSize, getClassSet } from '../../utils/kUtils';
import { State, PRIMARY, Sizes } from '../../utils/styleMaps';

class Badge extends Component {
    static propTypes = {
        count: PropTypes.number,
        dot: PropTypes.bool,
        overflowCount: PropTypes.number
    }
    static defaultProps = {
        count: 0,
        dot: false,
        overflowCount: 99
    }
    renderCount() {
        const { count, dot, overflowCount } = this.props;
        let number = count;
        if (count <= 0 && !dot) {
            return null;
        }
        if (dot) {
            return <sup className="k-badge-dot"></sup>;
        }
        if (count > overflowCount) {
            number = overflowCount + '+';
        }
        return <sup className="k-badge-count">{number}</sup>

    }
    render() {
        const { count, children } = this.props;
        let classes = getClassSet(this.props);
        if (!children) {
            classes['k-badge-not-wrap'] = true;
        }
        return (
            <span className={classnames(classes)}>
                {children}
                {this.renderCount()}
            </span>
        )
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(styles,
    kClass('k-badge', Badge)
);
