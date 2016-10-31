import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import ClientInfoPane from './ClientInfoPane';
import DepositPane from './DepositPane';
import BookingInfoPane from './BookingInfoPane';

class IntakeForm extends Component {
    constructor() {
        super();
    }

    submit(event) {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <Paper zDepth={4}>
                <AppBar title='Intake' />
                <form onSubmit={this.submit}>
                    <Tabs>
                        <Tab label='Client Info'>
                            <ClientInfoPane />
                        </Tab>
                        <Tab label='Deposit'>
                            <DepositPane />
                        </Tab>
                        <Tab label='Booking Info'>
                            <BookingInfoPane />
                        </Tab>
                        <Tab label='Calendar'>
                            Calendar Pane
                        </Tab>
                        <Tab label='Recommendations'>
                            Recommendations Pane
                        </Tab>
                    </Tabs>
                </form>
            </Paper>
        );
    }
}

export default IntakeForm;