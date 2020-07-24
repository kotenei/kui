import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import tagDoc from '../../src/components/tag/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Line from './line';
import LineDoc from './doc/line.md';
storiesOf('tag', module)
              .addDecorator(withReadme(tagDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('line', withDocs(LineDoc, () => <Line/>));