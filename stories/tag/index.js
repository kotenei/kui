import React from 'react';
import tagDoc from '../../src/components/tag/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Line from './line';
import LineSource from './doc/line.source';

export default {
    title: 'KUI/Components/tag',
    parameters: {
      docs: {
        page: tagDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Line/>;
story1.storyName = 'line';
story1.parameters = { storySource: { source: LineSource } };

