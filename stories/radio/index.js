import React from 'react';
import radioDoc from '../../src/components/radio/README.md';
import Basic from './basic';
import Color from './color';
import Group from './group';

export default {
    title: 'KUI/Components/radio',
    parameters: {
      docs: {
        page: radioDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Color/>;
story1.storyName = 'color';

export const story2 = () => <Group/>;
story2.storyName = 'group';

