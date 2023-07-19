import React, { Component } from 'react';
import { RangePicker } from 'kui-react';

export default class Demo extends Component {
  state = {
    val: [new Date('2022-10-1 10:00:00'), new Date('2022-11-1 10:00:00')],
  };
  render() {
    return (
      <div className="story-demo-datepicker" style={{ width: 500 }}>
        <h4>日期范围选择</h4>
        <RangePicker placeholder="请选择日期" />
        <br />
        <br />
        <h4>日期时间范围选择</h4>
        <RangePicker
          showTime
          startPlaceholder="开始日期时间"
          endPlaceholder="结束日期时间"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择日期时间"
        />
        <br />
        <br />
        <h4>年范围选择</h4>
        <RangePicker
          view="year"
          startPlaceholder="开始年份"
          endPlaceholder="结束年份"
          format="yyyy"
          placeholder="请选择年份"
        />
        <br />
        <br />
        <h4>月范围选择</h4>
        <RangePicker
          view="month"
          startPlaceholder="开始月份"
          endPlaceholder="结束月份"
          format="yyyy-MM"
          placeholder="请选择月份"
        />
        <br />
        <br />
        <h4>周范围选择</h4>
        <RangePicker
          view="week"
          startPlaceholder="开始周"
          endPlaceholder="结束周"
          format="yyyy-ww 周"
          placeholder="请选择周"
        />
      </div>
    );
  }
}
