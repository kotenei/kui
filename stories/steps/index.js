import React from 'react';
import stepsDoc from '../../src/components/steps/README.md';
import Align from './align';
import AlignSource from './doc/align.source';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Icon from './icon';
import IconSource from './doc/icon.source';
import Size from './size';
import SizeSource from './doc/size.source';
import Status from './status';
import StatusSource from './doc/status.source';
import Verticalmini from './vertical-mini';
import VerticalminiSource from './doc/vertical-mini.source';
import Vertical from './vertical';
import VerticalSource from './doc/vertical.source';

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
story0.parameters = { storySource: { source: AlignSource } };

export const story1 = () => <Basic/>;
story1.storyName = 'basic';
story1.parameters = { storySource: { source: BasicSource } };

export const story2 = () => <Icon/>;
story2.storyName = 'icon';
story2.parameters = { storySource: { source: IconSource } };

export const story3 = () => <Size/>;
story3.storyName = 'size';
story3.parameters = { storySource: { source: SizeSource } };

export const story4 = () => <Status/>;
story4.storyName = 'status';
story4.parameters = { storySource: { source: StatusSource } };

export const story5 = () => <Verticalmini/>;
story5.storyName = 'vertical-mini';
story5.parameters = { storySource: { source: VerticalminiSource } };

export const story6 = () => <Vertical/>;
story6.storyName = 'vertical';
story6.parameters = { storySource: { source: VerticalSource } };

