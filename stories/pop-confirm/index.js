import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import popconfirmDoc from '../../src/components/pop-confirm/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Placement from './placement';
import PlacementDoc from './doc/placement.md';
storiesOf('pop-confirm', module)
              .addDecorator(withReadme(popconfirmDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('placement', withDocs(PlacementDoc, () => <Placement/>));