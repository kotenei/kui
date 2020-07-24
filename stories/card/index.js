import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import cardDoc from '../../src/components/card/README.md';
import Actions from './actions';
import ActionsDoc from './doc/actions.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Cover from './cover';
import CoverDoc from './doc/cover.md';
import Noborder from './no-border';
import NoborderDoc from './doc/no-border.md';
storiesOf('card', module)
              .addDecorator(withReadme(cardDoc))
              .add('actions', withDocs(ActionsDoc, () => <Actions/>)).add('basic', withDocs(BasicDoc, () => <Basic/>)).add('cover', withDocs(CoverDoc, () => <Cover/>)).add('no-border', withDocs(NoborderDoc, () => <Noborder/>));