import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Moment from 'moment';
import MedicalConditionsChecklist from './MedicalConditionsChecklist';
import { ValidatedTextField, ValidatedDatePicker, CountrySelector, RegionSelector, PhoneNumberField  } from '../../Inputs';

const style = {
    container: {
        marginLeft: 10
    },
    header: {
        fontFamily: 'Roboto, sans-serif',
        textAlign: 'center',
        '@media (min-width: 1024px)': {
            textAlign: 'left'
        }
    },
    fieldsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '@media (min-width: 1024px)': {
            justifyContent: 'flex-start'
        }
    },
    textField: {
        marginLeft: 5,
        marginRight: 5,
    },
    datePicker: {
        marginLeft: 5,
        marginRight: 5
    },
    selector: {
        marginLeft: 5,
        marginRight: 5
    },
    headerText: {
        textAlign: 'center'
    }
};

class ClientInfoStep extends Component {
    constructor(props) {
        super(props);
    }

    _renderFields(fields) {
        return fields.map((field) => {
            const formValue = this.props.formValues[field.id];
            switch (field.inputType) {
                case 'textField':
                    return (
                        <ValidatedTextField 
                            style={style.textField}
                            defaultValue={formValue.value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            errorText={formValue.errorText}
                            touched={formValue.touched}
                            validated={formValue.validated}
                        />
                    );
                case 'phoneNumber':
                    return (
                        <PhoneNumberField
                            style={style.textField}
                            value={formValue.value}
                            name={field.id}
                            key={field.id}
                            label={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            errorText={formValue.errorText}
                            touched={formValue.touched}
                            validated={formValue.validated}
                        />
                    );
                case 'email':
                    return (
                        <ValidatedTextField
                            style={style.textField}
                            defaultValue={formValue.value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                            errorText={formValue.errorText}
                            touched={formValue.touched}
                            validated={formValue.validated}
                        />
                    );
                case 'country':
                    return (
                        <CountrySelector
                            style={style.selector}
                            defaultValue={formValue.value}
                            name={field.id}
                            key={field.id}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            errorText={formValue.errorText}
                            touched={formValue.touched}
                            validated={formValue.validated}
                        />
                    );
                case 'region':
                    return (
                        <RegionSelector
                            style={style.selector}
                            value={formValue.value}
                            name={field.id}
                            key={field.id}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            selectedCountry={this.props.formValues.country.value}
                            errorText={formValue.errorText}
                            touched={formValue.touched}
                            validated={formValue.validated}
                        />
                    );
                case 'date':
                    return (
                        <ValidatedTextField
                            style={style.textField}
                            name={field.id}
                            key={field.id}
                            defaultValue={formValue.value}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                            validator={function(str){
                                const date = Moment(str, 'DD/MM/YYYY', true);
                                return date != null && date.isValid();
                            }}
                            errorText={formValue.errorText}
                            touched={formValue.touched}
                            validated={formValue.validated}
                            type='tel'
                        />

                    );
            }
        });
    }

    render() {
        return (
            <div style={style.container}>
                <h2 style={style.header}>My Info</h2><br />
                <div style={style.fieldsContainer}>
                    {this._renderFields(this.props.formTemplate)}
                </div>
                <h2 style={style.header}>Medical Conditions</h2><br />
                <MedicalConditionsChecklist
                    medicalConditions={this.props.medicalConditions}
                    onToggleMedicalCondition={this.props.onToggleMedicalCondition}
                    onChangeOtherCondition={this.props.onChangeOtherCondition}
                    otherCondition={this.props.otherCondition}
                />
            </div>
        );

    }
}

ClientInfoStep.propTypes = {
    formTemplate: PropTypes.array,
    formValues: PropTypes.object,
    medicalConditions: PropTypes.array
};

export default Radium(ClientInfoStep);