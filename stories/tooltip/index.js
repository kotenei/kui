import React from 'react';
import tooltipDoc from '../../src/components/tooltip/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Placement from './placement';
import PlacementSource from './doc/placement.source';

export default {
    title: 'KUI/Components/tooltip',
    parameters: {
      docs: {
        page: tooltipDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Placement/>;
story1.storyName = 'placement';
story1.parameters = { storySource: { source: PlacementSource } };

