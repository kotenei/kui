import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import menuDoc from '../../src/components/menu/README.md';
import Horizontal from './horizontal';
import HorizontalDoc from './doc/horizontal.md';
import Inline from './inline';
import InlineDoc from './doc/inline.md';
import InlineCollapsed from './inlineCollapsed';
import InlineCollapsedDoc from './doc/inlineCollapsed.md';
import Vertical from './vertical';
import VerticalDoc from './doc/vertical.md';
storiesOf('menu', module)
              .addDecorator(withReadme(menuDoc))
              .add('horizontal', withDocs(HorizontalDoc, () => <Horizontal/>)).add('inline', withDocs(InlineDoc, () => <Inline/>)).add('inlineCollapsed', withDocs(InlineCollapsedDoc, () => <InlineCollapsed/>)).add('vertical', withDocs(VerticalDoc, () => <Vertical/>));