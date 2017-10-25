import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Timeline extends Component {
    static propTypes = {
        
    }
    static defaultProps = {

    }
    render() {
        return (
            <ul className="k-timeline">
                {this.props.children}
            </ul>
        )
    }
}

export default Timeline;