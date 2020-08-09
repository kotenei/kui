import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { addReadme, configureReadme } from 'storybook-readme';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  req
    .keys()
    .sort()
    .forEach(filename => req(filename));
}

configureReadme({
  StoryPreview: ({ children }) => <div className="story-demo">{children}</div>,
  // DocPreview: DocWrapper,
  // HeaderPreview: HeaderWrapper,
  // FooterPreview: FooterWrapper
});

addParameters({
  options: {
    name: 'kui-react',
    goFullScreen: false,
    showAddonsPanel: true,
    showSearchBox: true,
    addonPanelInRight: true,
    sortStoriesByKind: true,
    hierarchySeparator: /\./,
    hierarchyRootSeparator: /\|/,
    enableShortcuts: true,
  },
  readme: {
    codeTheme: 'github',
  },
});

addDecorator(addReadme);

configure(loadStories, module);
