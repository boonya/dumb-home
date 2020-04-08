import React from 'react';

import { onPageLoad } from 'meteor/server-render';

import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';

import theme from '../ui/theme';
import Preloader from '../ui/components/Preloader';

const getBodyContent = (styleSheets) => ReactDOMServer.renderToString(
  styleSheets.collect(
    <ThemeProvider theme={theme}>
      <Preloader />
    </ThemeProvider>,
  ),
);

export default (elementId) => {
  onPageLoad((sink) => {
    const styleSheets = new ServerStyleSheets();
    sink.renderIntoElementById(elementId, getBodyContent(styleSheets));
    sink.appendToHead(`<style id="#jss-server-side">${styleSheets.toString()}</style>`);
  });
};
