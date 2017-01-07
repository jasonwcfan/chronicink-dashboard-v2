import React, { Component, PropTypes } from 'react';
import { createContainer } from 'react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
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
    }

    _handleSubmit() {
        const form = {
            fields: this.state.fields,
            agreements: this.state.disclaimerAgreements,
            medicalConditions: this.state.medicalConditions
        };
        Meteor.call('intake.insertForm', form);
    }

    _handleFieldChange(id, value, valid) {
        const newFields = _.extend({}, this.state.fields);
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
                    </div>
                );
            case 2:
                return (
                    <div style={style.finishedStepContainer}>
                        <FinishedStep
                            fields={this.state.fields}
                            disclaimerAgreements={this.state.disclaimerAgreements}
                            decrementStep={this._decrementStep}
                            isSaved={this.state.isSaved}
                        />

                        {this.state.savingForm ?
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
            <div>
                <Stepper activeStep={this.state.stepIndex}>
                    <Step>
                        <StepLabel>Personal Information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Agreement</StepLabel>
                    </Step>
                </Stepper>
                <div style={style.container}>
                    {this._renderStepContent(this.state.stepIndex)}
                </div>
            </div>
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
    // isSaved: PropTypes.bool.isRequired,
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
}, IntakeForm);