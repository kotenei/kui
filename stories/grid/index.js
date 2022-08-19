import React from 'react';
import gridDoc from '../../src/components/grid/README.md';
import Basic from './basic';
import Flexalign from './flex-align';
import Flex from './flex';
import Gutter from './gutter';
import Offset from './offset';

export default {
    title: 'KUI/Components/grid',
    parameters: {
      docs: {
        page: gridDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Flexalign/>;
story1.storyName = 'flex-align';

export const story2 = () => <Flex/>;
story2.storyName = 'flex';

export const story3 = () => <Gutter/>;
story3.storyName = 'gutter';

export const story4 = () => <Offset/>;
story4.storyName = 'offset';

