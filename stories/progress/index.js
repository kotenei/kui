import React from 'react';
import progressDoc from '../../src/components/progress/README.md';
import Circle from './circle';
import CircleSource from './doc/circle.source';
import Indeterminate from './indeterminate';
import IndeterminateSource from './doc/indeterminate.source';
import Percentinsert from './percent-insert';
import PercentinsertSource from './doc/percent-insert.source';
import Percentoutside from './percent-outside';
import PercentoutsideSource from './doc/percent-outside.source';

export default {
    title: 'KUI/Components/progress',
    parameters: {
      docs: {
        page: progressDoc,
      },
    },
  };

export const story0 = () => <Circle/>;
story0.storyName = 'circle';
story0.parameters = { storySource: { source: CircleSource } };

export const story1 = () => <Indeterminate/>;
story1.storyName = 'indeterminate';
story1.parameters = { storySource: { source: IndeterminateSource } };

export const story2 = () => <Percentinsert/>;
story2.storyName = 'percent-insert';
story2.parameters = { storySource: { source: PercentinsertSource } };

export const story3 = () => <Percentoutside/>;
story3.storyName = 'percent-outside';
story3.parameters = { storySource: { source: PercentoutsideSource } };

