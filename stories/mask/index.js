import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import maskDoc from '../../src/components/mask/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('mask', module)
              .addDecorator(withReadme(maskDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>));