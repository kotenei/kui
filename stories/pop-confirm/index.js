import React from 'react';
import popconfirmDoc from '../../src/components/pop-confirm/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Placement from './placement';
import PlacementSource from './doc/placement.source';

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
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Placement/>;
story1.storyName = 'placement';
story1.parameters = { storySource: { source: PlacementSource } };

