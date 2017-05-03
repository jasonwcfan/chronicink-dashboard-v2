import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { LoggedInRoutes, LoggedOutRoutes } from './routes';

const routes = (
    <BrowserRouter>
        { Meteor.userId() ? LoggedInRoutes : LoggedOutRoutes }
    </BrowserRouter>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});