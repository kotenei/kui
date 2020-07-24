import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/grid/README.md';
import Basic from './basic';
import Flex from './flex';
import FlexAlign from './flex-align';
import Gutter from './gutter';
import Offset from './offset';

storiesOf('Grid', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('flex', () => <Flex />)
  .add('flex align', () => <FlexAlign />)
  .add('gutter', () => <Gutter />)
  .add('offset', () => <Offset />);
