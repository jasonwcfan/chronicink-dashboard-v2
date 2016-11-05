import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ClientInfoPane from './ClientInfoPane';
import DepositPane from './DepositPane';
import BookingInfoPane from './BookingInfoPane';

class Intake extends Component {
    constructor() {
        super();
        this.state = {
            valid: false,
            firstName: {
                valid: false,
                value: null
            },
            lastName: {
                valid: false,
                value: null
            },
            address: {
                valid: false,
                value: null
            },
            secondaryAddress: {
                valid: false,
                value: null
            },
            city: {
                valid: false,
                value: null
            },
            postalCode: {
                valid: false,
                value: null
            },
            email: {
                valid: false,
                value: null
            },
            primaryPhoneNumber: {
                valid: false,
                value: null
            },
            secondaryPhoneNumber: {
                valid: false,
                value: null
            },
            medicalConditions: [],
            dateOfBirth: {
                valid: false,
                value: null
            },
            acceptDisclaimer: {
                valid: false,
                value: null
            },
            leaveDeposit: {
                valid: false,
                value: null
            },
            subscribeNewsletter: {
                valid: false,
                value: null
            },
            studio: {
                valid: false,
                value: null
            },
            custom: {
                valid: false,
                value: null
            },
            coverup: {
                valid: false,
                value: null
            },
            style: {
                valid: false,
                value: null
            },
            placement: {
                valid: false,
                value: null
            },
            size: {
                valid: false,
                value: null
            },
            colour: {
                valid: false,
                value: null
            },
            skintone: {
                valid: false,
                value: null
            },
            subject: {
                valid: false,
                value: null
            },
            feel: {
                valid: false,
                value: null
            },
            background: {
                valid: false,
                value: null
            },
            rateType: {
                valid: false,
                value: null
            },
            rate: {
                valid: false,
                value: null
            },
            deposit: {
                valid: false,
                value: null
            }
        }
    }

    _handleChange(fieldName, value) {
        this.setState({
            [fieldName]: value
        })
    }

    render() {
        return (
            <Paper zDepth={4}>
                <AppBar title='Intake' />
                <Tabs>
                    <Tab label='Client Info'>
                        <ClientInfoPane onChange={this._handleChange} />
                    </Tab>
                    <Tab label='Deposit'>
                        <DepositPane onChange={this._handleChange}/>
                    </Tab>
                    <Tab label='Booking Info'>
                        <BookingInfoPane onChange={this._handleChange} />
                        <RaisedButton style={{margin: 5}} type="submit" label="Submit Form" primary={true}/>
                        <RaisedButton style={{margin: 5}} label="Save Form" secondary={true}/>
                    </Tab>
                    {/**<Tab label='Calendar'>
                        <p>Coming Soon</p>
                    </Tab>
                    <Tab label='Recommendations'>
                        <p>Coming Soon</p>
                    </Tab> **/}
                </Tabs>
            </Paper>
        );
    }
}

export default Intake;