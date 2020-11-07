import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import rateDoc from '../../src/components/rate/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Character from './character';
import CharacterDoc from './doc/character.md';
import Disabled from './disabled';
import DisabledDoc from './doc/disabled.md';
import Half from './half';
import HalfDoc from './doc/half.md';
storiesOf('rate', module)
              .addDecorator(withReadme(rateDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('character', withDocs(CharacterDoc, () => <Character/>)).add('disabled', withDocs(DisabledDoc, () => <Disabled/>)).add('half', withDocs(HalfDoc, () => <Half/>));