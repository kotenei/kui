import React from 'react';
import formDoc from '../../src/components/form/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Customized from './customized';
import CustomizedSource from './doc/customized.source';
import Dynamic from './dynamic';
import DynamicSource from './doc/dynamic.source';
import Tooltip from './tooltip';
import TooltipSource from './doc/tooltip.source';
import WithForm from './withForm';
import WithFormSource from './doc/withForm.source';

export default {
    title: 'KUI/Components/form',
    parameters: {
      docs: {
        page: formDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Customized/>;
story1.storyName = 'customized';
story1.parameters = { storySource: { source: CustomizedSource } };

export const story2 = () => <Dynamic/>;
story2.storyName = 'dynamic';
story2.parameters = { storySource: { source: DynamicSource } };

export const story3 = () => <Tooltip/>;
story3.storyName = 'tooltip';
story3.parameters = { storySource: { source: TooltipSource } };

export const story4 = () => <WithForm/>;
story4.storyName = 'withForm';
story4.parameters = { storySource: { source: WithFormSource } };

