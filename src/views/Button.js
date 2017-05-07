import React from 'react';
import Button from '../components/Button';

class ButtonView extends React.Component{
    render(){
        return(
            <div>
                <h1>Button 按钮</h1>
                <h3>Flat Button</h3>
                <div className="k-example">
                    <Button >default</Button>&nbsp;&nbsp;
                    <Button kmStyle="primary">primary</Button>&nbsp;&nbsp;
                    <Button kmStyle="info">info</Button>&nbsp;&nbsp;
                    <Button kmStyle="success">success</Button>&nbsp;&nbsp;
                    <Button kmStyle="warning">warning</Button>&nbsp;&nbsp;
                    <Button kmStyle="danger">danger</Button>&nbsp;&nbsp;
                    <Button disabled="true">disabled</Button>
                </div>
                <div className="k-codebox"></div>
                
            </div>
        )
    }
}

export default ButtonView;