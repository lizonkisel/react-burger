
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import { socketMiddleware } from './socketMiddleware';

import { wsUrl } from '../utils/utils';
import { wsActions } from './constants/wsActionTypes';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// const composeEnhancers =

// typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//   : compose;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducer, enhancer);

export {store};
