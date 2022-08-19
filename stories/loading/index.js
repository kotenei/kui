import React from 'react';
import loadingDoc from '../../src/components/loading/README.md';
import Basic from './basic';
import Color from './color';
import Size from './size';
import Tip from './tip';
import Vertical from './vertical';

export default {
    title: 'KUI/Components/loading',
    parameters: {
      docs: {
        page: loadingDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Color/>;
story1.storyName = 'color';

export const story2 = () => <Size/>;
story2.storyName = 'size';

export const story3 = () => <Tip/>;
story3.storyName = 'tip';

export const story4 = () => <Vertical/>;
story4.storyName = 'vertical';

