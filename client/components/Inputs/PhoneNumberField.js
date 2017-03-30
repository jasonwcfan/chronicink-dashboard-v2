import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MaskedInput from 'react-text-mask';
import ValidatedTextField from './ValidatedTextField';
import callingCodes from '../../constants/callingCodes';

const style = {
    wrapper: {
        display: 'flex',
        width: 256,
        marginLeft: 5,
        marginRight: 5,

    },
    callingCodeSelector: {
        labelStyle : {
            paddingRight: 0
        },
        iconStyle: {
            paddingRight: 0
        }
    },
    phoneNumberTextField: {
        width: '100%'
    }
};

class PhoneNumberField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            callingCode: '+1',
            callingCodeIdx: 38
        };

        this._handleNumberChange = this._handleNumberChange.bind(this);
        this._handleCallingCodeChange = this._handleCallingCodeChange.bind(this);

    }

    _handleNumberChange(name, value, errorText) {
        this.props.onFieldChange(name, `${this.state.callingCode} ${value}`, errorText)
    }

    _handleCallingCodeChange(event, key, value) {
        this.setState({
            callingCode: callingCodes[value].value,
            callingCodeIdx: value
        })
    }

    _getTextMask() {
        switch(this.state.callingCode) {
            case '+1':
                return ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
            default:
                return null;
        }
    }

    _getPattern() {
        switch(this.state.callingCode) {
            case '+1':
                return /\(\d{3}\) \d{3}-\d{4}/;
            default:
                return null;
        }
    }

    _renderCallingCodes() {
        return callingCodes.map((countryCode, idx) => (
            <MenuItem
                primaryText={countryCode.label}
                label={countryCode.value}
                value={idx}
                key={idx}
            />
        ))
    }


    render() {

        const callingCodeWidth = (() => {
            switch(this.state.callingCode.length) {
                case 2:
                    return 45;
                case 3:
                    return 55;
                case 4:
                    return 65;
                case 5:
                    return 76;
                default:
                    return 76;
            }
        })();
        console.log(callingCodeWidth);

        return(
            <div style={style.wrapper}>
                <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                    <SelectField
                        style={{width: callingCodeWidth}}
                        labelStyle={style.callingCodeSelector.labelStyle}
                        iconStyle={style.callingCodeSelector.iconStyle}
                        autoWidth={true}
                        onChange={this._handleCallingCodeChange}
                        maxHeight={240}
                        value={this.state.callingCodeIdx}
                    >
                        {this._renderCallingCodes()}
                    </SelectField>
                </div>
                <ValidatedTextField
                    style={style.phoneNumberTextField}
                    name={this.props.name}
                    floatingLabelText={this.props.label}
                    onFieldChange={this._handleNumberChange}
                    required={this.props.required}
                    mask={this._getTextMask()}
                    pattern={this._getPattern()}
                    errorText={this.props.errorText}
                    touched={this.props.touched}
                    validated={this.props.validated}
                    type='tel'
                />
            </div>
        )
    }
}

PhoneNumberField.propTypes = {
    defaultValue: PropTypes.string,
    touched: PropTypes.bool,
    validated: PropTypes.bool,
    errorText: PropTypes.string,
    floatingLabelText: PropTypes.string
};

export default PhoneNumberField;
