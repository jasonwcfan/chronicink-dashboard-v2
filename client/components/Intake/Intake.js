import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import ClientInfoPane from './ClientInfoPane';
import DepositPane from './DepositPane';
import BookingInfoPane from './BookingInfoPane';

const style = {
    navButton: {
        margin: 10
    }
};

class Intake extends Component {
    constructor() {
        super();
        this.state = {
            valid: false,
            stepIndex: 0,
            finished: false,
            fields: {
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
            }
        }
    }

    _handleChange(fieldName, value) {
        console.log(fieldName);
        console.log(value);
        this.setState({
            [fieldName]: value
        });
    }

    _handleNext() {
        this.setState({
            stepIndex: this.state.stepIndex + 1,
            finished: this.state.stepIndex >= 1,
        });
    }

    _handlePrev() {
        this.setState({
            stepIndex: this.state.stepIndex > 0 ? this.state.stepIndex - 1 : this.state.stepIndex
        });
    }

    _getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <ClientInfoPane onChange={this._handleChange.bind(this)} />
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this._handlePrev.bind(this)} />
                        <RaisedButton style={style.navButton} label="Next" primary={true} onTouchTap={this._handleNext.bind(this)} />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <DepositPane onChange={this._handleChange.bind(this)} />
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this._handlePrev.bind(this)} />
                        <RaisedButton style={style.navButton} label="Next" primary={true} onTouchTap={this._handleNext.bind(this)} />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this._handlePrev.bind(this)} />
                    </div>
                );
        }
    }

    render() {
        return (
            <Paper zDepth={4}>
                <AppBar title='Intake' />
                <Stepper activeStep={this.state.stepIndex}>
                    <Step>
                        <StepLabel>Personal Information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Agreement</StepLabel>
                    </Step>
                </Stepper>
                <div>
                    {this._getStepContent(this.state.stepIndex)}
                </div>
            </Paper>
        );
    }
}

export default Intake;