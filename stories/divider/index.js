import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import dividerDoc from '../../src/components/divider/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Color from './color';
import ColorDoc from './doc/color.md';
import Vertical from './vertical';
import VerticalDoc from './doc/vertical.md';
storiesOf('divider', module)
              .addDecorator(withReadme(dividerDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('color', withDocs(ColorDoc, () => <Color/>)).add('vertical', withDocs(VerticalDoc, () => <Vertical/>));