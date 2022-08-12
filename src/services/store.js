
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../services/reducers/index.js';
import { socketMiddleware } from './socketMiddleware.js';

import { wsUrl } from '../utils/utils.ts';
import { wsActions } from './actions/wsActions.js';

console.log(wsActions);

const composeEnhancers =
typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducer, enhancer);

export {store};
