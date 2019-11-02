import React from "react";
import { renderToString } from "react-dom/server";
import { onPageLoad } from "meteor/server-render";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { MuiThemeProvider, createGenerateClassName } from "@material-ui/core/styles";

import theme from "../ui/theme";
import Preloader from "../ui/components/Preloader";

export default class MarkupRenderer {
  static render(elementId) {
    this._elementId = elementId;
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
    this._sink.renderIntoElementById(this._elementId, renderToString(this._getBodyContent()));
  }

  _getBodyContent() {
    const sheetsManager = new Map();
    const generateClassName = createGenerateClassName({
      productionPrefix: "_",
      seed: "ss_"
    });
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
