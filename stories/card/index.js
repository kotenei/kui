import React from 'react';
import cardDoc from '../../src/components/card/README.md';
import Actions from './actions';
import ActionsSource from './doc/actions.source';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Cover from './cover';
import CoverSource from './doc/cover.source';
import Noborder from './no-border';
import NoborderSource from './doc/no-border.source';

export default {
    title: 'KUI/Components/card',
    parameters: {
      docs: {
        page: cardDoc,
      },
    },
  };

export const story0 = () => <Actions/>;
story0.storyName = 'actions';
story0.parameters = { storySource: { source: ActionsSource } };

export const story1 = () => <Basic/>;
story1.storyName = 'basic';
story1.parameters = { storySource: { source: BasicSource } };

export const story2 = () => <Cover/>;
story2.storyName = 'cover';
story2.parameters = { storySource: { source: CoverSource } };

export const story3 = () => <Noborder/>;
story3.storyName = 'no-border';
story3.parameters = { storySource: { source: NoborderSource } };

