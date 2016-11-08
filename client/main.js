import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './components/app';

const store = createStore(reducer);

const routes = (
    <Provider store={store}>
        <App />
    </Provider>
);

Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});