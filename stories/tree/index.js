import React from 'react';
import treeDoc from '../../src/components/tree/README.md';
import Basic from './basic';
import BasicSource from './doc/basic.source';
import Dragdrop from './dragdrop';
import DragdropSource from './doc/dragdrop.source';
import LoadData from './loadData';
import LoadDataSource from './doc/loadData.source';
import ShowLine from './showLine';
import ShowLineSource from './doc/showLine.source';

export default {
    title: 'KUI/Components/tree',
    parameters: {
      docs: {
        page: treeDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';
story0.parameters = { storySource: { source: BasicSource } };

export const story1 = () => <Dragdrop/>;
story1.storyName = 'dragdrop';
story1.parameters = { storySource: { source: DragdropSource } };

export const story2 = () => <LoadData/>;
story2.storyName = 'loadData';
story2.parameters = { storySource: { source: LoadDataSource } };

export const story3 = () => <ShowLine/>;
story3.storyName = 'showLine';
story3.parameters = { storySource: { source: ShowLineSource } };

