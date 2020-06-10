import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';


storiesOf('Alert', module)
  .add('basic', () => <Basic />);
