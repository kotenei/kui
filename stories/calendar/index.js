import React from 'react';
import calendarDoc from '../../src/components/calendar/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import View from './view';
import ViewSource from './doc/view.source';

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

export const story1 = () => <View/>;
story1.storyName = 'view';
story1.parameters = { storySource: { source: ViewSource } };

