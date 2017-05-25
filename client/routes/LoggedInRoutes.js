import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import Dashboard from '../components/Dashboard';
import IntakeForm from '../components/IntakeForm';
import BookingForm from '../components/BookingForm';
import Preferences from '../components/Preferences';
import Cancellations from '../components/Cancellations';

export default LoggedInRoutes = (
    <Switch>
        <Route path='/intakeform' component={IntakeForm} />
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/bookingform/:clientID' component={BookingForm}/>
        <Route path='/preferences' component={Preferences} />
        <Route path='/cancellations' component={Cancellations} />
        <Redirect from='/' to='/dashboard' />
    </Switch>
)
