import React from 'react';
import checkboxDoc from '../../src/components/checkbox/README.md';
import Basic from './basic';
import Color from './color';
import Group from './group';

export default {
    title: 'KUI/Components/checkbox',
    parameters: {
      docs: {
        page: checkboxDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Color/>;
story1.storyName = 'color';

export const story2 = () => <Group/>;
story2.storyName = 'group';

