import React from 'react';
import lazyloadDoc from '../../src/components/lazyload/README.md';
import Basic from './basic';

export default {
    title: 'KUI/Components/lazyload',
    parameters: {
      docs: {
        page: lazyloadDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

