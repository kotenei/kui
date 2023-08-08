import React from 'react';
import badgeDoc from '../../src/components/badge/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Dot from './dot';
import DotSource from './doc/dot.source';

export default {
    title: 'KUI/Components/badge',
    parameters: {
      docs: {
        page: badgeDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Dot/>;
story1.storyName = 'dot';
story1.parameters = { storySource: { source: DotSource } };

