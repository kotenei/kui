import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { kStyles, kClass, kSize,getClassSet } from '../../utils/kUtils';
import { State, DEFAULT, PRIMARY } from '../../utils/styleMaps';
import classnames from 'classnames';

class Breadcrumb extends Component {
    render() {
        let classes = getClassSet(this.props);
        return (
            <ul className={classnames(classes)}>
                {this.props.children}
            </ul>
        )
    }
}

const styles = State.values().concat(DEFAULT, PRIMARY);

export default kStyles(styles,
    kClass('k-breadcrumb', Breadcrumb)
);
