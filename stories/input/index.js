import React from 'react';
import inputDoc from '../../src/components/input/README.md';
import Addon from './addon';
import Basic from './basic';
import Prefixsuffix from './prefix-suffix';
import Textarea from './textarea';

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

export const story1 = () => <Basic/>;
story1.storyName = 'basic';

export const story2 = () => <Prefixsuffix/>;
story2.storyName = 'prefix-suffix';

export const story3 = () => <Textarea/>;
story3.storyName = 'textarea';

