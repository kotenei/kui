import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import carouselDoc from '../../src/components/carousel/README.md';
import Autoplay from './autoplay';
import AutoplayDoc from './doc/autoplay.md';
import Basic from './basic';
import BasicDoc from './doc/basic.md';
import Vertical from './vertical';
import VerticalDoc from './doc/vertical.md';
storiesOf('carousel', module)
              .addDecorator(withReadme(carouselDoc))
              .add('autoplay', withDocs(AutoplayDoc, () => <Autoplay/>)).add('basic', withDocs(BasicDoc, () => <Basic/>)).add('vertical', withDocs(VerticalDoc, () => <Vertical/>));