import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { kStyles, kClass, kSize, prefix, getClassSet } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY, Sizes } from '../../utils/styleMaps';

class Tag extends Component {
    static propTypes = {

    }
    static defaultProps = {

    }
    render() {
        let classString = getClassSet(this.props);
        return (
            <span className={classString} ></span>
        )
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(styles, DEFAULT,
    kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
        kClass('k-tag', Tag)
    )
);