import React from 'react';
import breadcrumbDoc from '../../src/components/breadcrumb/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/breadcrumb',
    parameters: {
      docs: {
        page: breadcrumbDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

