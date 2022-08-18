import React from 'react';
import popoverDoc from '../../src/components/popover/README.md';
import Basic from './basic';
import Placement from './placement';

export default {
    title: 'KUI/Components/popover',
    parameters: {
      docs: {
        page: popoverDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Placement/>;
story1.storyName = 'placement';

