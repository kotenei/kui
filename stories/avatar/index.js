import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import avatarDoc from '../../src/components/avatar/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Size from './size';
import SizeDoc from './doc/size.md';
import Square from './square';
import SquareDoc from './doc/square.md';
storiesOf('avatar', module)
              .addDecorator(withReadme(avatarDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('size', withDocs(SizeDoc, () => <Size/>)).add('square', withDocs(SquareDoc, () => <Square/>));