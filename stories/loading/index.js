import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import loadingDoc from '../../src/components/loading/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Color from './color';
import ColorDoc from './doc/color.md';
import Size from './size';
import SizeDoc from './doc/size.md';
import Tip from './tip';
import TipDoc from './doc/tip.md';
import Vertical from './vertical';
import VerticalDoc from './doc/vertical.md';
storiesOf('loading', module)
              .addDecorator(withReadme(loadingDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('color', withDocs(ColorDoc, () => <Color/>)).add('size', withDocs(SizeDoc, () => <Size/>)).add('tip', withDocs(TipDoc, () => <Tip/>)).add('vertical', withDocs(VerticalDoc, () => <Vertical/>));