import React from 'react';
import menuDoc from '../../src/components/menu/README.md';
import Horizontal from './horizontal';
import HorizontalSource from './doc/horizontal.source';
import Inline from './inline';
import InlineSource from './doc/inline.source';
import InlineCollapsed from './inlineCollapsed';
import InlineCollapsedSource from './doc/inlineCollapsed.source';
import Vertical from './vertical';
import VerticalSource from './doc/vertical.source';

export default {
    title: 'KUI/Components/menu',
    parameters: {
      docs: {
        page: menuDoc,
      },
    },
  };

export const story0 = () => <Horizontal/>;
story0.storyName = 'horizontal';
story0.parameters = { storySource: { source: HorizontalSource } };

export const story1 = () => <Inline/>;
story1.storyName = 'inline';
story1.parameters = { storySource: { source: InlineSource } };

export const story2 = () => <InlineCollapsed/>;
story2.storyName = 'inlineCollapsed';
story2.parameters = { storySource: { source: InlineCollapsedSource } };

export const story3 = () => <Vertical/>;
story3.storyName = 'vertical';
story3.parameters = { storySource: { source: VerticalSource } };

