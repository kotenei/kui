import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Api from '../../src/components/button/README.md';
import Basic from './basic';
import Group from './group';
import Icon from './icon';
import Loading from './loading';
import Size from './size';

storiesOf('Button', module)
  .addDecorator(withReadme(Api))
  .add('basic', () => <Basic />)
  .add('group', () => <Group />)
  .add('icon', () => <Icon />)
  .add('loading', () => <Loading />)
  .add('size', () => <Size />);
