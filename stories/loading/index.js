import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/loading/README.md';
import Basic from './basic';
import Color from './color';
import Size from './size';
import Tip from './tip';
import Vertical from './vertical';

storiesOf('Loading', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('color', () => <Color />)
  .add('size', () => <Size />)
  .add('tip', () => <Tip />)
  .add('vertical', () => <Vertical />);
