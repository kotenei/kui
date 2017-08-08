import React, { Component, PropTypes } from 'react';
import Checkbox from '../components/Checkbox';

let CheckboxGroup = Checkbox.CheckboxGroup;

const options = ['one', 'two'];
const value = ['one'];

class CheckboxView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            disabled: false
        }
    }
    componentDidMount() {
        setTimeout(function () {
            // this.setState({
            //     //checked: false,
            //     disabled: true
            // })
            // setTimeout(() => {
            //     this.setState({
            //         checked: true
            //     })
            // }, 1000)
        }.bind(this), 1000);
    }
    render() {
        return (
            <div>
                <h1>Checkbox 多选框</h1>
                <div className="k-example">
                    {/* <CheckboxGroup
                        options={options}
                        value={value}
                        inline={false}
                        onChange={(value) => {
                            //console.log(value)
                        }} /> */}
                    <Checkbox>测试</Checkbox>
                </div>
            </div>
        )
    }
}

export default CheckboxView;