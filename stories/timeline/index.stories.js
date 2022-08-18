import React from 'react';
import timelineDoc from '../../src/components/timeline/README.md';
import Basic from './basic';

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

