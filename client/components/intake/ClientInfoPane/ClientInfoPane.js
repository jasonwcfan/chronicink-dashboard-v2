import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { CountrySelector, RegionSelector } from './Geography';
import MedicalConditionsPane from './MedicalConditionsPane';
import { ValidatedTextField, EmailTextField, PhoneNumberTextField } from '../Inputs';

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

class ClientInfoPane extends Component {
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
                        <DatePicker
                            style={style.datePicker}
                            defaultDate={field.value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onChange={this.props.onFieldChange}
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
                <MedicalConditionsPane conditions={this.props.conditions} onToggleCondition={this.props.onToggleCondition}/>
            </div>
        );

    }
}


export default ClientInfoPane;