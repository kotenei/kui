import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Actions from './actions';
import Basic from './basic';
import Cover from './cover';
import NoBorder from './no-border';

storiesOf('Card', module)
  .add('basic', () => <Basic />)
  .add('no border', () => <NoBorder />)
  .add('cover', () => <Cover />)
  .add('actions', () => <Actions />)
  
