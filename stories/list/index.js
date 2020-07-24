import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/list/README.md';
import Basic from './basic';
import Actions from './actions';
import Meta from './meta';

storiesOf('List', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('actions', () => <Actions />)
  .add('meta', () => <Meta />);
