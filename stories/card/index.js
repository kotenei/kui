import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/card/README.md';
import Actions from './actions';
import Basic from './basic';
import Cover from './cover';
import NoBorder from './no-border';

storiesOf('Card', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('no border', () => <NoBorder />)
  .add('cover', () => <Cover />)
  .add('actions', () => <Actions />)
  
