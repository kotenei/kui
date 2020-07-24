import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import gridDoc from '../../src/components/grid/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Flexalign from './flex-align';
import FlexalignDoc from './doc/flex-align.md';
import Flex from './flex';
import FlexDoc from './doc/flex.md';
import Gutter from './gutter';
import GutterDoc from './doc/gutter.md';
import Offset from './offset';
import OffsetDoc from './doc/offset.md';
storiesOf('grid', module)
              .addDecorator(withReadme(gridDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('flex-align', withDocs(FlexalignDoc, () => <Flexalign/>)).add('flex', withDocs(FlexDoc, () => <Flex/>)).add('gutter', withDocs(GutterDoc, () => <Gutter/>)).add('offset', withDocs(OffsetDoc, () => <Offset/>));