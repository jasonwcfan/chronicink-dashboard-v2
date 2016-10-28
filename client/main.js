import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import IntakeForm from './components/intake';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="intake" />
        </Route>
    </Router>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});