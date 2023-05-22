import React from 'react';
import tabsDoc from '../../src/components/tabs/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Card from './card';
import CardSource from './doc/card.source';
import Disabled from './disabled';
import DisabledSource from './doc/disabled.source';
import Edit from './edit';
import EditSource from './doc/edit.source';
import Edtra from './edtra';
import EdtraSource from './doc/edtra.source';
import Position from './position';
import PositionSource from './doc/position.source';

export default {
    title: 'KUI/Components/tabs',
    parameters: {
      docs: {
        page: tabsDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Card/>;
story1.storyName = 'card';
story1.parameters = { storySource: { source: CardSource } };

export const story2 = () => <Disabled/>;
story2.storyName = 'disabled';
story2.parameters = { storySource: { source: DisabledSource } };

export const story3 = () => <Edit/>;
story3.storyName = 'edit';
story3.parameters = { storySource: { source: EditSource } };

export const story4 = () => <Edtra/>;
story4.storyName = 'edtra';
story4.parameters = { storySource: { source: EdtraSource } };

export const story5 = () => <Position/>;
story5.storyName = 'position';
story5.parameters = { storySource: { source: PositionSource } };

