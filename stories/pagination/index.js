import React from 'react';
import paginationDoc from '../../src/components/pagination/README.md';
import Basic from './basic';
import Color from './color';
import Size from './size';

export default {
    title: 'KUI/Components/pagination',
    parameters: {
      docs: {
        page: paginationDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Color/>;
story1.storyName = 'color';

export const story2 = () => <Size/>;
story2.storyName = 'size';

