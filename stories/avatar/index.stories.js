import React from 'react';
import avatarDoc from '../../src/components/avatar/README.md';
import Basic from './basic';
import Size from './size';
import Square from './square';

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

export const story1 = () => <Size/>;
story1.storyName = 'size';

export const story2 = () => <Square/>;
story2.storyName = 'square';

