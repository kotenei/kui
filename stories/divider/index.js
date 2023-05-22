import React from 'react';
import dividerDoc from '../../src/components/divider/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Color from './color';
import ColorSource from './doc/color.source';
import Vertical from './vertical';
import VerticalSource from './doc/vertical.source';

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
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Color/>;
story1.storyName = 'color';
story1.parameters = { storySource: { source: ColorSource } };

export const story2 = () => <Vertical/>;
story2.storyName = 'vertical';
story2.parameters = { storySource: { source: VerticalSource } };

