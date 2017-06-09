import React, { Component, PropTypes } from 'react';
import Timeline from '../components/Timeline';

class TimelineView extends Component {
    render() {
        return (
            <div>
                <h1>Timeline 时间轴</h1>
                <div className="k-example">
                    <Timeline>
                        <Timeline.Item>
                            2015 
                        </Timeline.Item>
                        <Timeline.Item>
                            2016 
                        </Timeline.Item>
                        <Timeline.Item>
                            2017 
                        </Timeline.Item>
                    </Timeline>
                </div>
            </div>
                    )
    }
}

export default TimelineView;