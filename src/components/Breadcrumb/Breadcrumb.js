import React, { Component, PropTypes } from 'react';
import { kStyles, kClass, kSize,getClassSet } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY } from '../../utils/styleMaps';
import classnames from 'classnames';

class Breadcrumb extends Component {
    render() {
        let classString = getClassSet(this.props);
        return (
            <ul className={classnames(classString)}>
                {this.props.children}
            </ul>
        )
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(styles,
    kClass('k-breadcrumb', Breadcrumb)
);
