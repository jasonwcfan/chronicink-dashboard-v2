import React from 'react';
import { Route, Redirect, withRouter } from 'react-router'
import Login from '../components/Login';

export default LoggedInRoutes = (
    <Route path='/'>
        <Route path='login' component={withRouter(Login)} />
        <Redirect from='*' to='/login' />
    </Route>
)