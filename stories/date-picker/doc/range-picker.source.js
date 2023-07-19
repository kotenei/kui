export default `import React, { Component } from 'react';
import { RangePicker } from 'kui-react';

export default class Demo extends Component {
  state = {
    val: [new Date('2022-10-1 10:00:00'), new Date('2022-11-1 10:00:00')],
  };
  render() {
    return (
      <div className="story-demo-datepicker">
        <h4>日期选择</h4>
        <RangePicker placeholder="请选择日期" />
        <br />
        <br />
        <h4>日期时间选择</h4>
        <RangePicker showTime format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期时间" />
        <br />
        <br />
        <h4>年选择</h4>
        <RangePicker view="year" format="yyyy" placeholder="请选择年份" />
        <br />
        <br />
        <h4>月选择</h4>
        <RangePicker view="month" format="yyyy-MM" placeholder="请选择月份" />
        <br />
        <br />
        <h4>周选择</h4>
        <RangePicker view="week" format="yyyy-ww 周" placeholder="请选择周" />
      </div>
    );
  }
}
`