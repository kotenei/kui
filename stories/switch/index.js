import React from 'react';
import switchDoc from '../../src/components/switch/README.md';
import Basic from './basic';

export default {
    title: 'KUI/Components/switch',
    parameters: {
      docs: {
        page: switchDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

