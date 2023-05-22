import React from 'react';
import timepickerDoc from '../../src/components/time-picker/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/time-picker',
    parameters: {
      docs: {
        page: timepickerDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

