import React from 'react';
import progressDoc from '../../src/components/progress/README.md';
import Circle from './circle';
import Indeterminate from './indeterminate';
import Percentinsert from './percent-insert';
import Percentoutside from './percent-outside';

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

export const story1 = () => <Indeterminate/>;
story1.storyName = 'indeterminate';

export const story2 = () => <Percentinsert/>;
story2.storyName = 'percent-insert';

export const story3 = () => <Percentoutside/>;
story3.storyName = 'percent-outside';

