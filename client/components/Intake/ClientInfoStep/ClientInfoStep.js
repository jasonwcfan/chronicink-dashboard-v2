import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import MedicalConditionsChecklist from './MedicalConditionsChecklist';
import { ValidatedTextField, ValidatedDatePicker, CountrySelector, RegionSelector  } from '../Inputs';

const style = {
    container: {
        padding: 5
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
    }
};

class ClientInfoStep extends Component {
    constructor(props) {
        super(props);
    }

    _renderFields(fields) {
        return fields.map((field) => {
            switch (field.inputType) {
                case 'text':
                    return (
                        <ValidatedTextField 
                            style={style.textField}
                            defaultValue={field.value}
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
                            defaultValue={field.value}
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
                            value={field.value}
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
                            defaultDate={field.value}
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
            <div style={style.container}>
                {this._renderFields(this.props.fields)}
                <h2>Medical Conditions</h2><br />
                <MedicalConditionsChecklist medicalConditions={this.props.medicalConditions} onToggleMedicalCondition={this.props.onToggleMedicalCondition}/>
            </div>
        );

    }
}


export default ClientInfoStep;