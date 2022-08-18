import React from 'react';
import tagDoc from '../../src/components/tag/README.md';
import Basic from './basic';
import Index.stories from './index.stories';
import Line from './line';

export default {
    title: 'KUI/Components/tag',
    parameters: {
      docs: {
        page: tagDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Index.stories/>;
story1.storyName = 'index.stories';

export const story2 = () => <Line/>;
story2.storyName = 'line';

