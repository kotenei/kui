import React, { Component } from 'react';
import classnames from 'classnames';

class ButtonGroup extends Component {
    render() {
        const { className, style } = this.props;
        return (
            <div className={classnames('k-btn-group', className)} style={style}>
                {this.props.children}
            </div>
        )
    }
}

export default ButtonGroup;