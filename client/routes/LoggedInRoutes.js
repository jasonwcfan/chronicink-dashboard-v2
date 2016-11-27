import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router'
import App from '../components/app';

export default LoggedInRoutes = (
    <Route path='/'>
        <IndexRedirect to='app/dashboard' />
        <Route path='app/:appname' component={App}/>
        <Redirect from='/*' to='app/dashboard'/>
    </Route>
)