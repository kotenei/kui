import React from 'react';
import avatarDoc from '../../src/components/avatar/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Size from './size';
import SizeSource from './doc/size.source';
import Square from './square';
import SquareSource from './doc/square.source';

export default {
    title: 'KUI/Components/avatar',
    parameters: {
      docs: {
        page: avatarDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Size/>;
story1.storyName = 'size';
story1.parameters = { storySource: { source: SizeSource } };

export const story2 = () => <Square/>;
story2.storyName = 'square';
story2.parameters = { storySource: { source: SquareSource } };

