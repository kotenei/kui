import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/tag/README.md';
import Basic from './basic';
import Line from './line';

storiesOf('Tag', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('line', () => <Line />);
