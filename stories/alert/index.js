import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/alert/README.md';
import Basic from './basic';


storiesOf('Alert', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />);
