import React from 'react';
import modalDoc from '../../src/components/modal/README.md';
import Basic from './basic';
import Status from './status';

export default {
    title: 'KUI/Components/modal',
    parameters: {
      docs: {
        page: modalDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Status/>;
story1.storyName = 'status';

