import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/app/app.jsx';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers/index.js';


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// const initialState = {
//   allIngredients: null,
//   constructorIngredients: null,
//   currentIngredient: null,
//   order: null
// };

// const store = createStore(rootReducer, initialState, enhancer);
const store = createStore(rootReducer, enhancer);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
