import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import breadcrumbDoc from '../../src/components/breadcrumb/README.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('breadcrumb', module)
              .addDecorator(withReadme(breadcrumbDoc))
              .add('basic', withDocs(BasicDoc, () => <Basic/>));