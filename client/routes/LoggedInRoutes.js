import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router'
import App from '../components/app';
import IntakeForm from '../components/IntakeForm';

export default LoggedInRoutes = (
    <Route path='/'>
        <IndexRedirect to='/dashboard' />
        <Route path='/intakeform' component={IntakeForm} />
        <Route path='/intakeform/:mode' component={IntakeForm} />
        <Route path='/:appname' component={App}/>
    </Route>
)
