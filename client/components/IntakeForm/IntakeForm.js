import React, { Component, PropTypes } from 'react';
import { createContainer } from 'react-meteor-data';
import Radium from 'radium';
import Moment from 'moment';
import { StyleRoot } from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import PersonalInfoIcon from 'material-ui/svg-icons/action/account-circle';
import DisclaimerIcon from 'material-ui/svg-icons/action/assignment';
import AvailabilityIcon from 'material-ui/svg-icons/action/date-range';
import CallUsIcon from 'material-ui/svg-icons/communication/call';
import colors from '../../constants/colors';
import defaultFields from '../../constants/defaultIntakeFormFields';
import medicalConditions from '../../constants/medicalConditions';
import disclaimerAgreements from '../../constants/defaultDisclaimerAgreements';
import ClientInfoStep from './ClientInfoStep';
import AgreementStep from './AgreementStep';
import AvailabilityStep from './AvailabilityStep';
import CallUsStep from './CallUsStep';
import Intake from '../../../imports/Intake/intake';
import Client from '../../../imports/Client/client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Tabs, Tab } from 'material-ui/Tabs';

const style = {
    container: {
        margin: 5
    },
    logo: {
        height: 72,
        display: 'block',
        margin: 'auto',
        '@media (max-width: 768px)': {
            height: 54
        }
    },
    navButton: {
        margin: 10
    },
    navButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        '@media (min-width: 1024px)': {
            justifyContent: 'flex-start'
        }
    },
    stepLabel: {
        fontFamily: 'Roboto, sans-serif',
    },
    finishedStepContainer: {
        display: 'flex',
        minHeight: 500,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        fontSize: '0.8em',
        fontFamily: 'Roboto, sans-serif',
        color: colors.CitGold,
        textAlign: 'center',
        backgroundColor: colors.CitDarkGrey,
        height: '42px',
        paddingTop: '6px'
    },
    homepageLink: {
        color: colors.CitGold
    }
};

