import React from 'react';
import tableDoc from '../../src/components/table/README.md';
import Basic from './basic';

export default {
    title: 'KUI/Components/table',
    parameters: {
      docs: {
        page: tableDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

