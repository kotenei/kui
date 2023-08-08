import React from 'react';
import uploadDoc from '../../src/components/upload/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Dragger from './dragger';
import DraggerSource from './doc/dragger.source';
import Picture from './picture';
import PictureSource from './doc/picture.source';
import PictureCard from './pictureCard';
import PictureCardSource from './doc/pictureCard.source';

export default {
    title: 'KUI/Components/upload',
    parameters: {
      docs: {
        page: uploadDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Dragger/>;
story1.storyName = 'dragger';
story1.parameters = { storySource: { source: DraggerSource } };

export const story2 = () => <Picture/>;
story2.storyName = 'picture';
story2.parameters = { storySource: { source: PictureSource } };

export const story3 = () => <PictureCard/>;
story3.storyName = 'pictureCard';
story3.parameters = { storySource: { source: PictureCardSource } };