class IntakeForm extends Component {
    constructor(props) {
        super(props);

        this.state = (() => {
            const state = {
                fields: {},
                medicalConditions: props.medicalConditions,
                otherCondition: '',
                filledInternally: props.params.mode == 'external' ? false : true,
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
                stepIndex: 0,
                showErrorDialog: false,
                errorDialog: {
                    stepIndex: 0,
                    message: '',
                    actions: null
                }
            };

            props.formTemplate.forEach(function(field) {
                state.fields[field.id] = {
                    value: field.value,
                    id: field.id,
                    errorText: field.required && !field.value ? `Not a valid ${field.label}` : null,
                    touched: false,
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
        this._handleOtherConditionChange = this._handleOtherConditionChange.bind(this);
        this._handleToggleFreeAnyTime = this._handleToggleFreeAnyTime.bind(this);
    }

    _handleSubmit() {
        const otherCondition = this.state.otherCondition ? {
            id: this.state.otherCondition,
            value: true
        } : null ;

        const form = {
            fieldInternally: this.state.filledInternally,
            fields: {...this.state.fields},
            agreements: this.state.disclaimerAgreements,
            medicalConditions: otherCondition ? this.state.medicalConditions.concat(otherCondition) : this.state.medicalConditions,
            cancellationAvailability: this.state.cancellationAvailability
        };

        console.log(form);

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

    _handleFieldChange(id, value, errorText) {
        const newFields = {...this.state.fields};
        newFields[id].value = value;
        newFields[id].errorText = errorText;
        newFields[id].touched = true;

        this.setState({
            fields: newFields,
            isSaved: false
        })
    }

    _handleToggleMedicalCondition(idx) {
        const newConditions = [...this.state.medicalConditions];
        console.log(newConditions);
        newConditions[idx].value = !newConditions[idx].value;

        this.setState({
            medicalConditions: newConditions
        })
    }

    _handleOtherConditionChange(condition) {
        this.setState({
            otherCondition: condition
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
        console.log(day, time, value);
        const newCancellationAvailability = {...this.state.cancellationAvailability};
        newCancellationAvailability[day][time] = value;
        this.setState({
            cancellationAvailability: newCancellationAvailability
        })
    }
    
    _handleToggleFreeAnyTime(value) {
        const newCancellationAvailability = {...this.state.cancellationAvailability};
        Object.keys(newCancellationAvailability).forEach((key) => {
            newCancellationAvailability[key]['afternoon'] = value;
            newCancellationAvailability[key]['evening'] = value;
        });

        this.setState({
            cancellationAvailability: newCancellationAvailability
        })
    }

    _incrementStep(e) {
        e.preventDefault();

        switch (this.state.stepIndex) {
            case 0:
                let hasFieldError = false;
                const fields = this.state.fields;

                Object.keys(fields).forEach((key) => {
                    if (fields[key].errorText) {
                        hasFieldError = true;
                        fields[key].touched = true;
                    }
                });

                if (hasFieldError) {
                    this.setState({
                        fields: fields,
                        showErrorDialog: true,
                        errorDialog: {
                            message: 'The form has some errors. Please fix them before moving on',
                            actions: [
                                <RaisedButton
                                    label='OK'
                                    secondary={true}
                                    onTouchTap={() => {
                                        this.setState({
                                            showErrorDialog: false
                                        })
                                    }}
                                />
                            ]
                        }
                    });
                    return;
                }
                break;
            case 1:
                let hasDisclaimerError = false;

                this.state.disclaimerAgreements.forEach((agreement) => {
                    if (agreement.required && !agreement.value) {
                        hasDisclaimerError = true;
                    }
                });

                if (hasDisclaimerError) {
                    this.setState({
                        showDisclaimerErrorDialog: true,
                        showErrorDialog: true,
                        errorDialog: {
                            message: 'You must accept the terms of the disclaimer and agree to leave a deposit',
                            actions: [
                                <RaisedButton
                                    label='OK'
                                    secondary={true}
                                    onTouchTap={() => {
                                        this.setState({
                                            showErrorDialog: false
                                        })
                                    }}
                                />
                            ]
                        }
                    });
                    return;
                }
                break;
        }
        window.scrollTo(0, 0);
        this.setState({
            stepIndex: this.state.stepIndex < 3 ? this.state.stepIndex + 1 : 2
        })
    }

    _decrementStep(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
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
                            medicalConditions={this.state.medicalConditions}
                            otherCondition={this.state.otherCondition}
                            onChangeOtherCondition={this._handleOtherConditionChange}
                        />
                        <div style={style.navButtonContainer}>
                            <RaisedButton style={style.navButton} labelStyle={{color: 'black'}} label='Next' secondary={true} onTouchTap={this._incrementStep} />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <AgreementStep
                            onToggleAgreement={this._handleToggleAgreement}
                            agreements={this.state.disclaimerAgreements} />
                        <div style={style.navButtonContainer}>
                            <RaisedButton style={style.navButton} label="Previous" onTouchTap={this._decrementStep} />
                            <RaisedButton style={style.navButton} labelStyle={{color: 'black'}} label="Next" secondary={true} onTouchTap={this._incrementStep} />
                        </div>
                        {}
                    </div>
                );
            case 2:
                return (
                    <div style={style.finishedStepContainer}>
                        <AvailabilityStep
                            cancellationAvailability={this.state.cancellationAvailability}
                            onToggleCancellationAvailability={this._handleToggleCancellationAvailability}
                            onToggleFreeAnyTime={this._handleToggleFreeAnyTime}
                        />
                        <div style={style.navButtonContainer}>
                            <RaisedButton style={style.navButton} label="Previous" onTouchTap={this._decrementStep} />
                            {this.state.isSaving ? <RaisedButton style={style.navButton} label='Saving...' disabled={true} /> :
                                <RaisedButton style={style.navButton} labelStyle={{color: 'black'}}  secondary={true} label='Submit' onTouchTap={this._handleSubmit} disabled={this.state.isSaved} />}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div style={style.callUsStepContainer}>
                        <CallUsStep/>
                    </div>
                );
        }
    }

    render() {
        let customMuiTheme = lightBaseTheme;
        customMuiTheme.palette.primary1Color = colors.CitGold;
        customMuiTheme.palette.accent1Color = colors.CitGold;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(customMuiTheme)}>
                <StyleRoot>
                    <div>
                        <div>
                            <img key='logo' src={'/images/chronicink_logo.png'} style={style.logo}/>
                        </div>
                        <Stepper activeStep={this.state.stepIndex}>
                            <Step>
                                <StepLabel style={style.stepLabel}>Personal Info</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={style.stepLabel}>Disclaimer</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={style.stepLabel}>My Availability</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={style.stepLabel}>Call Us</StepLabel>
                            </Step>
                        </Stepper>
                        <div>
                            {this._renderStepContent(this.state.stepIndex)}
                        </div>
                        <Dialog modal={true} actions={this.state.errorDialog.actions} open={this.state.showErrorDialog}>
                            {this.state.errorDialog.message}
                        </Dialog>
                    </div>
                    <div style={style.footer}>
                        {`Copyright ${Moment().year()} `}
                        <a style={style.homepageLink} href='http://www.chronicinktattoo.com'>Chronic Ink</a>
                    </div>
                </StyleRoot>
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
        errorText: PropTypes.string,
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
}, Radium(IntakeForm));
