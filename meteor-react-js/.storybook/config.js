import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../imports/ui/theme";

addDecorator(withKnobs);
addDecorator(fn => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {fn()}
  </MuiThemeProvider>
));

function loadStories() {
  // Automatically import all js files in ../stories/ directory
  const req = require.context("../stories", true, /.jsx?$/);
  req.keys().forEach(req);
}

configure(loadStories, module);
