import React from 'react';
import buttonDoc from '../../src/components/button/README.md';
import Basic from './basic';
import Group from './group';
import Icon from './icon';
import Loading from './loading';
import Size from './size';

export default {
    title: 'KUI/Components/button',
    parameters: {
      docs: {
        page: buttonDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

export const story1 = () => <Group/>;
story1.storyName = 'group';

export const story2 = () => <Icon/>;
story2.storyName = 'icon';

export const story3 = () => <Loading/>;
story3.storyName = 'loading';

export const story4 = () => <Size/>;
story4.storyName = 'size';

