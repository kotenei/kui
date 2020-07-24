import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import alertDoc from '../../src/components/alert/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('alert', module)
              .addDecorator(withReadme(alertDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>));