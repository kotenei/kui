import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import modalDoc from '../../src/components/modal/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Status from './status';
import StatusDoc from './doc/status.md';
storiesOf('modal', module)
              .addDecorator(withReadme(modalDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('status', withDocs(StatusDoc, () => <Status/>));