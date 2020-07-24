import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import stepsDoc from '../../src/components/steps/README.md';
import Align from './align';
import AlignDoc from './doc/align.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Icon from './icon';
import IconDoc from './doc/icon.md';
import Size from './size';
import SizeDoc from './doc/size.md';
import Status from './status';
import StatusDoc from './doc/status.md';
import Verticalmini from './vertical-mini';
import VerticalminiDoc from './doc/vertical-mini.md';
import Vertical from './vertical';
import VerticalDoc from './doc/vertical.md';
storiesOf('steps', module)
              .addDecorator(withReadme(stepsDoc))
              .add('align', withDocs(AlignDoc, () => <Align/>)).add('basic', withDocs(BasicDoc, () => <Basic/>)).add('icon', withDocs(IconDoc, () => <Icon/>)).add('size', withDocs(SizeDoc, () => <Size/>)).add('status', withDocs(StatusDoc, () => <Status/>)).add('vertical-mini', withDocs(VerticalminiDoc, () => <Verticalmini/>)).add('vertical', withDocs(VerticalDoc, () => <Vertical/>));