import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { kStyles, kClass, kSize, prefix, getClassSet } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY, Sizes } from '../../utils/styleMaps';

class Tag extends Component {
    static propTypes = {
        closable: PropTypes.bool,
        onClose: PropTypes.func
    }
    static defaultProps = {
        closable: false,
        onClose: () => { }
    }
    render() {
        let classString = getClassSet(this.props);
        return (
            <div className={classnames(classString)} ></div>
        )
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(styles, DEFAULT,
    kSize([Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
        kClass('k-tag', Tag)
    )
);