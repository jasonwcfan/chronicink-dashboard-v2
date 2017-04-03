import React from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import Login from '../components/Login';
import IntakeForm from '../components/IntakeForm'

export default LoggedInRoutes = (
    <Switch>
        <Route path='/login' component={withRouter(Login)} />
        <Route path='/intakeform' component={IntakeForm} />
        <Redirect from='/' to='/login' />
    </Switch>
)
