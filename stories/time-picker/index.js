import React from 'react';
import timepickerDoc from '../../src/components/time-picker/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Steps from './steps';
import StepsSource from './doc/steps.source';

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

export const story1 = () => <Steps/>;
story1.storyName = 'steps';
story1.parameters = { storySource: { source: StepsSource } };

