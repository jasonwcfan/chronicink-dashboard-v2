import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Tracker } from 'meteor/tracker';
import IntakeForm from '../imports/IntakeForm/intakeForm';
import reducer from './reducers'
import AppContainer from './containers/AppContainer';

const logger = createLogger();

const store = createStore(reducer, applyMiddleware(ReduxThunk, logger));

const routes = (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);

Meteor.subscribe('intakeForm');

Tracker.autorun(() => {
    store.dispatch({
        type: 'UPDATE_INTAKE_LIST',
        id: 'intakeList',
        data: IntakeForm.find().fetch()
    })
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});