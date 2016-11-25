import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect } from 'react-router'
import reducer from './reducers'
// import LoginContainer from './components/Login';
import AppContainer from './containers/AppContainer';

const logger = createLogger();

const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));

const routes = (
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path='/'>
                <IndexRoute component={AppContainer} />
                <Route path=':appname' component={AppContainer} />
            </Route>
        </Router>
    </Provider>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});