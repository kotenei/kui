import React from 'react';
import validationmsgDoc from '../../src/components/validation-msg/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/validation-msg',
    parameters: {
      docs: {
        page: validationmsgDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

