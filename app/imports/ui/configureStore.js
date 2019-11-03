import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";

import createSagaMonitor from "@clarketm/saga-monitor";
import { composeWithDevTools } from "redux-devtools-extension";

import { createRootReducer } from "./redux";

export default function configureStore(initialState = {}, rootSaga, rootEpic, history) {
  let composeEnhancers;

  // TODO:: fix before release
  const isDevelopment = true;

  if (
    isDevelopment
    // && typeof window === 'object'
    // && window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    composeEnhancers = composeWithDevTools;
    // window.__REDUX_DEVTOOLS_EXTENSION__({
    //   serializeState: true,
    // });
  } else {
    composeEnhancers = compose;
  }

  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: createSagaMonitor({
      level: "debug", // logging level
      verbose: true, // verbose mode
      effectCancel: true, // show cancelled effects
      actionDispatch: true, // show dispatched actions
    }),
  });

  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    createRootReducer({ history }),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware, epicMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  epicMiddleware.run(rootEpic);

  return store;
}
