import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, Link, browserHistory } from 'react-router'
import reducer from './reducers'
import AppContainer from './containers/AppContainer';
import IntakeFormContainer from './containers/IntakeFormContainer';

const logger = createLogger();

const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));

const routes = (
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path='/' component={AppContainer} >
                <Route path='intakeform' component={IntakeFormContainer} />
                <Route path='consultationform' component={IntakeFormContainer} />
            </Route>
        </Router>
    </Provider>
);

Meteor.subscribe('intakeForm');

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});