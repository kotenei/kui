export default `import React, { Component } from 'react';
import { Select, SelectOption } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-select">
        <Select placeholder="哈哈" size="sm">
          <SelectOption value="选项一" >
            选项一
          </SelectOption>
          <SelectOption value="选项二" >选项二</SelectOption>
          <SelectOption value="选项三" >选项三</SelectOption>
        </Select>
        <br />
        <br />
        <Select placeholder="哈哈" multiple>
          <SelectOption value="选项一">选项一</SelectOption>
          <SelectOption value="选项二">选项二</SelectOption>
          <SelectOption value="选项三">选项三</SelectOption>
          <SelectOption value="选项四">选项四</SelectOption>
          <SelectOption value="选项五">选项五</SelectOption>
          <SelectOption value="选项六">选项六</SelectOption>
          <SelectOption value="选项七">选项七</SelectOption>
          <SelectOption value="选项八">选项八</SelectOption>
          <SelectOption value="选项九">选项九</SelectOption>
          <SelectOption value="选项十">选项十</SelectOption>
        </Select>
        <br />
        <br />
        <Select placeholder="哈哈" multiple size="lg">
          <SelectOption value="选项一">选项一</SelectOption>
          <SelectOption value="选项二">选项二</SelectOption>
          <SelectOption value="选项三">选项三</SelectOption>
        </Select>
      </div>
    );
  }
}
`