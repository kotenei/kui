import React from 'react';
import tooltipDoc from '../../src/components/tooltip/README.md';
import Basic from './basic';
import Index.stories from './index.stories';
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

export const story1 = () => <Index.stories/>;
story1.storyName = 'index.stories';

export const story2 = () => <Placement/>;
story2.storyName = 'placement';

