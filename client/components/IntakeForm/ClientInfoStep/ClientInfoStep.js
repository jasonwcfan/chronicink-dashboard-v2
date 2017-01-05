import React, { Component } from 'react';
import MedicalConditionsChecklist from './MedicalConditionsChecklist';
import { ValidatedTextField, ValidatedDatePicker, CountrySelector, RegionSelector  } from '../../Inputs';

const style = {
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
                        />
                    );
                case 'date':
                    return (
                        <ValidatedDatePicker
                            style={style.datePicker}
                            defaultDate={this.props.formValues[field.id].value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                        />

                    );
            }
        });
    }

    render() {
        return (
            <div>
                {this._renderFields(this.props.formTemplate)}
                <h2>Medical Conditions</h2><br />
                <MedicalConditionsChecklist medicalConditions={this.props.medicalConditions} onToggleMedicalCondition={this.props.onToggleMedicalCondition}/>
            </div>
        );

    }
}


export default ClientInfoStep;