import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';
import Actions from './actions';
import Meta from './meta';

storiesOf('List', module)
  .add('basic', () => <Basic />)
  .add('actions', () => <Actions />)
  .add('meta', () => <Meta />);
