import React from 'react';
import maskDoc from '../../src/components/mask/README.md';
import Basic from './basic';

export default {
    title: 'KUI/Components/mask',
    parameters: {
      docs: {
        page: maskDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

