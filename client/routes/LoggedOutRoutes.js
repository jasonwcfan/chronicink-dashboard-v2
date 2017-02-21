import React from 'react';
import { Route, Redirect, withRouter, IndexRedirect } from 'react-router'
import Login from '../components/Login';
import IntakeForm from '../components/NewIntakeForm'

export default LoggedInRoutes = (
    <Route path='/'>
        <Route path='login' component={withRouter(Login)} />
        <Route path='intakeform' component={IntakeForm} />
        <Redirect from='*' to='/login' />
        <IndexRedirect to='/login' />
    </Route>
)