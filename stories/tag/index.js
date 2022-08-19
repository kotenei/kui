import React from 'react';
import tagDoc from '../../src/components/tag/README.md';
import Basic from './basic';
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

export const story1 = () => <Line/>;
story1.storyName = 'line';

