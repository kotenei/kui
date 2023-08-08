export default `import React, { Component } from 'react';
import { Slider } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-slider" style={{ height: 200, paddingTop: 50 }}>
        <Slider defaultValue={10} />
        <br />
        <Slider range defaultValue={[5, 10, 20]} />
        <br />
        <Slider defaultValue={15} disabled tipFormatter={(val) => \`\${val}%\`} />
      </div>
    );
  }
}
`