import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';

import Basic from './basic';
import Icon from './icon';
import Size from './size';

storiesOf('Button', module)
  .add('basic', () => <Basic />)
  .add('icon', () => <Icon />)
  .add('size', () => <Size />)
