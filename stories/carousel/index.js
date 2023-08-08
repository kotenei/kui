import React from 'react';
import carouselDoc from '../../src/components/carousel/README.md';
import Autoplay from './autoplay';
import AutoplaySource from './doc/autoplay.source';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Vertical from './vertical';
import VerticalSource from './doc/vertical.source';

export default {
    title: 'KUI/Components/carousel',
    parameters: {
      docs: {
        page: carouselDoc,
      },
    },
  };

export const story0 = () => <Autoplay/>;
story0.storyName = 'autoplay';
story0.parameters = { storySource: { source: AutoplaySource } };

export const story1 = () => <Basic/>;
story1.storyName = 'basic';
story1.parameters = { storySource: { source: BasicSource } };

export const story2 = () => <Vertical/>;
story2.storyName = 'vertical';
story2.parameters = { storySource: { source: VerticalSource } };

