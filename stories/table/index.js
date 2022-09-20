import React from 'react';
import tableDoc from '../../src/components/table/README.md';
import Basic from './basic';
import Bordered from './bordered';
import Checkbox from './checkbox';
import Expand from './expand';
import FixedHeader from './fixedHeader';
import GroupHeader from './groupHeader';
import Stripe from './stripe';

export default {
    title: 'KUI/Components/table',
    parameters: {
      docs: {
        page: tableDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Bordered/>;
story1.storyName = 'bordered';

export const story2 = () => <Checkbox/>;
story2.storyName = 'checkbox';

export const story3 = () => <Expand/>;
story3.storyName = 'expand';

export const story4 = () => <FixedHeader/>;
story4.storyName = 'fixedHeader';

export const story5 = () => <GroupHeader/>;
story5.storyName = 'groupHeader';

export const story6 = () => <Stripe/>;
story6.storyName = 'stripe';

