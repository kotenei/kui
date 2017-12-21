import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Divider extends Component {
    static propTypes = {
        component: PropTypes.string
    }
    static defaultProps = {
        component: 'div'
    }
    render() {
        const { component: Container } = this.props;
        return (
            <Container className={classnames({
                'k-divider': true
            })} />
        )
    }
}

export default Divider;