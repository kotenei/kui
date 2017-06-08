import React, { Component, PropTypes } from 'react';
import Alert from '../components/Alert';

class AlertView extends Component {
    render() {
        return (
            <div>
                <h1>Alert 警告</h1>
                <div className="k-example">
                    <Alert ></Alert>
                </div>
            </div>
        )
    }
}

export default AlertView;