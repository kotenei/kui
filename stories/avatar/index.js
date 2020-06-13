import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';
import Size from './size';
import Square from './square';

storiesOf('Avatar', module)
  .add('basic', () => <Basic />)
  .add('size', () => <Size />)
  .add('square', () => <Square />);
