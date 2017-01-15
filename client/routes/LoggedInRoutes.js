import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router'
import App from '../components/app';

export default LoggedInRoutes = (
    <Route path='/'>
        <IndexRedirect to='/dashboard' />
        <Route path='/:appname' component={App}/>
    </Route>
)