import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import dropdownDoc from '../../src/components/dropdown/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('dropdown', module)
              .addDecorator(withReadme(dropdownDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>));