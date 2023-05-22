import React from 'react';
import timelineDoc from '../../src/components/timeline/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/timeline',
    parameters: {
      docs: {
        page: timelineDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

