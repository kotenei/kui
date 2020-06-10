import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';
import Flex from './flex';
import FlexAlign from './flex-align';
import Gutter from './gutter';
import Offset from './offset';

storiesOf('Grid', module)
  .add('basic', () => <Basic />)
  .add('flex', () => <Flex />)
  .add('flex align', () => <FlexAlign />)
  .add('gutter', () => <Gutter />)
  .add('offset', () => <Offset />);
