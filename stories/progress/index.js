import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs, withReadme } from 'storybook-readme';
import progressDoc from '../../src/components/progress/README.md';
import Circle from './circle';
import CircleDoc from './doc/circle.md';
import Indeterminate from './indeterminate';
import IndeterminateDoc from './doc/indeterminate.md';
import Percentinsert from './percent-insert';
import PercentinsertDoc from './doc/percent-insert.md';
import Percentoutside from './percent-outside';
import PercentoutsideDoc from './doc/percent-outside.md';
storiesOf('progress', module)
              .addDecorator(withReadme(progressDoc))
              .add('circle', withDocs(CircleDoc, () => <Circle/>)).add('indeterminate', withDocs(IndeterminateDoc, () => <Indeterminate/>)).add('percent-insert', withDocs(PercentinsertDoc, () => <Percentinsert/>)).add('percent-outside', withDocs(PercentoutsideDoc, () => <Percentoutside/>));