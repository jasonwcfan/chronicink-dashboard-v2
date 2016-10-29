import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { CountrySelector, RegionSelector } from './Geography';
import MedicalConditionsPane from './MedicalConditionsPane';

const style = {
    container: {
        padding: 5
    },
    textField: {
        marginLeft: 5,
        marginRight: 5
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
                <TextField style={style.textField} floatingLabelText='First Name' />
                <TextField style={style.textField} floatingLabelText='Last Name' /><br/>
                <TextField style={style.textField} floatingLabelText='Address' />
                <TextField style={style.textField} floatingLabelText='Address Line 2' />
                <TextField style={style.textField} floatingLabelText='City' /><br />
                <CountrySelector />
                <RegionSelector />
                <TextField style={style.textField} floatingLabelText='Postal/ZIP Code' maxLength={6}/><br/>
                <TextField style={style.textField} floatingLabelText='Email'/>
                <TextField style={style.textField} floatingLabelText='Home Phone'/>
                <TextField style={style.textField} floatingLabelText='Cell Phone'/><br />
                <DatePicker style={style.datePicker} floatingLabelText="Date of Birth" />
                <h2>Medical Conditions</h2><br />
                <MedicalConditionsPane />
            </div>
        );
    }
}

ClientInfoPane.propTypes = {

};

export default ClientInfoPane;