import React from 'react';
import tooltipDoc from '../../src/components/tooltip/README.md';
import Basic from './basic';
import Placement from './placement';

export default {
    title: 'KUI/Components/tooltip',
    parameters: {
      docs: {
        page: tooltipDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Placement/>;
story1.storyName = 'placement';

