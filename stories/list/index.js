import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import listDoc from '../../src/components/list/README.md';
import Actions from './actions';
import ActionsDoc from './doc/actions.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Meta from './meta';
import MetaDoc from './doc/meta.md';
storiesOf('list', module)
              .addDecorator(withReadme(listDoc))
              .add('actions', withDocs(ActionsDoc, () => <Actions/>)).add('basic', withDocs(BasicDoc, () => <Basic/>)).add('meta', withDocs(MetaDoc, () => <Meta/>));