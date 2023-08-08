import React from 'react';
import loadingDoc from '../../src/components/loading/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Color from './color';
import ColorSource from './doc/color.source';
import Size from './size';
import SizeSource from './doc/size.source';
import Tip from './tip';
import TipSource from './doc/tip.source';
import Vertical from './vertical';
import VerticalSource from './doc/vertical.source';

export default {
    title: 'KUI/Components/loading',
    parameters: {
      docs: {
        page: loadingDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Color/>;
story1.storyName = 'color';
story1.parameters = { storySource: { source: ColorSource } };

export const story2 = () => <Size/>;
story2.storyName = 'size';
story2.parameters = { storySource: { source: SizeSource } };

export const story3 = () => <Tip/>;
story3.storyName = 'tip';
story3.parameters = { storySource: { source: TipSource } };

export const story4 = () => <Vertical/>;
story4.storyName = 'vertical';
story4.parameters = { storySource: { source: VerticalSource } };

