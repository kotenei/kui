import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import notificationDoc from '../../src/components/notification/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('notification', module)
              .addDecorator(withReadme(notificationDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>));