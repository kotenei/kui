import React, { Component } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { Timeline, TimelineItem, Icon } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-timeline">
        <Timeline>
          <TimelineItem>2012</TimelineItem>
          <TimelineItem color="info">2013</TimelineItem>
          <TimelineItem color="success">2014</TimelineItem>
          <TimelineItem color="warning">2015</TimelineItem>
          <TimelineItem
            color="danger"
            dot={
              <Icon fontSize={16}>
                <AiOutlineClockCircle />
              </Icon>
            }
          >
            2016
          </TimelineItem>
        </Timeline>
      </div>
    );
  }
}
