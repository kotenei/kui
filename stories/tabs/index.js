import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import tabsDoc from '../../src/components/tabs/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Card from './card';
import CardDoc from './doc/card.md';
import Disabled from './disabled';
import DisabledDoc from './doc/disabled.md';
import Edit from './edit';
import EditDoc from './doc/edit.md';
import Edtra from './edtra';
import EdtraDoc from './doc/edtra.md';
import Position from './position';
import PositionDoc from './doc/position.md';
storiesOf('tabs', module)
              .addDecorator(withReadme(tabsDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('card', withDocs(CardDoc, () => <Card/>)).add('disabled', withDocs(DisabledDoc, () => <Disabled/>)).add('edit', withDocs(EditDoc, () => <Edit/>)).add('edtra', withDocs(EdtraDoc, () => <Edtra/>)).add('position', withDocs(PositionDoc, () => <Position/>));