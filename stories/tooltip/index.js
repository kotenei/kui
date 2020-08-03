import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import tooltipDoc from '../../src/components/tooltip/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Placement from './placement';
import PlacementDoc from './doc/placement.md';
storiesOf('tooltip', module)
              .addDecorator(withReadme(tooltipDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('placement', withDocs(PlacementDoc, () => <Placement/>));