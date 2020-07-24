import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import buttonDoc from '../../src/components/button/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Group from './group';
import GroupDoc from './doc/group.md';
import Icon from './icon';
import IconDoc from './doc/icon.md';
import Loading from './loading';
import LoadingDoc from './doc/loading.md';
import Size from './size';
import SizeDoc from './doc/size.md';
storiesOf('button', module)
              .addDecorator(withReadme(buttonDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>)).add('group', withDocs(GroupDoc, () => <Group/>)).add('icon', withDocs(IconDoc, () => <Icon/>)).add('loading', withDocs(LoadingDoc, () => <Loading/>)).add('size', withDocs(SizeDoc, () => <Size/>));