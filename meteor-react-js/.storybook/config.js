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
  const req = require.context("../imports/ui/components", true, /\.stories\.jsx?$/);
  req.keys().forEach(req);
}

configure(loadStories, module);
