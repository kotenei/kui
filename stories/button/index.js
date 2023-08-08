import React from 'react';
import buttonDoc from '../../src/components/button/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Group from './group';
import GroupSource from './doc/group.source';
import Icon from './icon';
import IconSource from './doc/icon.source';
import Loading from './loading';
import LoadingSource from './doc/loading.source';
import Size from './size';
import SizeSource from './doc/size.source';

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
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Group/>;
story1.storyName = 'group';
story1.parameters = { storySource: { source: GroupSource } };

export const story2 = () => <Icon/>;
story2.storyName = 'icon';
story2.parameters = { storySource: { source: IconSource } };

export const story3 = () => <Loading/>;
story3.storyName = 'loading';
story3.parameters = { storySource: { source: LoadingSource } };

export const story4 = () => <Size/>;
story4.storyName = 'size';
story4.parameters = { storySource: { source: SizeSource } };

