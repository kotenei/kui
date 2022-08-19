import React from 'react';
import carouselDoc from '../../src/components/carousel/README.md';
import Autoplay from './autoplay';
import Basic from './basic';
import Vertical from './vertical';

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

export const story1 = () => <Basic/>;
story1.storyName = 'basic';

export const story2 = () => <Vertical/>;
story2.storyName = 'vertical';

