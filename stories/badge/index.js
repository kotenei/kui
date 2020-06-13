import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';
import Dot from './dot';

storiesOf('Badge', module)
  .add('basic', () => <Basic />)
  .add('dot', () => <Dot />);
