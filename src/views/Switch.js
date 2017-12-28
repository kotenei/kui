import React, { Component } from 'react';
import Switch from '../components/Switch';

class SwitchView extends Component {
    render() {
        return (
            <div>
                <h1>Switch 开关</h1>
                <div className="k-example">
                    <Switch/>
                </div>
            </div>
        )
    }
}

export default SwitchView;