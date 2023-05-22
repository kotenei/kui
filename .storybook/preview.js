import React from 'react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '!style-loader!css-loader!sass-loader!./index.scss';

export const decorators = [
  (Story) => (
    <div className="story-demo">
      <Story />
    </div>
  ),
];

export const parameters = {
  exportedParameter: 'exportedParameter',
  a11y: {
    config: {},
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },

  docs: {
    // theme: themes.light,
    // theme: themes.dark,
    page: () => <DocsPage subtitleSlot={({ kind }) => `Subtitle: ${kind}`} />,
    // container: DocsContainer,
    // page: DocsPage,
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
    // defaultViewport: DEFAULT_VIEWPORT,
  },
  // automatically create action args for all props that start with "on"
  actions: { argTypesRegex: '^on.*' },
  dependencies: {
    // display only dependencies/dependents that have a story in storybook
    // by default this is false
    withStoriesOnly: true,

    // completely hide a dependency/dependents block if it has no elements
    // by default this is false
    hideEmpty: true,
  },
};
