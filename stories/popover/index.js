import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import popoverDoc from '../../src/components/popover/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Placement from './placement';
import PlacementDoc from './doc/placement.md';
storiesOf('popover', module)
              .addDecorator(withReadme(popoverDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('placement', withDocs(PlacementDoc, () => <Placement/>));