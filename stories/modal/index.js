import React from 'react';
import modalDoc from '../../src/components/modal/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Status from './status';
import StatusSource from './doc/status.source';

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
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Status/>;
story1.storyName = 'status';
story1.parameters = { storySource: { source: StatusSource } };

