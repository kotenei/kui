import React from 'react';
import listDoc from '../../src/components/list/README.md';
import Actions from './actions';
import Basic from './basic';
import Meta from './meta';

export default {
    title: 'KUI/Components/list',
    parameters: {
      docs: {
        page: listDoc,
      },
    },
  };

export const story0 = () => <Actions/>;
story0.storyName = 'actions';

export const story1 = () => <Basic/>;
story1.storyName = 'basic';

export const story2 = () => <Meta/>;
story2.storyName = 'meta';

