import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import lazyloadDoc from '../../src/components/lazyload/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('lazyload', module)
              .addDecorator(withReadme(lazyloadDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>));