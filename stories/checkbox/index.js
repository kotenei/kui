import React from 'react';
import checkboxDoc from '../../src/components/checkbox/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Color from './color';
import ColorSource from './doc/color.source';
import Group from './group';
import GroupSource from './doc/group.source';

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
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Color/>;
story1.storyName = 'color';
story1.parameters = { storySource: { source: ColorSource } };

export const story2 = () => <Group/>;
story2.storyName = 'group';
story2.parameters = { storySource: { source: GroupSource } };

