import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import dropdownDoc from '../../src/components/dropdown/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Placement from './placement';
import PlacementDoc from './doc/placement.md';
storiesOf('dropdown', module)
              .addDecorator(withReadme(dropdownDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('placement', withDocs(PlacementDoc, () => <Placement/>));