import React from 'react';
import selectDoc from '../../src/components/select/README.md';
import Basic from './basic';

export default {
    title: 'KUI/Components/select',
    parameters: {
      docs: {
        page: selectDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

