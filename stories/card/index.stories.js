import React from 'react';
import cardDoc from '../../src/components/card/README.md';
import Actions from './actions';
import Basic from './basic';
import Cover from './cover';
import Noborder from './no-border';

export default {
    title: 'KUI/Components/card',
    parameters: {
      docs: {
        page: cardDoc,
      },
    },
  };

export const story0 = () => <Actions/>;
story0.storyName = 'actions';

export const story1 = () => <Basic/>;
story1.storyName = 'basic';

export const story2 = () => <Cover/>;
story2.storyName = 'cover';

export const story3 = () => <Noborder/>;
story3.storyName = 'no-border';

