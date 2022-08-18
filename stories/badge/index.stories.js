import React from 'react';
import badgeDoc from '../../src/components/badge/README.md';
import Basic from './basic';
import Dot from './dot';

export default {
    title: 'KUI/Components/badge',
    parameters: {
      docs: {
        page: badgeDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Dot/>;
story1.storyName = 'dot';

