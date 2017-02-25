import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import MedicalConditionsChecklist from './MedicalConditionsChecklist';
import { ValidatedTextField, ValidatedDatePicker, CountrySelector, RegionSelector  } from '../../Inputs';

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
            switch (field.inputType) {
                case 'textField':
                    return (
                        <ValidatedTextField 
                            style={style.textField}
                            defaultValue={this.props.formValues[field.id].value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                        />
                    );
                case 'phoneNumber':
                    return (
                        <ValidatedTextField
                            style={style.textField}
                            defaultValue={this.props.formValues[field.id].value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        />
                    );
                case 'email':
                    return (
                        <ValidatedTextField
                            style={style.textField}
                            defaultValue={this.props.formValues[field.id].value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                        />
                    );
                case 'country':
                    return (
                        <CountrySelector
                            style={style.selector}
                            defaultValue={this.props.formValues[field.id].value}
                            name={field.id}
                            key={field.id}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                        />
                    );
                case 'region':
                    return (
                        <RegionSelector
                            style={style.selector}
                            value={this.props.formValues[field.id].value}
                            name={field.id}
                            key={field.id}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            selectedCountry={this.props.formValues.country.value}
                        />
                    );
                case 'date':
                    return (
                        <ValidatedTextField
                            style={style.textField}
                            name={field.id}
                            key={field.id}
                            defaultValue={this.props.formValues[field.id].value}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                            mask={[/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-2]/, /[09]/, /\d/, /\d/]}
                        />

                    );
            }
        });
    }

    render() {
        return (
            <div style={style.container}>
                <h2 style={style.header}>Personal Information</h2><br />
                <div style={style.fieldsContainer}>
                    {this._renderFields(this.props.formTemplate)}
                </div>
                <h2 style={style.header}>Medical Conditions</h2><br />
                <MedicalConditionsChecklist medicalConditions={this.props.medicalConditions} onToggleMedicalCondition={this.props.onToggleMedicalCondition}/>
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