import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/badge/README.md';
import Basic from './basic';
import Dot from './dot';

storiesOf('Badge', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('dot', () => <Dot />);
