import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import collapseDoc from '../../src/components/collapse/README.md';
import Accordion from './accordion';
import AccordionDoc from './doc/accordion.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
storiesOf('collapse', module)
              .addDecorator(withReadme(collapseDoc))
              .add('accordion', withDocs(AccordionDoc, () => <Accordion/>)).add('basic', withDocs(BasicDoc, () => <Basic/>));