import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { kStyles, kClass, kSize, getClassSet } from '../../utils/kUtils';
import { State, PRIMARY, Sizes } from '../../utils/styleMaps';

class Badge extends Component {
    static propTypes = {

    }
    static defaultProps = {

    }
    render() {
        let classes = getClassSet(this.props);
        return (
            <span className={classnames(classes)}></span>
        )
    }
}

const styles = State.values().concat(PRIMARY);

export default kStyles(styles,
    kClass('k-badge', Badge)
);
