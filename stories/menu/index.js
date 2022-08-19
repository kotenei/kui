import React from 'react';
import menuDoc from '../../src/components/menu/README.md';
import Horizontal from './horizontal';
import Inline from './inline';
import InlineCollapsed from './inlineCollapsed';
import Vertical from './vertical';

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

export const story1 = () => <Inline/>;
story1.storyName = 'inline';

export const story2 = () => <InlineCollapsed/>;
story2.storyName = 'inlineCollapsed';

export const story3 = () => <Vertical/>;
story3.storyName = 'vertical';

