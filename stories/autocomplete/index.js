import React from 'react';
import autocompleteDoc from '../../src/components/autocomplete/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/autocomplete',
    parameters: {
      docs: {
        page: autocompleteDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

