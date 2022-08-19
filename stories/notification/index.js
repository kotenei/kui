import React from 'react';
import notificationDoc from '../../src/components/notification/README.md';
import Basic from './basic';

export default {
    title: 'KUI/Components/notification',
    parameters: {
      docs: {
        page: notificationDoc,
      },
    },
  };

export const story0 = () => <Basic/>;
story0.storyName = 'basic';

