import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import LinearProgress from 'material-ui/LinearProgress';
import ClientInfoStep from './ClientInfoStep';
import AgreementStep from './AgreementStep';
import FinishedStep from './FinishedStep';

const style = {
    container: {
        margin: 5
    },
    navButton: {
        margin: 10
    },
    finishedStepContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    finishedStepNavButtons: {
        display: 'inline'
    },
    linearProgressContainer: {
        paddingBottom: 10,
        width: '95%'
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

    _getSubmitButton(isSaved) {
        return (isSaved ?
                <RaisedButton style={style.navButton} primary={true} label='Saved!' disabled={true} /> :
                <RaisedButton style={style.navButton} primary={true} label='Submit' onTouchTap={this._handleSubmit.bind(this)} />
        )
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
                    <div style={style.finishedStepContainer}>
                        <FinishedStep onSubmitIntake={this.props.onSubmitIntake} onClickPreviousStep={this.props.onClickPreviousStep} />
                        <div style={style.finishedStepNavButtons}>
                            <RaisedButton style={style.navButton} label="Previous" onTouchTap={this.props.onClickPreviousStep} />
                            {this._getSubmitButton(this.props.isSaved)}
                        </div>

                        {this.props.savingForm ?
                            <div style={style.linearProgressContainer}>
                                <LinearProgress mode="indeterminate" />
                            </div> :
                            null
                        }

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
                <div style={style.container}>
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
    stepIndex: PropTypes.number.isRequired,
    isSaved: PropTypes.bool.isRequired,
    savingForm: PropTypes.bool.isRequired,
    formID: PropTypes.string
};

export default Intake;