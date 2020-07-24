import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/breadcrumb/README.md';
import Basic from './basic';

storiesOf('Breadcrumb', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />);
