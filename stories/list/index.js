import React from 'react';
import listDoc from '../../src/components/list/README.md';
import Actions from './actions';
import ActionsSource from './doc/actions.source';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Meta from './meta';
import MetaSource from './doc/meta.source';

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
story0.parameters = { storySource: { source: ActionsSource } };

export const story1 = () => <Basic/>;
story1.storyName = 'basic';
story1.parameters = { storySource: { source: BasicSource } };

export const story2 = () => <Meta/>;
story2.storyName = 'meta';
story2.parameters = { storySource: { source: MetaSource } };

