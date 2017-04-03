import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import Dashboard from '../components/Dashboard';
import IntakeForm from '../components/IntakeForm';
import BookingForm from '../components/BookingForm';

export default LoggedInRoutes = (
    <Switch>
        <Route path='/intakeform' component={IntakeForm} />
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/bookingform/:clientID' component={BookingForm}/>
        <Redirect from='/' to='/dashboard' />
    </Switch>
)
