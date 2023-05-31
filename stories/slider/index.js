import React from 'react';
import sliderDoc from '../../src/components/slider/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Marks from './marks';
import MarksSource from './doc/marks.source';
import Vertical from './vertical';
import VerticalSource from './doc/vertical.source';

export default {
    title: 'KUI/Components/slider',
    parameters: {
      docs: {
        page: sliderDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Marks/>;
story1.storyName = 'marks';
story1.parameters = { storySource: { source: MarksSource } };

export const story2 = () => <Vertical/>;
story2.storyName = 'vertical';
story2.parameters = { storySource: { source: VerticalSource } };

