import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/app/app.jsx';
import reportWebVitals from './reportWebVitals';

import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers/index.js';


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const initialState = {
  allIngredients: [],
  constructorIngredients: [],
  currentIngredient: [],
  order: {}
};

const store = createStore(rootReducer, initialState, enhancer);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
