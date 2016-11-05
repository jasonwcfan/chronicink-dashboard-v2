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
    }
};

class ClientInfoPane extends Component {
    render() {

        return (
            <div style={style.container}>
                <ValidatedTextField style={style.textField} name='firstName' floatingLabelText='First Name' onChange={this.props.onChange} required/>
                <ValidatedTextField style={style.textField} name='lastName' floatingLabelText='Last Name' onChange={this.props.onChange} required/><br/>
                <ValidatedTextField style={style.textField} name='address' floatingLabelText='Address' onChange={this.props.onChange} required/>
                <ValidatedTextField style={style.textField} name='secondaryAddress' floatingLabelText='Address Line 2' onChange={this.props.onChange} />
                <ValidatedTextField style={style.textField} name='city' floatingLabelText='City' onChange={this.props.onChange} required/><br />
                <CountrySelector onChange={this.props.onChange} />
                <RegionSelector onChange={this.props.onChange} />
                <ValidatedTextField style={style.textField} name='postalCode' floatingLabelText='Postal/ZIP Code' onChange={this.props.onChange} maxLength={6}/><br/>
                <EmailTextField style={style.textField} name='email' floatingLabelText='Email' onChange={this.props.onChange} required />
                <PhoneNumberTextField style={style.textField} name='primaryPhoneNumber' floatingLabelText='Primary Phone Number' onChange={this.props.onChange} required />
                <PhoneNumberTextField style={style.textField} name='secondaryPhoneNumber' floatingLabelText='Additional Phone Number'onChange={this.props.onChange} /><br />
                <DatePicker style={style.datePicker} name='dateOfBirth' floatingLabelText="Date of Birth" onChange={this.props.onChange} />
                <h2>Medical Conditions</h2><br />
                <MedicalConditionsPane />
            </div>
        );
    }
}


export default ClientInfoPane;