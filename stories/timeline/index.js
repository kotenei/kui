import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import timelineDoc from '../../src/components/timeline/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('timeline', module)
              .addDecorator(withReadme(timelineDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>));