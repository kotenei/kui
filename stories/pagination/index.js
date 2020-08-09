import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import paginationDoc from '../../src/components/pagination/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Color from './color';
import ColorDoc from './doc/color.md';
import Size from './size';
import SizeDoc from './doc/size.md';
storiesOf('pagination', module)
              .addDecorator(withReadme(paginationDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('color', withDocs(ColorDoc, () => <Color/>)).add('size', withDocs(SizeDoc, () => <Size/>));