import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withKnobs } from '@storybook/addon-knobs';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { VIEWPORTS, DEFAULT_VIEWPORT } from './viewports';
import theme from '../imports/ui/theme';

addParameters({
  options: {
    theme: themes.dark,
  },
  viewport: {
    viewports: VIEWPORTS,
    defaultViewport: DEFAULT_VIEWPORT,
  },
});

addDecorator(withKnobs);
addDecorator((fn) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {fn()}
  </MuiThemeProvider>
));

function loadStories() {
  const req = require.context('../imports/ui/components', true, /\.stories\.js$/);
  req.keys().forEach(req);
}

configure(loadStories, module);
