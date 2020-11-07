import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import messageDoc from '../../src/components/message/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('message', module)
              .addDecorator(withReadme(messageDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>));