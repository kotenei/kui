import React from 'react';
import treeDoc from '../../src/components/tree/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/tree',
    parameters: {
      docs: {
        page: treeDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

