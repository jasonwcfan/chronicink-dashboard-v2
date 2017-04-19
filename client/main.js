import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom'
import reducer from './reducers'
import { LoggedInRoutes, LoggedOutRoutes } from './routes';

const logger = createLogger();

const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));

const routes = (
    <Provider store={store}>
        <BrowserRouter>
            { Meteor.userId() ? LoggedInRoutes : LoggedOutRoutes }
        </BrowserRouter>
    </Provider>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});