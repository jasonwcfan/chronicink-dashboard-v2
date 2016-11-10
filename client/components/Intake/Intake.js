import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import ClientInfoStep from './ClientInfoStep';
import AgreementStep from './AgreementStep';
import FinishedStep from './FinishedStep';

const style = {
    navButton: {
        margin: 10
    }
};

class Intake extends Component {
    constructor(props) {
        super(props);
    }

    _handleSubmit() {
        const form = {
            fields: this.props.fields,
            agreements: this.props.agreements,
            medicalConditions: this.props.medicalConditions
        };
        this.props.onSubmitIntakeForm(form);
    }

    _getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <ClientInfoStep onFieldChange={this.props.onFieldChange} fields={this.props.fields} onToggleMedicalCondition={this.props.onToggleMedicalCondition} medicalConditions={this.props.medicalConditions} />
                        <RaisedButton style={style.navButton} label="Next" primary={true} onTouchTap={this.props.onClickNextStep} />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <AgreementStep onToggleAgreement={this.props.onToggleAgreement} agreements={this.props.agreements} />
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this.props.onClickPreviousStep} />
                        <RaisedButton style={style.navButton} label="Next" primary={true} onTouchTap={this.props.onClickNextStep} />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <FinishedStep onSubmitIntake={this.props.onSubmitIntake} onClickPreviousStep={this.props.onClickPreviousStep} />
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this.props.onClickPreviousStep} />
                        <RaisedButton style={style.navButton} primary={true} label="Submit" onTouchTap={this._handleSubmit.bind(this)} />
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
        label: PropTypes.string,
        inputType: PropTypes.string.isRequired,
        value: PropTypes.any,
        valid: PropTypes.bool.isRequired,
        required: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    medicalConditions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    stepIndex: PropTypes.number.isRequired
};

export default Intake;