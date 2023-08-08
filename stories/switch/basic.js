import React, { Component } from 'react';
import { Switch } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-switch">
        Basic
        <br /> <br />
        <Switch />
        <br />
        <br /> <br />
        Disabled
        <br /> <br />
        <Switch disabled />
        <br />
        <br />
        <br />
        Font
        <br /> <br />
        <Switch checkedContent="开" unCheckedContent="关" />
      </div>
    );
  }
}
