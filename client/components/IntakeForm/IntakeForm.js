import React, { Component, PropTypes } from 'react';
import { createContainer } from 'react-meteor-data';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import defaultFields from '../../constants/defaultIntakeFormFields';
import medicalConditions from '../../constants/medicalConditions';
import disclaimerAgreements from '../../constants/defaultDisclaimerAgreements';
import ClientInfoStep from './ClientInfoStep';
import AgreementStep from './AgreementStep';
import FinishedStep from './FinishedStep';
import Intake from '../../../imports/Intake/intake';
import Client from '../../../imports/Client/client';

const style = {
    container: {
        margin: 5
    },
    navButton: {
        margin: 10
    },
    finishedStepContainer: {
        display: 'flex',
        minHeight: 500,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearProgressContainer: {
        paddingBottom: 10,
        width: '95%'
    }
};

class IntakeForm extends Component {
    constructor(props) {
        super(props);

        this.state = (() => {
            const state = {
                fields: {},
                medicalConditions: props.medicalConditions,
                disclaimerAgreements: props.disclaimerAgreements,
                cancellationAvailability: {
                    monday: {
                        afternoon: false,
                        evening: false
                    },
                    tuesday: {
                        afternoon: false,
                        evening: false
                    },
                    wednesday: {
                        afternoon: false,
                        evening: false
                    },
                    thursday: {
                        afternoon: false,
                        evening: false
                    },
                    friday: {
                        afternoon: false,
                        evening: false
                    },
                    saturday: {
                        afternoon: false,
                        evening: false
                    },
                    sunday: {
                        afternoon: false,
                        evening: false
                    }
                },
                isSaved: false,
                isSaving: false,
                formID: null,
                stepIndex: 0
            };

            props.formTemplate.forEach(function(field) {
                state.fields[field.id] = {
                    value: field.value,
                    id: field.id,
                    valid: field.valid,
                    label: field.label
                }
            });
            return state;
        })();

        this._handleFieldChange = this._handleFieldChange.bind(this);
        this._handleToggleMedicalCondition = this._handleToggleMedicalCondition.bind(this);
        this._handleToggleAgreement = this._handleToggleAgreement.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._incrementStep = this._incrementStep.bind(this);
        this._decrementStep = this._decrementStep.bind(this);
        this._resetStep = this._resetStep.bind(this);
        this._handleToggleCancellationAvailability = this._handleToggleCancellationAvailability.bind(this);
    }

    _handleSubmit() {
        const form = {
            fields: this.state.fields,
            agreements: this.state.disclaimerAgreements,
            medicalConditions: this.state.medicalConditions,
            cancellationAvailability: this.state.cancellationAvailability
        };
        this.setState({
            isSaving: true
        });
        console.log('submitting');
        Meteor.call('intake.insertForm', form, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                this.setState({
                    isSaving: false,
                    isSaved: true,
                    stepIndex: 3
                })
            }
        });
    }

    _handleFieldChange(id, value, valid) {
        const newFields = {...this.state.fields};
        newFields[id].value = value;
        newFields[id].valid = valid;

        this.setState({
            fields: newFields,
            isSaved: false
        })
    }

    _handleToggleMedicalCondition(idx, condition) {
        const newConditions = [...this.state.medicalConditions];
        newConditions[idx].value = !newConditions[idx].value;

        this.setState({
            medicalConditions: newConditions
        })
    }

    _handleToggleAgreement(idx) {
        const newAgreements = [...this.state.disclaimerAgreements];
        newAgreements[idx].value = !newAgreements[idx].value;

        this.setState({
            disclaimerAgreements: newAgreements
        })
    }

    _handleToggleCancellationAvailability(day, time, value) {
        const newCancellationAvailability = {...this.state.cancellationAvailability};
        newCancellationAvailability[day][time] = value;
        this.setState({
            cancellationAvailability: newCancellationAvailability
        })
    }

    _incrementStep() {
        this.setState({
            stepIndex: this.state.stepIndex < 2 ? this.state.stepIndex + 1 : 2
        })
    }

    _decrementStep() {
        this.setState({
            stepIndex: this.state.stepIndex > 0 ? this.state.stepIndex - 1 : 0
        })
    }

    _resetStep() {
        this.setState({
            stepIndex: 0
        })
    }

    _renderStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <ClientInfoStep
                            onFieldChange={this._handleFieldChange}
                            formTemplate={this.props.formTemplate}
                            formValues={this.state.fields}
                            onToggleMedicalCondition={this._handleToggleMedicalCondition}
                            medicalConditions={this.state.medicalConditions} />
                        <RaisedButton style={style.navButton} label="Next" primary={true} onTouchTap={this._incrementStep} />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <AgreementStep
                            onToggleAgreement={this._handleToggleAgreement}
                            agreements={this.state.disclaimerAgreements} />
                        <RaisedButton style={style.navButton} label="Previous" onTouchTap={this._decrementStep} />
                        <RaisedButton style={style.navButton} label="Next" primary={true} onTouchTap={this._incrementStep} />
                        {}
                    </div>
                );
            case 2:
                return (
                    <div style={style.finishedStepContainer}>
                        <FinishedStep
                            fields={this.state.fields}
                            disclaimerAgreements={this.state.disclaimerAgreements}
                            resetStep={this._resetStep}
                            handleSubmit={this._handleSubmit}
                            isSaving={this.state.isSaving}
                            cancellationAvailability={this.state.cancellationAvailability}
                            onToggleCancellationAvailability={this._handleToggleCancellationAvailability}
                        />

                        {this.state.savingForm ?
                            <div style={style.linearProgressContainer}>
                                <LinearProgress mode="indeterminate" />
                            </div> :
                            null
                        }

                    </div>
                );
            case 3:
                return (
                    <div style={style.finishedStepContainer}>
                        <h2>Thank you!</h2>
                        <p style={{textAlign: 'center'}}>If you are in the shop, please let a staff member know that you've completed the form. Otherwise, please give us a call when you are ready to leave your deposit.</p>
                        <p style={{textAlign: 'center'}}>NOTE: The submission of this form does not imply that an appointment or booking has been made. Please contact us if you would like to continue with your consultation.
                        This form will be deleted in 24 hours if no official booking and deposit has been completed.
                        </p>
                    </div>
                );
        }
    }

    render() {
        return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div>
                <Paper style={style.appContainer} zDepth={4}>
                    <AppBar
                        title='Intake Form'
                    />
                    <Stepper activeStep={this.state.stepIndex}>
                        <Step>
                            <StepLabel>Personal Information</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Disclaimer</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Submit</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={style.container}>
                        {this._renderStepContent(this.state.stepIndex)}
                    </div>
                </Paper>
            </div>
        </MuiThemeProvider>
        );
    }
}

IntakeForm.propTypes = {
    formTemplate: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        inputType: PropTypes.string.isRequired,
        value: PropTypes.any,
        valid: PropTypes.bool.isRequired,
        required: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    form: PropTypes.object
    // stepIndex: PropTypes.number.isRequired,
    // savingForm: PropTypes.bool.isRequired,
    // formID: PropTypes.string
};

export default IntakeForm = createContainer(({ clientID }) => {
    const formSubscription = Meteor.subscribe('intake');
    const clientSubscription = Meteor.subscribe('client');

    return {
        formSubReady: formSubscription.ready(),
        clientSubReady: clientSubscription.ready(),
        form: Intake.findOne({clientID: clientID}),
        client: clientID ? Client.findOne({_id: clientID}) : null,
        formTemplate: defaultFields,
        medicalConditions: medicalConditions.map((condition) => {
            return {
                id: condition,
                value: false
            }
        }),
        disclaimerAgreements
    }
}, withRouter(IntakeForm));