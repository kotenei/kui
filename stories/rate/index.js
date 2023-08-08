import React from 'react';
import rateDoc from '../../src/components/rate/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Character from './character';
import CharacterSource from './doc/character.source';
import Disabled from './disabled';
import DisabledSource from './doc/disabled.source';
import Half from './half';
import HalfSource from './doc/half.source';

export default {
    title: 'KUI/Components/rate',
    parameters: {
      docs: {
        page: rateDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Character/>;
story1.storyName = 'character';
story1.parameters = { storySource: { source: CharacterSource } };

export const story2 = () => <Disabled/>;
story2.storyName = 'disabled';
story2.parameters = { storySource: { source: DisabledSource } };

export const story3 = () => <Half/>;
story3.storyName = 'half';
story3.parameters = { storySource: { source: HalfSource } };

