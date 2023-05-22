import React from 'react';
import messageDoc from '../../src/components/message/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/message',
    parameters: {
      docs: {
        page: messageDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

