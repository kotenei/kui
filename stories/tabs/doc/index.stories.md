```jsx
import React from 'react';
import tabsDoc from '../../src/components/tabs/README.md';
import Basic from './basic';
import Card from './card';
import Disabled from './disabled';
import Edit from './edit';
import Edtra from './edtra';
import Position from './position';

export default {
    title: 'KUI/Components/tabs',
    parameters: {
      docs: {
        page: tabsDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Card/>;
story1.storyName = 'card';

export const story2 = () => <Disabled/>;
story2.storyName = 'disabled';

export const story3 = () => <Edit/>;
story3.storyName = 'edit';

export const story4 = () => <Edtra/>;
story4.storyName = 'edtra';

export const story5 = () => <Position/>;
story5.storyName = 'position';


```
