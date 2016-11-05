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
    render() {
        return (
            <div style={style.container}>
                <ValidatedTextField
                    style={style.textField}
                    defaultValue={this.props.fields.firstName.value}
                    name='firstName'
                    floatingLabelText='First Name'
                    onChange={this.props.onChange}
                    required
                />
                <ValidatedTextField
                    style={style.textField}
                    defaultValue={this.props.fields.lastName.value}
                    name='lastName'
                    floatingLabelText='Last Name'
                    onChange={this.props.onChange}
                    required
                /><br/>
                <ValidatedTextField
                    style={style.textField}
                    defaultValue={this.props.fields.address.value}
                    name='address'
                    floatingLabelText='Address'
                    onChange={this.props.onChange}
                    required
                />
                <ValidatedTextField
                    style={style.textField}
                    defaultValue={this.props.fields.secondaryAddress.value}
                    name='secondaryAddress'
                    floatingLabelText='Address Line 2'
                    onChange={this.props.onChange}
                    required />
                <ValidatedTextField
                    style={style.textField}
                    defaultValue={this.props.fields.city.value}
                    name='city'
                    floatingLabelText='City'
                    onChange={this.props.onChange}
                    required
                /><br />
                <CountrySelector
                    style={style.selector}
                    defaultValue={this.props.fields.country.value}
                    name="country"
                    onChange={this.props.onChange}
                />
                <RegionSelector
                    style={style.selector}
                    defaultValue={this.props.fields.region.value}
                    name="region"
                    onChange={this.props.onChange}
                />
                <ValidatedTextField
                    style={style.textField}
                    defaultValue={this.props.fields.postalCode.value}
                    name='postalCode'
                    floatingLabelText='Postal/ZIP Code'
                    onChange={this.props.onChange}
                    maxLength={6}
                /><br/>
                <ValidatedTextField
                    style={style.textField}
                    defaultValue={this.props.fields.email.value}
                    name='email'
                    floatingLabelText='Email'
                    onChange={this.props.onChange}
                    required
                />
                <ValidatedTextField
                    style={style.textField}
                    defaultValue={this.props.fields.primaryPhoneNumber.value}
                    name='primaryPhoneNumber'
                    floatingLabelText='Primary Phone Number'
                    onChange={this.props.onChange}
                    required />
                <PhoneNumberTextField
                    style={style.textField}
                    defaultValue={this.props.fields.secondaryPhoneNumber.value}
                    name='secondaryPhoneNumber'
                    floatingLabelText='Additional Phone Number'
                    onChange={this.props.onChange}
                /><br />
                <DatePicker
                    style={style.datePicker}
                    value={this.props.fields.dateOfBirth.value}
                    name='dateOfBirth'
                    floatingLabelText="Date of Birth"
                    onChange={this.props.onChange}
                />
                <h2>Medical Conditions</h2><br />
                <MedicalConditionsPane />
            </div>
        );

    }
}


export default ClientInfoPane;