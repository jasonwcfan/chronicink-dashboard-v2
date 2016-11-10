import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

const style = {
    textField: {
        marginLeft: 5,
        marginRight: 5
    },
    radioGroup: {
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: 650
    },
    radioButton: {
        display: 'inline-block',
        padding: 10,
    }
};

class RateSection extends Component {
    render() {
        return (
            <div>
                <h2>Rate</h2>
                <RadioButtonGroup style={style.radioGroup} name='rateType' defaultSelected='hourly'>
                    <RadioButton
                        value='perPiece'
                        label='Per Piece'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='hourly'
                        label='Hourly'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='toBeDetermined'
                        label='To Be Determined'
                        style={style.radioButton}
                    />
                </RadioButtonGroup>
                <TextField style={style.textField} floatingLabelText="Rate" multiLine={true} /><br />
                <TextField style={style.textField} floatingLabelText="Deposit" multiLine={true} />
            </div>
        )
    }
}

export default RateSection;