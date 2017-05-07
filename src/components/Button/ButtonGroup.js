import React from 'react';

class ButtonGroup extends React.Component {
    render() {
        return (
            <div className="k-btn-group">
                {this.props.children}
            </div>
        )
    }
}

export default ButtonGroup;