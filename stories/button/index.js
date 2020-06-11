import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';

storiesOf('Button', module)
  .add('basic', () => <Basic />)
