import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';
import Line from './line';

storiesOf('Tag', module)
  .add('basic', () => <Basic />)
  .add('line', () => <Line />);
