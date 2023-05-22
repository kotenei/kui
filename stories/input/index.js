import React from 'react';
import inputDoc from '../../src/components/input/README.md';
import Addon from './addon';
import AddonSource from './doc/addon.source';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Prefixsuffix from './prefix-suffix';
import PrefixsuffixSource from './doc/prefix-suffix.source';
import Textarea from './textarea';
import TextareaSource from './doc/textarea.source';

export default {
    title: 'KUI/Components/input',
    parameters: {
      docs: {
        page: inputDoc,
      },
    },
  };

export const story0 = () => <Addon/>;
story0.storyName = 'addon';
story0.parameters = { storySource: { source: AddonSource } };

export const story1 = () => <Basic/>;
story1.storyName = 'basic';
story1.parameters = { storySource: { source: BasicSource } };

export const story2 = () => <Prefixsuffix/>;
story2.storyName = 'prefix-suffix';
story2.parameters = { storySource: { source: PrefixsuffixSource } };

export const story3 = () => <Textarea/>;
story3.storyName = 'textarea';
story3.parameters = { storySource: { source: TextareaSource } };

