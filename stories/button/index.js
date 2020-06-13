import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';
import Group from './group';
import Icon from './icon';
import Loading from './loading';
import Size from './size';

storiesOf('Button', module)
  .add('basic', () => <Basic />)
  .add('group', () => <Group />)
  .add('icon', () => <Icon />)
  .add('loading', () => <Loading />)
  .add('size', () => <Size />);
