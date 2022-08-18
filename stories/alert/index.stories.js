import React from 'react';
import alertDoc from '../../src/components/alert/README.md';
import Basic from './basic';

export default {
    title: 'KUI/Components/alert',
    parameters: {
      docs: {
        page: alertDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

