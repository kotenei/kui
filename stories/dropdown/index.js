import React from 'react';
import dropdownDoc from '../../src/components/dropdown/README.md';
import Basic from './basic';
import Placement from './placement';

export default {
    title: 'KUI/Components/dropdown',
    parameters: {
      docs: {
        page: dropdownDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Placement/>;
story1.storyName = 'placement';

