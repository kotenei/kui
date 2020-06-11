import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';
import Color from './color';
import Size from './size';
import Tip from './tip';
import Vertical from './vertical';

storiesOf('Loading', module)
  .add('basic', () => <Basic />)
  .add('color', () => <Color />)
  .add('size', () => <Size />)
  .add('tip', () => <Tip />)
  .add('vertical', () => <Vertical />);
