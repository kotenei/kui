import React from 'react';
import dividerDoc from '../../src/components/divider/README.md';
import Basic from './basic';
import Color from './color';
import Vertical from './vertical';

export default {
    title: 'KUI/Components/divider',
    parameters: {
      docs: {
        page: dividerDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Color/>;
story1.storyName = 'color';

export const story2 = () => <Vertical/>;
story2.storyName = 'vertical';

