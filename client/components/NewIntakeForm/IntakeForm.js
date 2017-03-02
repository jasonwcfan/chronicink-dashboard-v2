import React, { Component, PropTypes } from 'react';
import { createContainer } from 'react-meteor-data';
import Radium from 'radium';
import { StyleRoot } from 'radium';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
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

        form.fields.dateOfBirth.value = Moment(form.fields.dateOfBirth.value, 'DD-MM-YYYY').toDate();

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

    _handleToggleMedicalCondition(idx) {
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

    _incrementStep(e) {
        e.preventDefault();
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

    render() {
        let customMuiTheme = lightBaseTheme;
        customMuiTheme.palette.primary1Color = colors.CitDarkGrey;
        customMuiTheme.palette.accent1Color = colors.CitGold;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(customMuiTheme)}>
                <StyleRoot>
                    <div>
                        <div>
                            <img key='logo' src={'images/chronicink_logo.png'} style={style.logo}/>
                        </div>
                        <Tabs value={this.state.stepIndex}>
                            <Tab
                                label={window.innerWidth > 425 ? 'Personal Info' : null}
                                icon={<PersonalInfoIcon />}
                                value={0}
                                onActive={() => {this.setState({stepIndex: 0})}}
                            >
                                <ClientInfoStep
                                    onFieldChange={this._handleFieldChange}
                                    formTemplate={this.props.formTemplate}
                                    formValues={this.state.fields}
                                    onToggleMedicalCondition={this._handleToggleMedicalCondition}
                                    medicalConditions={this.state.medicalConditions} />
                                <div style={style.navButtonContainer}>
                                    <RaisedButton style={style.navButton} label='Next' secondary={true} onTouchTap={this._incrementStep} />
                                </div>
                            </Tab>
                            <Tab
                                label={window.innerWidth > 425 ? 'Disclaimer' : null}
                                icon={<DisclaimerIcon />}
                                value={1}
                                onActive={() => {this.setState({stepIndex: 1})}}
                            >
                                <AgreementStep
                                    onToggleAgreement={this._handleToggleAgreement}
                                    agreements={this.state.disclaimerAgreements} />
                                <div style={style.navButtonContainer}>
                                    <RaisedButton style={style.navButton} label="Previous" primary={true} onTouchTap={this._decrementStep} />
                                    <RaisedButton style={style.navButton} label="Next" secondary={true} onTouchTap={this._incrementStep} />
                                </div>
                            </Tab>
                            <Tab
                                label={window.innerWidth > 425 ? 'Availability' : null}
                                icon={<AvailabilityIcon />}
                                value={2}
                                onActive={() => {this.setState({stepIndex: 2})}}
                            >
                                <AvailabilityStep
                                    fields={this.state.fields}
                                    disclaimerAgreements={this.state.disclaimerAgreements}
                                    resetStep={this._resetStep}
                                    handleSubmit={this._handleSubmit}
                                    isSaving={this.state.isSaving}
                                    cancellationAvailability={this.state.cancellationAvailability}
                                    onToggleCancellationAvailability={this._handleToggleCancellationAvailability}
                                />
                                <div style={style.navButtonContainer}>
                                    <RaisedButton style={style.navButton} label="Previous" primary={true} onTouchTap={this._decrementStep} />
                                    {this.state.isSaving ? <RaisedButton style={style.navButton} primary={true} label='Saving...' disabled={true} /> :
                                        <RaisedButton style={style.navButton} secondary={true} label='Submit' onTouchTap={this._handleSubmit} />}
                                </div>
                            </Tab>
                            <Tab
                                label={window.innerWidth > 425 ? 'Call Us' : null}
                                icon={<CallUsIcon />}
                                value={3}
                                onActive={() => {this.setState({stepIndex: 3})}}
                            >
                                <CallUsStep/>
                            </Tab>
                        </Tabs>
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
}, Radium(IntakeForm));