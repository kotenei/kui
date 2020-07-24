import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/avatar/README.md';
import Basic from './basic';
import Size from './size';
import Square from './square';

storiesOf('Avatar', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('size', () => <Size />)
  .add('square', () => <Square />);
