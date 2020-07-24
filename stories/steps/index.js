import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/steps/README.md';

import Basic from './basic';
import Align from './align';
import Icon from './icon';
import Size from './size';
import Vertical from './vertical';
import VerticalMini from './vertical-mini';
import Status from './status';

storiesOf('Steps', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('size', () => <Size />)
  .add('align', () => <Align />)
  .add('icon', () => <Icon />)
  .add('vertical', () => <Vertical />)
  .add('vertical-mini', () => <VerticalMini />)
  .add('status', () => <Status />);
