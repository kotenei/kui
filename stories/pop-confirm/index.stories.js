import React from 'react';
import popconfirmDoc from '../../src/components/pop-confirm/README.md';
import Basic from './basic';
import Placement from './placement';

export default {
    title: 'KUI/Components/pop-confirm',
    parameters: {
      docs: {
        page: popconfirmDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Placement/>;
story1.storyName = 'placement';

