import React from 'react';
import collapseDoc from '../../src/components/collapse/README.md';
import Accordion from './accordion';
import AccordionSource from './doc/accordion.source';
import Basic from './basic';
import BasicSource from './doc/basic.source';

export default {
    title: 'KUI/Components/collapse',
    parameters: {
      docs: {
        page: collapseDoc,
      },
    },
  };

export const story0 = () => <Accordion/>;
story0.storyName = 'accordion';
story0.parameters = { storySource: { source: AccordionSource } };

export const story1 = () => <Basic/>;
story1.storyName = 'basic';
story1.parameters = { storySource: { source: BasicSource } };

