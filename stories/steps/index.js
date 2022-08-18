import React from 'react';
import stepsDoc from '../../src/components/steps/README.md';
import Align from './align';
import Basic from './basic';
import Icon from './icon';
import Index.stories from './index.stories';
import Size from './size';
import Status from './status';
import Verticalmini from './vertical-mini';
import Vertical from './vertical';

export default {
    title: 'KUI/Components/steps',
    parameters: {
      docs: {
        page: stepsDoc,
      },
    },
  };

export const story0 = () => <Align/>;
story0.storyName = 'align';

export const story1 = () => <Basic/>;
story1.storyName = 'basic';

export const story2 = () => <Icon/>;
story2.storyName = 'icon';

export const story3 = () => <Index.stories/>;
story3.storyName = 'index.stories';

export const story4 = () => <Size/>;
story4.storyName = 'size';

export const story5 = () => <Status/>;
story5.storyName = 'status';

export const story6 = () => <Verticalmini/>;
story6.storyName = 'vertical-mini';

export const story7 = () => <Vertical/>;
story7.storyName = 'vertical';

