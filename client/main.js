import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect, withRouter} from 'react-router'
import reducer from './reducers'
import Login from './components/Login';
import App from './components/app';
import { LoggedInRoutes, LoggedOutRoutes } from './routes';

const logger = createLogger();

const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));

const routes = (
    <Provider store={store}>
        <Router history={browserHistory} >
            { Meteor.userId() ? LoggedInRoutes : LoggedOutRoutes }
        </Router>
    </Provider>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});