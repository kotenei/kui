import React from 'react';
import tableDoc from '../../src/components/table/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Bordered from './bordered';
import BorderedSource from './doc/bordered.source';
import Checkbox from './checkbox';
import CheckboxSource from './doc/checkbox.source';
import Expand from './expand';
import ExpandSource from './doc/expand.source';
import FixedHeader from './fixedHeader';
import FixedHeaderSource from './doc/fixedHeader.source';
import GroupHeader from './groupHeader';
import GroupHeaderSource from './doc/groupHeader.source';
import Stripe from './stripe';
import StripeSource from './doc/stripe.source';

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
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Bordered/>;
story1.storyName = 'bordered';
story1.parameters = { storySource: { source: BorderedSource } };

export const story2 = () => <Checkbox/>;
story2.storyName = 'checkbox';
story2.parameters = { storySource: { source: CheckboxSource } };

export const story3 = () => <Expand/>;
story3.storyName = 'expand';
story3.parameters = { storySource: { source: ExpandSource } };

export const story4 = () => <FixedHeader/>;
story4.storyName = 'fixedHeader';
story4.parameters = { storySource: { source: FixedHeaderSource } };

export const story5 = () => <GroupHeader/>;
story5.storyName = 'groupHeader';
story5.parameters = { storySource: { source: GroupHeaderSource } };

export const story6 = () => <Stripe/>;
story6.storyName = 'stripe';
story6.parameters = { storySource: { source: StripeSource } };

