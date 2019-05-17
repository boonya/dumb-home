import React from "react";
import { renderToString } from "react-dom/server";
import { onPageLoad } from "meteor/server-render";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { MuiThemeProvider, createGenerateClassName } from "@material-ui/core/styles";

import theme from "../ui/Theme";
import Preloader from "../ui/common/Preloader";

export default class MarkupRenderer {
  static render() {
    const renderer = new MarkupRenderer();
    renderer.onPageLoad();
  }

  _sink = null;
  _sheetsRegistry = null;

  onPageLoad() {
    onPageLoad(sink => {
      this._sink = sink;
      this._sheetsRegistry = new SheetsRegistry();
      this._renderBody();
      this._renderStyles();
    });
  }

  _renderBody() {
    this._sink.appendToBody(renderToString(<div id="viewport-root">{this._getBodyContent()}</div>));
  }

  _getBodyContent() {
    // TODO: Resolve issue that spinner effect afects on application layout
    return <h1>Loading...</h1>;
    const sheetsManager = new Map();
    const generateClassName = createGenerateClassName();
    return (
      <JssProvider registry={this._sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <Preloader />
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  _renderStyles() {
    const rawCSS = this._sheetsRegistry.toString();
    this._sink.appendToHead(`<style>${rawCSS}</style>`);
  }
}
