import React from 'react';
import collapseDoc from '../../src/components/collapse/README.md';
import Accordion from './accordion';
import Basic from './basic';

export default {
    title: 'KUI/Components/collapse',
    parameters: {
      docs: {
        page: collapseDoc,
      },
    },
  };

export const story0 = () => <Accordion/>;
story0.storyName = 'accordion';

export const story1 = () => <Basic/>;
story1.storyName = 'basic';

