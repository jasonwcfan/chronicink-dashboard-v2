import React, { Component, PropTypes } from 'react';
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
    constructor(props) {
        super(props);
        console.log(props);
    }

    _handleChange(fieldName, value) {
        this.setState({
            [fieldName]: value
        });
    }

    _getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <ClientInfoPane onChange={this._handleChange.bind(this)} fields={this.props.fields} />
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this.props.onClickPreviousStep} />
                        <RaisedButton style={style.navButton} label="Next" primary={true} onTouchTap={this.props.onClickNextStep} />
                    </div>
                );
            case 1:
                return (
                    <div>
                        {/** <DepositPane onChange={this._handleChange.bind(this)} /> **/}
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this.props.onClickPreviousStep} />
                        <RaisedButton style={style.navButton} label="Next" primary={true} onTouchTap={this.props.onClickNextStep} />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this.props.onClickPreviousStep} />
                    </div>
                );
        }
    }

    render() {
        return (
            <Paper zDepth={4}>
                <AppBar title='Intake' />
                <Stepper activeStep={this.props.stepIndex}>
                    <Step>
                        <StepLabel>Personal Information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Agreement</StepLabel>
                    </Step>
                </Stepper>
                <div>
                    {this._getStepContent(this.props.stepIndex)}
                </div>
            </Paper>
        );
    }
}

Intake.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        valid: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    stepIndex: PropTypes.number.isRequired
};

export default Intake;