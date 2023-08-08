import React from 'react';
import datepickerDoc from '../../src/components/date-picker/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Rangepicker from './range-picker';
import RangepickerSource from './doc/range-picker.source';

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

export const story1 = () => <Rangepicker/>;
story1.storyName = 'range-picker';
story1.parameters = { storySource: { source: RangepickerSource } };

