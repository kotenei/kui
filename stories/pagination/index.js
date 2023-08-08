import React from 'react';
import paginationDoc from '../../src/components/pagination/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Color from './color';
import ColorSource from './doc/color.source';
import Size from './size';
import SizeSource from './doc/size.source';

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
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Color/>;
story1.storyName = 'color';
story1.parameters = { storySource: { source: ColorSource } };

export const story2 = () => <Size/>;
story2.storyName = 'size';
story2.parameters = { storySource: { source: SizeSource } };

