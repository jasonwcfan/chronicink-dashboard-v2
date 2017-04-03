import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import Login from '../components/Login';
import IntakeForm from '../components/IntakeForm'

export default LoggedInRoutes = (
    <Switch>
        <Route path='/login' component={Login} />
        <Route path='/intakeform' component={IntakeForm} />
        <Redirect from='/' to='/login' />
    </Switch>
)
