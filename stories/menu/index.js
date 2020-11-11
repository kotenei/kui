import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import menuDoc from '../../src/components/menu/README.md';
import Horizontal from './horizontal';
import HorizontalDoc from './doc/horizontal.md';
storiesOf('menu', module)
              .addDecorator(withReadme(menuDoc))
              .add('horizontal', withDocs(HorizontalDoc, () => <Horizontal/>));