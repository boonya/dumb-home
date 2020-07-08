import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';

import { composeWithDevTools } from 'redux-devtools-extension';

import { createRootReducer } from './redux';

export default function configureStore(initialState = {}, rootEpic, history) {
  let composeEnhancers;

  // TODO: Use ENV VAR in this place somehow
  const isDevelopment = true;
  if (isDevelopment) {
    composeEnhancers = composeWithDevTools;
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
