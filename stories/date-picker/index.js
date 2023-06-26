import React from 'react';
import datepickerDoc from '../../src/components/date-picker/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/date-picker',
    parameters: {
      docs: {
        page: datepickerDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

