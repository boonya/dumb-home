import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, rootSaga } from "../imports/ui/redux";
import App from "../imports/ui/App";

const { environment } = Meteor.settings.public;

const sagaMiddleware = createSagaMiddleware();

const reduxMiddleware = [];

if (environment === "development") {
  const loggerMiddleware = createLogger({ collapsed: true });
  reduxMiddleware.push(loggerMiddleware);
}

reduxMiddleware.push(sagaMiddleware);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...reduxMiddleware)));

sagaMiddleware.run(rootSaga);

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("viewport-root")
  );
});
