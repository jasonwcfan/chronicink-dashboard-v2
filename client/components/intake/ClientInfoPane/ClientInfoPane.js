import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { CountrySelector, RegionSelector } from './Geography';
import MedicalConditionsPane from './MedicalConditionsPane';
import { ValidatedTextField, EmailTextField, PhoneNumberTextField } from './Inputs';

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
    }
};

class ClientInfoPane extends Component {
    render() {
        return (
            <div style={style.container}>
                <ValidatedTextField style={style.textField} name='firstName' floatingLabelText='First Name' required/>
                <ValidatedTextField style={style.textField} name='lastName' floatingLabelText='Last Name' required/><br/>
                <ValidatedTextField style={style.textField} name='address' floatingLabelText='Address' required/>
                <ValidatedTextField style={style.textField} name='secondaryAddress' floatingLabelText='Address Line 2' />
                <ValidatedTextField style={style.textField} name='city' floatingLabelText='City' required/><br />
                <CountrySelector />
                <RegionSelector />
                <ValidatedTextField style={style.textField} name='postalCode' floatingLabelText='Postal/ZIP Code' maxLength={6}/><br/>
                <EmailTextField style={style.textField} name='email' floatingLabelText='Email' required />
                <PhoneNumberTextField style={style.textField} name='primaryPhoneNumber' floatingLabelText='Primary Phone Number' required />
                <PhoneNumberTextField style={style.textField} name='secondaryPhoneNumber' floatingLabelText='Additional Phone Number'/><br />
                <DatePicker style={style.datePicker} name='dateOfBirth' floatingLabelText="Date of Birth" />
                <h2>Medical Conditions</h2><br />
                <MedicalConditionsPane />
            </div>
        );
    }
}


export default ClientInfoPane;