import React from 'react';
import dropdownDoc from '../../src/components/dropdown/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Placement from './placement';
import PlacementSource from './doc/placement.source';

export default {
    title: 'KUI/Components/dropdown',
    parameters: {
      docs: {
        page: dropdownDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Placement/>;
story1.storyName = 'placement';
story1.parameters = { storySource: { source: PlacementSource } };

