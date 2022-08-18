import React from 'react';
import rateDoc from '../../src/components/rate/README.md';
import Basic from './basic';
import Character from './character';
import Disabled from './disabled';
import Half from './half';

export default {
    title: 'KUI/Components/rate',
    parameters: {
      docs: {
        page: rateDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Character/>;
story1.storyName = 'character';

export const story2 = () => <Disabled/>;
story2.storyName = 'disabled';

export const story3 = () => <Half/>;
story3.storyName = 'half';

