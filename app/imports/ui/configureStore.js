import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';

import { composeWithDevTools } from 'redux-devtools-extension';

import { createRootReducer } from './redux';

export default function configureStore(initialState = {}, rootEpic, history) {
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

  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    createRootReducer({ history }),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
