import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers'
import App from './components/app';

const logger = createLogger();

const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));

const routes = (
    <Provider store={store}>
        <App />
    </Provider>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});