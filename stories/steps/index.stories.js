import React from 'react';
import stepsDoc from '../../src/components/steps/README.md';
import Align from './align';
import Basic from './basic';
import Icon from './icon';
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

export const story3 = () => <Size/>;
story3.storyName = 'size';

export const story4 = () => <Status/>;
story4.storyName = 'status';

export const story5 = () => <Verticalmini/>;
story5.storyName = 'vertical-mini';

export const story6 = () => <Vertical/>;
story6.storyName = 'vertical';

