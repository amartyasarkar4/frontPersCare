import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore,applyMiddleware,combineReducers,compose}from "redux";
import {Provider}from "react-redux";
import ReduxThunk from "redux-thunk";

import {anreducer}from "./store/reducer/firstCheck";
import {FetchBehavReducer}from "./store/reducer/behavFetchReducer";

let composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger=store=>{
  return next=>{
    return action=>{
      console.log("[MiddleWare] dispatching ",action);
      const result=next(action);
      return result;
    }
  }
}
const RootReducer=combineReducers({
  anReducer:anreducer,
  FetchBehavReducer:FetchBehavReducer
})
const store=createStore(RootReducer,composeEnhancers(
  applyMiddleware(logger,ReduxThunk)
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
