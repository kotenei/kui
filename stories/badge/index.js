import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import badgeDoc from '../../src/components/badge/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Dot from './dot';
import DotDoc from './doc/dot.md';
storiesOf('badge', module)
              .addDecorator(withReadme(badgeDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('dot', withDocs(DotDoc, () => <Dot/>));