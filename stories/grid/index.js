import React from 'react';
import gridDoc from '../../src/components/grid/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Flexalign from './flex-align';
import FlexalignSource from './doc/flex-align.source';
import Flex from './flex';
import FlexSource from './doc/flex.source';
import Gutter from './gutter';
import GutterSource from './doc/gutter.source';
import Offset from './offset';
import OffsetSource from './doc/offset.source';

export default {
    title: 'KUI/Components/grid',
    parameters: {
      docs: {
        page: gridDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Flexalign/>;
story1.storyName = 'flex-align';
story1.parameters = { storySource: { source: FlexalignSource } };

export const story2 = () => <Flex/>;
story2.storyName = 'flex';
story2.parameters = { storySource: { source: FlexSource } };

export const story3 = () => <Gutter/>;
story3.storyName = 'gutter';
story3.parameters = { storySource: { source: GutterSource } };

export const story4 = () => <Offset/>;
story4.storyName = 'offset';
story4.parameters = { storySource: { source: OffsetSource } };

