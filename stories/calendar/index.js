import React from 'react';
import calendarDoc from '../../src/components/calendar/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/calendar',
    parameters: {
      docs: {
        page: calendarDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

